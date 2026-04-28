from flask import Flask, send_from_directory
from flask_restx import Api
from presentation.api import api_ns, amenity_ns, place_ns, review_ns
import os

app = Flask(__name__, static_folder="part4", static_url_path="")

api = Api(
    app,
    version="1.0",
    title="HBnB API",
    description="HBnB Business Logic API",
    doc=False
)

api.add_namespace(api_ns, path="/api/v1/users")
api.add_namespace(amenity_ns, path="/api/v1/amenities")
api.add_namespace(place_ns, path="/api/v1/places")
api.add_namespace(review_ns, path="/api/v1/reviews")


@app.route("/")
def serve_index():
    return send_from_directory("part4", "index.html")


@app.route("/login")
def serve_login():
    return send_from_directory("part4", "login.html")


@app.route("/<path:path>")
def serve_static(path):
    return send_from_directory("part4", path)


if __name__ == "__main__":
    app.run(debug=True)
