from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for
from flask_oauth import OAuth


# You must configure these 3 values from Google APIs console
# https://code.google.com/apis/console
GOOGLE_CLIENT_ID = '21473807080-dtuvf38bikqtisf715qtk44c1nru461l.apps.googleusercontent.com'
GOOGLE_CLIENT_SECRET = '-sc9nvvJw3LSZEDcMgyHAEWf'
REDIRECT_URI = '/oauth2callback'  # one of the Redirect URIs from Google APIs console

SECRET_KEY = 'development key'
DEBUG = True

from app import app
from app.models.user import User

app.debug = DEBUG
app.secret_key = SECRET_KEY
oauth = OAuth()

google = oauth.remote_app('google',
                          base_url='https://www.google.com/accounts/',
                          authorize_url='https://accounts.google.com/o/oauth2/auth',
                          request_token_url=None,
                          request_token_params={'scope': 'https://www.googleapis.com/auth/userinfo.email',
                                                'response_type': 'code'},
                          access_token_url='https://accounts.google.com/o/oauth2/token',
                          access_token_method='POST',
                          access_token_params={'grant_type': 'authorization_code'},
                          consumer_key=GOOGLE_CLIENT_ID,
                          consumer_secret=GOOGLE_CLIENT_SECRET)

auth = Blueprint('auth', __name__, url_prefix='')
@auth.route('/')
def index():
    access_token = session.get('access_token')
    if access_token is None:
        return redirect(url_for('auth.login'))

    access_token = access_token[0]
    from urllib2 import Request, urlopen, URLError

    headers = {'Authorization': 'OAuth '+access_token}
    req = Request('https://www.googleapis.com/oauth2/v1/userinfo',
                  None, headers)
    try:
        res = urlopen(req)
    except URLError, e:
        if e.code == 401:
            # Unauthorized - bad token
            session.pop('access_token', None)
            return redirect(url_for('auth.login'))
        return res.read()

    return res.read()


@auth.route('/login')
def login():
    callback=url_for('auth.authorized', _external=True)
    return google.authorize(callback=callback)



@auth.route(REDIRECT_URI)
@google.authorized_handler
def authorized(resp):
    access_token = resp['access_token']
    session['access_token'] = access_token, ''
    return redirect(url_for('auth.index'))


@google.tokengetter
def get_access_token():
    return session.get('access_token')
