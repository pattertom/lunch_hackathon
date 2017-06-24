from app import db

class Restaurant(db.Model):
	__tablename__ = 'restaurants'
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.VARCHAR(50), nullable = False, unique = True)
	def __init__(self, name):
		self.name    = name
	def __repr__(self):
		return "<Name %s>" % (self.name)
	
