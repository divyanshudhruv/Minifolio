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
// Function to handle the form submission
document.getElementById("achievement-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const category = document.getElementById("category").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;

    // Create a new achievement item
    const achievementList = document.getElementById("achievements-list");
    const achievementItem = document.createElement("div");
    achievementItem.classList.add("achievement-item"); // Add a class for styling
    achievementItem.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <p>Category: ${category} | Date: ${date}</p>
        <button onclick="editAchievement(this)">Edit</button>
        <button onclick="deleteAchievement(this)">Delete</button>
    `;
    
    // Append the new achievement item to the list
    achievementList.appendChild(achievementItem);
    
    // Clear the form
    document.getElementById("achievement-form").reset();
});

// Function to handle editing an achievement
function editAchievement(button) {
    const achievementItem = button.parentElement;
    const title = achievementItem.querySelector("h3").innerText;
    const description = achievementItem.querySelector("p:nth-child(2)").innerText;
    const category = achievementItem.querySelector("p:nth-child(3)").innerText.split(" | ")[0].split(": ")[1];
    const date = achievementItem.querySelector("p:nth-child(3)").innerText.split(" | ")[1].split(": ")[1];

    // Populate the form with the achievement details for editing
    document.getElementById("title").value = title;
    document.getElementById("description").value = description;
    document.getElementById("category").value = category;
    document.getElementById("date").value = date;

    // Remove the achievement item from the list
    achievementItem.remove();
}

// Function to handle deleting an achievement
function deleteAchievement(button) {
    const achievementItem = button.parentElement;
    achievementItem.remove();
}

});