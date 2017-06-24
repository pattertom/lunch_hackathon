from app import db

class User(db.Model):

    id            = db.Column(db.Integer, primary_key=True)
    date_created  = db.Column(db.DateTime,  default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime,  default=db.func.current_timestamp(),
                                           onupdate=db.func.current_timestamp())
    # Identification Data: email
    email        = db.Column(db.String(128),  nullable=False, unique=True)
    name         = db.Column(db.String(128),  nullable=True, unique=False)
    google_id    = db.Column(db.String(128),  nullable=False, unique=True)
    pic_url          = db.Column(db.String(128),  nullable=True, unique=True)

    # New instance instantiation procedure
    def __init__(self, email, google_id, name=None, pic_url=None):

        self.email    = email
        self.name     = name
        self.google_id= google_id
        self.pic_url  = pic_url

    def __repr__(self):
        return '<User %r, %r>' % (self.email, self.name)

    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'google_id': self.google_id,
            'pic_url': self.pic_url,
        }
