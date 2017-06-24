from app import db

class Place(db.Model):
	__tablename__ = 'places'
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.VARCHAR(50), nullable = False, unique = True)
	def __init__(self, name):
		self.name    = name
	def __repr__(self):
		return "<Name %s>" % (self.name)
	def serialize(self):
	  return {
		'id': self.id,
		'name': self.name
	  }
	
