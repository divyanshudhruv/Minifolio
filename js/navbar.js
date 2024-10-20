// Navbar scroll animation
document.addEventListener("DOMContentLoaded", () => {
    let lastScrollTop = 0;
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling down
            navbar.style.top = "-70px"; // Adjust to your navbar height
        } else {
            // Scrolling up
            navbar.style.top = "0";
        }
        lastScrollTop = scrollTop;
    });

    navbar.style.transition = "top 0.3s"; // Smooth transition for the navbar
});
