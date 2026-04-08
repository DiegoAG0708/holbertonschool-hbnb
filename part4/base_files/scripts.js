document.addEventListener("DOMContentLoaded", () => {
    
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
        checkAuthentication();
    }

    // --- REVIEW FORM ---
    const reviewForm = document.getElementById("review-form");
    if (reviewForm) {
        reviewForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Review submitted!");
        });
    }

    // --- FUNCTIONS ---
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
    }

    function checkAuthentication() {
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
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                const places = await response.json();
                displayPlaces(places);
                setupFilter(places);
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
            card.dataset.price = place.price; // para el filtro

            card.innerHTML = `
                <h2>${place.name}</h2>
                <p>$${place.price} per night</p>
                <p>${place.description || ""}</p>
                <a href="place.html?id=${place.id}" class="details-button">View Details</a>
            `;
            placesList.appendChild(card);
        });
    }

    function setupFilter(places) {
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
});
