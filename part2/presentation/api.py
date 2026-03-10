from flask import request
from flask_restx import Namespace, Resource, fields
from facade.hbnb_facade import HBnBFacade
from business.amenity import Amenity

# Amenity namespace
amenity_ns = Namespace("amenities", description="Amenity operations")
facade = HBnBFacade()

# Swagger model for documentation
amenity_model = amenity_ns.model("Amenity", {
    "name": fields.String(required=True),
})

@amenity_ns.route("/")
class AmenityList(Resource):
    def get(self):
        """Retrieve all amenities"""
        return [a.to_dict() for a in facade.list_all()]

    @amenity_ns.expect(amenity_model)
    def post(self):
        """Create a new amenity"""
        data = request.json
        amenity = Amenity(data["name"])
        facade.create(amenity)
        return amenity.to_dict(), 201

@amenity_ns.route("/<string:amenity_id>")
class AmenityResource(Resource):
    def get(self, amenity_id):
        """Retrieve an amenity by ID"""
        amenity = facade.get(amenity_id)
        if not amenity:
            return {"error": "Amenity not found"}, 404
        return amenity.to_dict()

    @amenity_ns.expect(amenity_model)
    def put(self, amenity_id):
        """Update an amenity"""
        amenity = facade.get(amenity_id)
        if not amenity:
            return {"error": "Amenity not found"}, 404

        data = request.json
        amenity.name = data.get("name", amenity.name)
        amenity.update()
        return amenity.to_dict(), 200
