from business.base_model import BaseModel

class Amenity(BaseModel):
    def __init__(self, name):
        super().__init__()
        if not name:
            raise ValueError("Amenity must have a name")
        self.name = name
