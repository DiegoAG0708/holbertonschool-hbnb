document.addEventListener("DOMContentLoaded", () => {
    const priceFilter = document.getElementById("price-filter");
    if (priceFilter) {
        [50, 100, 150, 200].forEach(price => {
            const option = document.createElement("option");
            option.value = price;
            option.textContent = `$${price}`;
            priceFilter.appendChild(option);
        });
    }

    // Handle login form submission
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Login submitted!");
        });
    }

    // Handle review form submission
    const reviewForm = document.getElementById("review-form");
    if (reviewForm) {
        reviewForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Review submitted!");
        });
    }
});
