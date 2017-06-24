# Import flask dependencies
from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for, jsonify
from flask.ext.sqlalchemy import SQLAlchemy
from app import app
from app import db
import json

db = SQLAlchemy(app)

from app.models.user import User
user_entry = Blueprint('user_entry', __name__, url_prefix='/users')

@app.route('/')
def user_index():
    return 'Hello World - Users'

@app.route('/all')
def all_users():
    users = User.query.all()
    return jsonify(users=[e.serialize() for e in users])

