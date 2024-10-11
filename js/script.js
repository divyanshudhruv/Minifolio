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



const stars = document.querySelectorAll(".star");
const rating = document.getElementById("rating");
const reviewText = document.getElementById("review");
const submitBtn = document.getElementById("submit");
const reviewsContainer = document.getElementById("reviews");

stars.forEach((star) => {
    star.addEventListener("click", () => {
        const value = parseInt(star.getAttribute("data-value"));
        rating.innerText = value;

        
        stars.forEach((s) => s.classList.remove("one", 
                                                "two", 
                                                "three", 
                                                "four", 
                                                "five"));

        
        stars.forEach((s, index) => {
            if (index < value) {
                s.classList.add(getStarColorClass(value));
            }
        });

        
        stars.forEach((s) => s.classList.remove("selected"));
       
        star.classList.add("selected");
    });
});

submitBtn.addEventListener("click", () => {
    const review = reviewText.value;
    const userRating = parseInt(rating.innerText);

    if (!userRating || !review) {
        alert(
"Please select a rating and provide a review before submitting."
            );
        return;
    }

    if (userRating > 0) {
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("review");
        reviewElement.innerHTML = 
`<p><strong>Rating: ${userRating}/5</strong></p><p>${review}</p>`;
        reviewsContainer.appendChild(reviewElement);

        
        reviewText.value = "";
        rating.innerText = "0";
        stars.forEach((s) => s.classList.remove("one", 
                                                "two", 
                                                "three", 
                                                "four", 
                                                "five", 
                                                "selected"));
    }
});

function getStarColorClass(value) {
    switch (value) {
        case 1:
            return "one";
        case 2:
            return "two";
        case 3:
            return "three";
        case 4:
            return "four";
        case 5:
            return "five";
        default:
            return "";
    }
}