# Import flask dependencies
from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for, jsonify
from flask.ext.sqlalchemy import SQLAlchemy
from app import app
from app import db
import json

db = SQLAlchemy(app)

from app.models.entry import Entry
entry = Blueprint('entry', __name__, url_prefix='/entry')

@entry.route('/')
def entry_index():
    return 'Hello World - Entries'

@entry.route('/all')
def all_entries():
    entries = Entry.query.all()
    return jsonify(entries=[e.serialize() for e in entries])

