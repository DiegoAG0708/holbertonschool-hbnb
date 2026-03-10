from business.base_model import BaseModel

class User(BaseModel):
    def __init__(self, first_name, last_name, email):
        super().__init__()
        if not email or "@" not in email:
            raise ValueError("Invalid email address")
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.places = []   # relationship: User owns Places
        self.reviews = []  # relationship: User writes Reviews
