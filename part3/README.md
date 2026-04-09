# HBnB V2 - Part 3: Authentication and Database Integration

## Overview

This part extends the backend with JWT-based authentication, role-based access control, and persistent data storage using SQLite and SQLAlchemy. It also prepares the application for production environments using MySQL. The project is restructured to follow the Flask Application Factory pattern, making it more modular and scalable.

## Structure

part3/
├── app/
│   ├── init.py             - Application Factory (create_app), initializes Flask, SQLAlchemy, Bcrypt, JWTManager
│   ├── api/
│   │   └── v1/
│   │       ├── auth.py         - Login endpoint, JWT token generation
│   │       ├── users.py        - User endpoints with admin and ownership checks
│   │       ├── places.py       - Place endpoints with ownership checks
│   │       ├── reviews.py      - Review endpoints with ownership and duplicate checks
│   │       └── amenities.py    - Amenity endpoints restricted to admins
│   ├── models/
│   │   ├── base_model.py       - SQLAlchemy BaseModel with id, created_at, updated_at
│   │   ├── user.py             - User SQLAlchemy model with bcrypt password hashing
│   │   ├── place.py            - Place SQLAlchemy model with owner and amenity relationships
│   │   ├── review.py           - Review SQLAlchemy model with user and place relationships
│   │   └── amenity.py          - Amenity SQLAlchemy model with place_amenity join table
│   ├── services/
│   │   └── facade.py           - HBnBFacade with separate repositories per entity
│   └── persistence/
│       └── repository.py       - InMemoryRepository and SQLAlchemyRepository classes
├── config.py                   - Development and production configurations
├── run.py                      - Application entry point, initializes the database
├── scripts/
│   ├── schema.sql              - Raw SQL to create all database tables
│   ├── seed.sql                - Raw SQL to insert admin user and default amenities
│   └── seed_admin.py           - Python script to seed the database via SQLAlchemy
└── docs/
└── er_diagram.md           - ER diagram built with mermaid.js


## Key Features

### Authentication
JWT tokens are issued on login and must be included in the `Authorization` header as a Bearer token to access protected endpoints.

### Role-Based Access Control
- **Public users** can read places, reviews, and amenities without a token.
- **Authenticated users** can create and manage their own places and reviews.
- **Admins** can manage all users, amenities, and bypass ownership restrictions.

### Database
SQLite is used for development via SQLAlchemy ORM. The schema includes the following tables: `users`, `places`, `reviews`, `amenities`, and `place_amenity` (many-to-many join table).

## API Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | /api/v1/auth/login | No | Login and get JWT token |
| GET | /api/v1/users/ | No | List all users |
| POST | /api/v1/users/ | Admin only | Create a user |
| GET | /api/v1/users/:id | No | Get a user by ID |
| PUT | /api/v1/users/:id | Yes (own or admin) | Update a user |
| GET | /api/v1/places/ | No | List all places |
| POST | /api/v1/places/ | Yes | Create a place |
| GET | /api/v1/places/:id | No | Get a place by ID |
| PUT | /api/v1/places/:id | Yes (owner or admin) | Update a place |
| DELETE | /api/v1/places/:id | Yes (owner or admin) | Delete a place |
| GET | /api/v1/reviews/ | No | List all reviews |
| POST | /api/v1/reviews/ | Yes | Create a review |
| GET | /api/v1/reviews/:id | No | Get a review by ID |
| PUT | /api/v1/reviews/:id | Yes (owner or admin) | Update a review |
| DELETE | /api/v1/reviews/:id | Yes (owner or admin) | Delete a review |
| GET | /api/v1/amenities/ | No | List all amenities |
| POST | /api/v1/amenities/ | Admin only | Create an amenity |
| GET | /api/v1/amenities/:id | No | Get an amenity by ID |
| PUT | /api/v1/amenities/:id | Admin only | Update an amenity |

## How to Run

```bash
pip install flask flask-restx flask-bcrypt flask-jwt-extended flask-sqlalchemy
python run.py
```

The API will be available at `http://localhost:5000`.

## Seeding the Database

```bash
python scripts/seed_admin.py
```

This creates the admin user (`admin@hbnb.io` / `admin1234`) and the default amenities (WiFi, Swimming Pool, Air Conditioning).

## Example Usage

```bash
# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@hbnb.io", "password": "admin1234"}'

# Use the token
curl -X GET http://localhost:5000/api/v1/places/ \
  -H "Authorization: Bearer <your_token>"
```
