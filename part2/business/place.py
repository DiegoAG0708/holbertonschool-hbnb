import uuid

class Place:
    def __init__(self, name, description, owner_id):
        self.id = str(uuid.uuid4())
        self.name = name
        self.description = description
        self.owner_id = owner_id
