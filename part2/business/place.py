from business.base_model import BaseModel

class Place(BaseModel):
    def __init__(self, name, description, owner):
        super().__init__()
        if not name:
            raise ValueError("Place must have a name")
        self.name = name
        self.description = description
        self.owner = owner   # relationship: Place belongs to a User
        self.reviews = []    # relationship: Place has Reviews
        self.amenities = []  # relationship: Place has Amenities
