# Import flask dependencies
from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for, jsonify
from flask import jsonify
from flask.ext.sqlalchemy import SQLAlchemy
from app import app
from app import db
import json

db = SQLAlchemy(app)

from app.models.user import User
from app.models.entry import Entry
from app.models.user_entry import User_Entry
user_entries = Blueprint('user_entries', __name__, url_prefix='/user_entries')

@user_entries.route('/create', methods=['GET'])
def user_entry_create():
    uid = int(request.args.get("user_id"))
    eid = int(request.args.get("entry_id"))
    user_entry1 = User_Entry(uid, eid)
    db.session.add(user_entry1)
    db.session.commit()
    return jsonify(user_entry1.serialize())

@user_entries.route('/')
def user_index():
    return 'Hello World - User Entry'

@user_entries.route('/all')
def all_user_entries():
    user_entries = User_Entry.query.all()
    return jsonify(user_entries=[e.serialize() for e in user_entries])

@user_entries.route('/id',methods=['GET'])
def get_users_for_entry():
    eid = int(request.args.get("entry_id"))
    u_entries = User_Entry.query.filter_by(entry_id=eid)
    users = []
    for entry in u_entries:
        users.append(User.query.get(entry.user_id).serialize())

    return jsonify(users)
