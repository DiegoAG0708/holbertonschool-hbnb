# HBnB V2 - Part 4: Simple Web Client

## Overview

This part implements the frontend of the HBnB application using HTML5, CSS3, and JavaScript ES6. The web client connects to the backend API developed in Part 3, providing an interactive user interface for browsing places, viewing details, logging in, and submitting reviews. Authentication is managed using JWT tokens stored in cookies.

## Structure
part4/
├── base_files/

│   ├── index.html          - Main page displaying the list of all places with price filter.
│   ├── login.html          - Login page with email and password form.
│   ├── place.html          - Place details page with reviews and add review form
│   ├── add_review.html     - Standalone add review page for authenticated users
│   ├── styles.css          - Global stylesheet for all pages
│   └── scripts.js          - All client-side JavaScript logic

## Pages

### Login (login.html)
Allows users to log in using their email and password. On successful login, the JWT token returned by the API is stored in a cookie and the user is redirected to the main page.

### List of Places (index.html)
Displays all available places fetched from the API. Includes a price filter that allows users to filter places client-side by maximum price. Each place card links to its detail page.

### Place Details (place.html)
Shows the full details of a place including the host, price, description, amenities, and all reviews. If the user is authenticated, the add review form is displayed.

### Add Review (add_review.html)
A form that allows authenticated users to submit a review for a place. Unauthenticated users are redirected to the main page.

## Key Features

### Authentication
JWT tokens are stored in cookies after login. All pages check for the token to determine whether the user is authenticated and adjust the UI accordingly.

### Fetch API
All data is retrieved and submitted using the JavaScript Fetch API with async/await. Requests to protected endpoints include the JWT token in the Authorization header.

### Client-Side Filtering
The list of places supports filtering by maximum price without making additional API requests. The filter is applied directly to the rendered place cards.

### CORS
The backend API must be configured to allow cross-origin requests from the frontend. This is required when the client and the API run on different origins.

## How to Run

Open any of the HTML files directly in a browser or serve them with a simple HTTP server:

```bash
cd part4/base_files
python -m http.server 8000
```

Then visit `http://localhost:8000/index.html`.

Make sure the backend from Part 3 is running at `http://localhost:5000` before using the client.

## Dependencies

No external libraries or frameworks are used. The frontend is built entirely with vanilla HTML5, CSS3, and JavaScript ES6.
