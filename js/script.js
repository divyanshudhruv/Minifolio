// Get a reference to the button element
const backToTopButton = document.getElementById("back-to-top");

// Then Adding a click event listener to the button
backToTopButton.addEventListener("click", () => {
    // Scroll the page to the top smoothly
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Show/hide the button based on the user's scroll position
window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        // If the user has scrolled down more than 200 pixels, show the button
        backToTopButton.style.display = "block";
    } else {
        // Otherwise, hide the button
        backToTopButton.style.display = "none";
    }
});