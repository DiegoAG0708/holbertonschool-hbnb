from flask import request
from flask_restx import Namespace, Resource, fields
from facade.hbnb_facade import HBnBFacade
from business.place import Place
from business.user import User
from business.amenity import Amenity

place_ns = Namespace("places", description="Place operations")
facade = HBnBFacade()

# Swagger model for documentation
place_model = place_ns.model("Place", {
    "name": fields.String(required=True),
    "description": fields.String(required=True),
    "owner_id": fields.String(required=True),
    "price": fields.Float(required=False),
    "latitude": fields.Float(required=False),
    "longitude": fields.Float(required=False),
    "amenity_ids": fields.List(fields.String, required=False),
})

@place_ns.route("/")
class PlaceList(Resource):
    def get(self):
        """Retrieve all places"""
        return [p.to_dict() for p in facade.list_all() if isinstance(p, Place)]

    @place_ns.expect(place_model)
    def post(self):
        """Create a new place"""
        data = request.json
        owner = facade.get(data["owner_id"])
        if not owner or not isinstance(owner, User):
            return {"error": "Owner not found"}, 404

        place = Place(
            data["name"],
            data["description"],
            owner,
            data.get("price", 0.0),
            data.get("latitude"),
            data.get("longitude"),
        )

        # Add amenities if provided
        amenity_ids = data.get("amenity_ids", [])
        for a_id in amenity_ids:
            amenity = facade.get(a_id)
            if amenity and isinstance(amenity, Amenity):
                place.amenities.append(amenity)

        facade.create(place)
        return place.to_dict(), 201

@place_ns.route("/<string:place_id>")
class PlaceResource(Resource):
    def get(self, place_id):
        """Retrieve a place by ID"""
        place = facade.get(place_id)
        if not place or not isinstance(place, Place):
            return {"error": "Place not found"}, 404
        return place.to_dict()

    @place_ns.expect(place_model)
    def put(self, place_id):
        """Update a place"""
        place = facade.get(place_id)
        if not place or not isinstance(place, Place):
            return {"error": "Place not found"}, 404

        data = request.json
        place.name = data.get("name", place.name)
        place.description = data.get("description", place.description)
        place.price = data.get("price", place.price)
        place.latitude = data.get("latitude", place.latitude)
        place.longitude = data.get("longitude", place.longitude)

        # Update amenities if provided
        amenity_ids = data.get("amenity_ids")
        if amenity_ids is not None:
            place.amenities = []
            for a_id in amenity_ids:
                amenity = facade.get(a_id)
                if amenity and isinstance(amenity, Amenity):
                    place.amenities.append(amenity)

        place.update()
        return place.to_dict(), 200
