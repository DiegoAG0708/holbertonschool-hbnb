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
                    headers: {
                        "Content-Type": "application/json"
                    },
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

    
    const reviewForm = document.getElementById("review-form");
    if (reviewForm) {
        reviewForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Review submitted!");
        });
    }

    
    const priceFilter = document.getElementById("price-filter");
    if (priceFilter) {
        [50, 100, 150, 200].forEach(price => {
            const option = document.createElement("option");
            option.value = price;
            option.textContent = `$${price}`;
            priceFilter.appendChild(option);
        });
    }
});
