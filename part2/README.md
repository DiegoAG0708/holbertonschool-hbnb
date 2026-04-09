# HBnB Evolution - Part 2: Business Logic and API Endpoints

## Overview

This part implements the business logic and RESTful API endpoints using Python and Flask. It brings to life the architecture designed in Part 1, organizing the project into a modular structure with clear separation of responsibilities. Data is stored in memory using an in-memory repository, which is replaced by a real database in Part 3.

## Structure
part2/
├── business/
│   ├── base_model.py       - BaseModel with id, created_at, updated_at
│   ├── user.py             - User model
│   ├── place.py            - Place model
│   ├── review.py           - Review model
│   └── amenity.py          - Amenity model
├── facade/
│   └── hbnb_facade.py      - HBnBFacade connecting all layers
├── persistence/
│   └── repository.py       - InMemoryRepository for temporary storage
├── presentation/
│   └── api.py              - All API endpoints defined with flask-restx
├── tests/
│   └── test_api.py         - Unit tests for the API
└── app.py                  - Application entry point

## Layers

### Business Logic Layer
Contains the core models of the application. Each model inherits from BaseModel which provides a unique UUID, creation timestamp, and update timestamp. The models are:

- **User** - Stores first name, last name, email, and password. Owns places and writes reviews.
- **Place** - Belongs to a User (owner), has a name, description, price, coordinates, and a list of amenities.
- **Review** - Written by a User for a Place. Contains text and a rating between 1 and 5.
- **Amenity** - A feature associated with a Place such as WiFi or a Swimming Pool.

### Facade Layer
The HBnBFacade class acts as the single point of communication between the presentation layer and the persistence layer. It exposes methods for creating, retrieving, listing, and deleting objects without the API layer needing to know about the repository implementation.

### Persistence Layer
The InMemoryRepository stores all objects in a Python dictionary during runtime using the object's UUID as the key. Data is not persisted between sessions. This layer is replaced by SQLAlchemy in Part 3.

### Presentation Layer
All CRUD endpoints are defined here using Flask and flask-restx. The API is automatically documented via Swagger UI at `/` when the server is running.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/users/ | List all users |
| POST | /api/v1/users/ | Create a user |
| GET | /api/v1/users/:id | Get a user by ID |
| PUT | /api/v1/users/:id | Update a user |
| GET | /api/v1/places/ | List all places |
| POST | /api/v1/places/ | Create a place |
| GET | /api/v1/places/:id | Get a place by ID |
| PUT | /api/v1/places/:id | Update a place |
| GET | /api/v1/amenities/ | List all amenities |
| POST | /api/v1/amenities/ | Create an amenity |
| GET | /api/v1/amenities/:id | Get an amenity by ID |
| PUT | /api/v1/amenities/:id | Update an amenity |
| GET | /api/v1/reviews/ | List all reviews |
| POST | /api/v1/reviews/ | Create a review |
| GET | /api/v1/reviews/:id | Get a review by ID |
| PUT | /api/v1/reviews/:id | Update a review |
| DELETE | /api/v1/reviews/:id | Delete a review |

## How to Run

```bash
pip install flask flask-restx
python app.py
```

The API will be available at `http://localhost:5000` and the Swagger UI at `http://localhost:5000/`.

## How to Test

```bash
python -m unittest tests/test_api.py
```
