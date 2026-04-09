# HBnB Evolution - Part 1: Technical Documentation

## Overview

This part contains the complete technical documentation for HBnB Evolution, a simplified AirBnB-like application. The focus of this phase is on designing the system architecture and documenting it using UML diagrams before any implementation begins. The goal is to establish a clear blueprint that guides the development in subsequent parts of the project.

## Documentation Included

- **High-Level Package Diagram** - Shows the three-layer architecture and how layers communicate using the Facade Pattern
- **Detailed Class Diagram** - Defines the core business logic entities and their relationships
- **Sequence Diagrams** - Illustrates the flow of key API interactions between the client, API, business logic, and database
- **Technical Documentation** - A full written summary of the architecture, design decisions, and entity definitions

## Architecture

The application follows a three-layer architecture:

### Presentation Layer
Handles all incoming API requests and exposes the service interface to clients. This layer communicates exclusively with the Business Logic Layer through the Facade Pattern.

### Business Logic Layer
Contains the core models and business rules of the application. The four main entities are:

- **User** - Represents a registered user. Can own places, write reviews, and have admin privileges.
- **Place** - Represents a rental property owned by a User. Can include multiple Amenities and receive Reviews.
- **Review** - Represents a review written by a User for a Place. Includes a rating and a comment.
- **Amenity** - Represents a feature or service available at a Place (e.g. WiFi, Swimming Pool).

All entities include audit fields (`created_at`, `updated_at`) and support full CRUD operations.

### Persistence Layer
Manages all data storage and retrieval through repositories. In Part 1 this layer is defined at the design level only. Actual persistence is implemented in Parts 2 and 3.

## Relationships Between Entities

- A **User** can own many **Places**
- A **User** can write many **Reviews**
- A **Place** can have many **Reviews**
- A **Place** can include many **Amenities** (many-to-many)

## Sequence Diagrams Covered

- **User Registration** - POST /users/register
- **Place Creation** - POST /places
- **Review Submission** - POST /reviews
- **Fetching Places** - GET /places

## Part 1 - Main Contributors: Diego Arcila, Joshua Luja, Luis Jiménez.
