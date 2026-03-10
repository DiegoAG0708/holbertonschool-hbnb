from business.base_model import BaseModel

class Review(BaseModel):
    def __init__(self, text, rating, user, place):
        super().__init__()
        if rating < 1 or rating > 5:
            raise ValueError("Rating must be between 1 and 5")
        self.text = text
        self.rating = rating
        self.user = user     # relationship: Review belongs to User
        self.place = place   # relationship: Review belongs to Place
