from app import db

class User(db.Model):

    id            = db.Column(db.Integer, primary_key=True)
    date_created  = db.Column(db.DateTime,  default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime,  default=db.func.current_timestamp(),
                                           onupdate=db.func.current_timestamp())
    # Identification Data: email
    email    = db.Column(db.String(128),  nullable=False, unique=True)

    # New instance instantiation procedure
    def __init__(self, name, email, password):

        self.email    = email

    def __repr__(self):
        return '<User %r>' % (self.email)
