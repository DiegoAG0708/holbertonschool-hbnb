# HBnB API Testing Report

## Users
- ✅ POST /api/v1/users/ creates user successfully
- ✅ GET /api/v1/users/ returns list
- ✅ PUT /api/v1/users/<id> updates user
- ❌ DELETE not implemented (by design)

## Amenities
- ✅ POST /api/v1/amenities/ creates amenity
- ✅ GET /api/v1/amenities/ returns list
- ✅ PUT /api/v1/amenities/<id> updates amenity

## Places
- ✅ POST /api/v1/places/ creates place with owner + amenities
- ✅ GET /api/v1/places/ returns list with owner + amenities
- ✅ PUT /api/v1/places/<id> updates place

## Reviews
- ✅ POST /api/v1/reviews/ creates review linked to user + place
- ✅ GET /api/v1/reviews/ returns list
- ✅ PUT /api/v1/reviews/<id> updates review
- ✅ DELETE /api/v1/reviews/<id> deletes review
