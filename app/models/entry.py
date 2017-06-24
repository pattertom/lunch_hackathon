from app import db

class Entry(db.Model):

    id            = db.Column(db.Integer, primary_key=True)
    date_created  = db.Column(db.DateTime,  default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime,  default=db.func.current_timestamp(),
                                           onupdate=db.func.current_timestamp())
    
    place_id      = db.Column(db.Integer, db.ForeignKey('place.id'), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
    meeting_time  = db.Column(db.DateTime, nullable=False, unique=False)

    # New instance instantiation procedure
    def __init__(self, place_id, restaurant_id, meeting_time):

        self.place_id = place_id
        self.restaurant_id = restaurant_id
        self.meeting_time = meeting_time

    def __repr__(self):
        return '<Entry %d, %d>' % (self.place_id, self.restaurant_id)
