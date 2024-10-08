// Get references to the elements
const backToTopButton = document.getElementById("back-to-top");
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Check if dark mode is already enabled in local storage
if (localStorage.getItem('dark-mode') === 'enabled') {
  body.classList.add('dark-mode');
  darkModeToggle.innerHTML = '<ion-icon name="sunny-outline"></ion-icon>';
} else {
  darkModeToggle.innerHTML = '<ion-icon name="moon-outline"></ion-icon>';
}

// Add event listeners
backToTopButton.addEventListener("click", () => {
  // Scroll the page to the top smoothly
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  // Save the user preference to localStorage
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('dark-mode', 'enabled');
    darkModeToggle.innerHTML = '<ion-icon name="sunny-outline"></ion-icon>';
  } else {
    localStorage.setItem('dark-mode', 'disabled');
    darkModeToggle.innerHTML = '<ion-icon name="moon-outline"></ion-icon>';
  }
});

// Show/hide the back to top button based on the user's scroll position
window.addEventListener("scroll", () => {
  if (window.scrollY > 575) {
    // If the user has scrolled down more than 200 pixels, show the button
    backToTopButton.style.display = "block";
  } else {
    // Otherwise, hide the button
    backToTopButton.style.display = "none";
  }
});