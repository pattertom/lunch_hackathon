from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for
from flask_oauth import OAuth
from app import db
from app import app
from app.models.restaurant import Restaurant

rest = Blueprint('rest', __name__, url_prefix='/rest')
@rest.route('/')
def index():
  return str(Restaurant.query.all())
@rest.route('/create', methods = ['GET'])
def create():
  name = str(request.args.get("name"))
  restaurant = Restaurant(name)
  db.session.add(restaurant)
  db.session.commit()
  return "hi"
