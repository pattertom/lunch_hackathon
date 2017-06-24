from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for
from flask_oauth import OAuth
from app import db
from app import app
from app.models.place import Place

place = Blueprint('rest', __name__, url_prefix='/place')
@place.route('/')
def index():
  return str(Place.query.all())
@rest.route('/create', methods = ['GET'])
def create():
  name = str(request.args.get("name"))
  placen = Place(name)
  db.session.add(placen)
  db.session.commit()
  return "hi"
