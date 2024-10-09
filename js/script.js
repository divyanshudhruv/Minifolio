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
    if (window.scrollY > 575) {
        // If the user has scrolled down more than 200 pixels, show the button
        backToTopButton.style.display = "block";
    } else {
        // Otherwise, hide the button
        backToTopButton.style.display = "none";
    }
});




document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navContent = document.getElementById('navContent');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navContent.classList.toggle('active');
        
        // Change the button text based on state
        if (navToggle.classList.contains('active')) {
            navToggle.textContent = '+';  // This becomes an X when rotated 45 degrees
        } else {
            navToggle.textContent = '☰';
        }
    });

    // Close nav when clicking on a link
    const navLinks = navContent.getElementsByTagName('a');
    for (let link of navLinks) {
        link.addEventListener('click', () => {
            navContent.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.textContent = '☰';
        });
    }
});

