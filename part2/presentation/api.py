from flask_restx import Namespace, Resource
from facade.hbnb_facade import HBnBFacade
from business.user import User

api_ns = Namespace("users", description="User operations")
facade = HBnBFacade()

@api_ns.route("/")
class UserList(Resource):
    def get(self):
        return [vars(u) for u in facade.list_all()]

    def post(self):
        user = User("John", "Doe", "john@example.com")
        facade.create(user)
        return vars(user), 201
