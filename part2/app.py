from flask import Flask
from flask_restx import Api
from presentation.api import api_ns, amenity_ns

app = Flask(__name__)
api = Api(app, version="1.0", title="HBnB API", description="HBnB Business Logic API")

# Register namespaces
api.add_namespace(api_ns, path="/api/v1/users")
api.add_namespace(amenity_ns, path="/api/v1/amenities")

if __name__ == "__main__":
    app.run(debug=True)
