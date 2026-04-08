document.addEventListener("DOMContentLoaded", () => {
    // --- LOGIN PAGE ---
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch("https://tu-api.com/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                if (response.ok) {
                    const data = await response.json();
                    document.cookie = `token=${data.access_token}; path=/`;
                    window.location.href = "index.html";
                } else {
                    const errorData = await response.json();
                    alert("Login failed: " + (errorData.message || response.statusText));
                }
            } catch (error) {
                alert("Error connecting to server: " + error.message);
            }
        });
    }

    // --- INDEX PAGE ---
    const loginLink = document.getElementById("login-link");
    const placesList = document.getElementById("places-list");
    const priceFilter = document.getElementById("price-filter");

    if (placesList) {
        checkAuthenticationIndex();
    }

    function checkAuthenticationIndex() {
        const token = getCookie("token");
        if (!token) {
            if (loginLink) loginLink.style.display = "block";
        } else {
            if (loginLink) loginLink.style.display = "none";
            fetchPlaces(token);
        }
    }

    async function fetchPlaces(token) {
        try {
            const response = await fetch("https://tu-api.com/places", {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.ok) {
                const places = await response.json();
                displayPlaces(places);
                setupFilter();
            } else {
                alert("Failed to fetch places");
            }
        } catch (error) {
            alert("Error fetching places: " + error.message);
        }
    }

    function displayPlaces(places) {
        placesList.innerHTML = "";
        places.forEach(place => {
            const card = document.createElement("div");
            card.className = "place-card";
            card.dataset.price = place.price;

            card.innerHTML = `
                <h2>${place.name}</h2>
                <p>$${place.price} per night</p>
                <p>${place.description || ""}</p>
                <a href="place.html?id=${place.id}" class="details-button">View Details</a>
            `;
            placesList.appendChild(card);
        });
    }

    function setupFilter() {
        if (priceFilter) {
            priceFilter.innerHTML = `
                <option value="all">All</option>
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
            `;
            priceFilter.addEventListener("change", (event) => {
                const maxPrice = event.target.value;
                const cards = document.querySelectorAll(".place-card");
                cards.forEach(card => {
                    const price = parseInt(card.dataset.price, 10);
                    if (maxPrice === "all" || price <= parseInt(maxPrice, 10)) {
                        card.style.display = "block";
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        }
    }

    // --- PLACE PAGE ---
    const placeDetailsSection = document.getElementById("place-details");
    const addReviewSection = document.getElementById("add-review");

    if (placeDetailsSection) {
        const placeId = getPlaceIdFromURL();
        const token = getCookie("token");

        if (!token) {
            if (addReviewSection) addReviewSection.style.display = "none";
        } else {
            if (addReviewSection) addReviewSection.style.display = "block";
        }

        fetchPlaceDetails(token, placeId);
    }

    async function fetchPlaceDetails(token, placeId) {
        try {
            const response = await fetch(`https://tu-api.com/places/${placeId}`, {
                method: "GET",
                headers: token ? { "Authorization": `Bearer ${token}` } : {}
            });

            if (response.ok) {
                const place = await response.json();
                displayPlaceDetails(place);
            } else {
                alert("Failed to fetch place details");
            }
        } catch (error) {
            alert("Error fetching place details: " + error.message);
        }
    }

    function displayPlaceDetails(place) {
        placeDetailsSection.innerHTML = "";

        const info = document.createElement("div");
        info.className = "place-info";
        info.innerHTML = `
            <h2>${place.name}</h2>
            <p>Host: ${place.host}</p>
            <p>Price: $${place.price} per night</p>
            <p>Description: ${place.description}</p>
            <p>Amenities:</p>
            <ul>
                ${place.amenities.map(a => `<li>${a}</li>`).join("")}
            </ul>
        `;
        placeDetailsSection.appendChild(info);

        const reviewsSection = document.getElementById("reviews");
        reviewsSection.innerHTML = "<h3>Reviews</h3>";
        place.reviews.forEach(review => {
            const card = document.createElement("div");
            card.className = "review-card";
            card.innerHTML = `
                <p>"${review.comment}"</p>
                <p>User: ${review.user}</p>
                <p>Rating: ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</p>
            `;
            reviewsSection.appendChild(card);
        });
    }

    // --- COMMON FUNCTIONS ---
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
    }

    function getPlaceIdFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get("id");
    }
});
