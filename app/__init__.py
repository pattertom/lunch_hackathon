# Import flask and template operators
from flask import Flask, render_template

#  Import SQLAlchemy
from flask.ext.sqlalchemy import SQLAlchemy

# Define the WSGI application object
app = Flask(__name__)

# Configurations
app.config.from_object('config')

# Define the database object which is imported
# by modules and controllers
db = SQLAlchemy(app)
from app.models.user import User
from app.models.restaurant import Restaurant
from app.models.place import Place
from app.models.entry import Entry
from app.models.user_entry import User_Entry

# Sample HTTP error handling
@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

# Import a module / component using its blueprint handler variable (auth)
from app.controllers.auth import auth
from app.controllers.user_entry import user_entries
from app.controllers.entry import entry
from app.controllers.user import user
from app.controllers.rest import rest
from app.controllers.place import place


#from app.controllers.user import user


#from app.controllers.user import user

# Register blueprint(s)
app.register_blueprint(auth)
app.register_blueprint(user)
app.register_blueprint(user_entries)
app.register_blueprint(entry)
app.register_blueprint(rest)
app.register_blueprint(place)



# Build the database:
# This will create the database file using SQLAlchemy
db.create_all()
db.session.commit()
