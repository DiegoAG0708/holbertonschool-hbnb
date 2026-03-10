import uuid

class Review:
    def __init__(self, text, rating, user_id, place_id):
        self.id = str(uuid.uuid4())
        self.text = text
        self.rating = rating
        self.user_id = user_id
        self.place_id = place_id
