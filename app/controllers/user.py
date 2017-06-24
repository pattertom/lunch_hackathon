from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for, jsonify, \
                  escape

user = Blueprint('user', __name__, url_prefix='/user')

from app import app
from app.models.user import User

@user.route('/')
def index():
    if session['email']:
        user = User.query.filter_by(email=session['email']).first()
        return jsonify(user.serialize())
    return 'You are not logged in'

#  @user.route('/login', methods=['GET', 'POST'])
#  def login():
#      if request.method == 'POST':
#          session['email'] = request.form['email']
#          return redirect(url_for('user.index'))
#      return '''
#          <form method="post">
#              <p><input type=text name=username>
#              <p><input type=submit value=Login>
#          </form>
#      '''
#
#  @user.route('/logout')
#  def logout():
#      # remove the username from the session if it's there
#      session.pop('username', None)
#      return redirect(url_for('user.index'))
#
#  # set the secret key.  keep this really secret:
#  app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
