from app import db

class User_Entry(db.Model):
	__tablename__ = 'user_entry'
	id = db.Column(db.Integer, primary_key=True)
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False, unique = True)
	entry_id = db.Column(db.Integer, db.ForeignKey('entry.id'), nullable = False, unique = True)

	def __init__(self, user_id, entry_id):
		self.user_id    = user_id
		self.entry_id   = entry_id
	def __repr__(self):
		return "<Name %s, %s>" % (self.user_id, self.entry_id)
	
        def serialize(self):
            return {
            'id': self.id,
            'user_id': self.user_id, 
            'entry_id': self.entry_id,
            } 
