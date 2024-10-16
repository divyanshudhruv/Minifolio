// Correctly declare the backToTopButton variable
const backToTopButton = document.getElementById('backToTopButton');

// Adding a click event listener to the button
backToTopButton.addEventListener("click", () => {
  // Scroll the page to the top smoothly
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Show/hide the button based on the user's scroll position
window.addEventListener("scroll", () => {
  if (window.scrollY >= 575) {

    // If the user has scrolled down more than 575 pixels, show the button
    // If the user has scrolled down more than 200 pixels, show the button
    backToTopButton.style.display = "block";
  } else {
    // Otherwise, hide the button
    backToTopButton.style.display = "none";
  }
});


function linkedin() {
    window.open("https://linkedin.com")
}
function twitter() {
    window.open("https://x.com")
}
function instagram() {
    window.open("https://instagram.com")
}

function link() {
    window.open("https://custom-link.com")
}
