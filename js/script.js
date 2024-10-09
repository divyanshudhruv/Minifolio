<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Minifolio</title>
    <link rel="shortcut icon" href="Minifolio.png" type="image/x-icon" />
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/button.css" />
    <script src="https://unpkg.com/ionicons@latest/dist/ionicons.js"></script>
    <style>
        /* Dark mode toggle button styles */
        #dark-mode-toggle {
            position: fixed;
            top: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background-color: #f0f0f0;
            border-radius: 50%;
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000; /* Ensure it's on top of everything */
        &rbrace;

        /* Change the background color when hovered */
        #dark-mode-toggle:hover {
            background-color: #e0e0e0;
        &rbrace;

        /* Dark mode icon styles */
        #dark-mode-toggle ion-icon {
            font-size: 24px;
            color: #333;
        &rbrace;

        /* Dark mode toggle active state */
        body.dark-mode #dark-mode-toggle {
            background-color: #333;
        &rbrace;
        body.dark-mode #dark-mode-toggle ion-icon {
            color: #fff;
        &rbrace;

        /* Back to Top Button */
        #back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #01b3af;
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: none; /* Initially hidden */
            justify-content: center;
            align-items: center;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
            z-index: 1000; /* Ensure it's on top of everything */
        &rbrace;

        #back-to-top:hover {
            background-color: #01a39a;
        &rbrace;

        /* Basic styles for content */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        &rbrace;

        .home {
            display: flex;
            width: 100%;
            height: 100vh;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-align: center;
        &rbrace;

        .container {
            font-size: 24px;
        &rbrace;

        .button {
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
        &rbrace;

        .button:hover {
            background-color: #0056b3;
        &rbrace;

        /* About section styles */
        .aboutC {
            padding: 50px 20px;
            background-color: #f9f9f9;
            text-align: center;
        &rbrace;

        .servicesC {
            padding: 50px 20px;
            background-color: #eaeaea;
            text-align: center;
        &rbrace;

        .footer {
            text-align: center;
            padding: 20px;
            background-color: #333;
            color: white;
        &rbrace;

        /* Add blur effect to nav bar when scrolled */
        nav {
            transition: backdrop-filter 0.3s ease-in-out;
        &rbrace;

        nav.scrolled {
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
        &rbrace;
    </style>
</head>
<body>
    <nav>
        <!-- Nav bar content --&gt;
    </nav>

    <div class="home">
        <div class="container">
            Hi, my name is <span>Your Name</span><br />
            I'm <span id="role"></span>
            <a class="button" href="#about">Know more</a>
        </div>
    </div>

    <div class="aboutC" id="about">
        <div class="title">ABOUT 🫥</div>
        <div class="titleSmall">This and that</div>
        <div class="text">Hi, I'm a developer</div>
        <div class="textMain">
            I design websites. That's the long and short of it. UI and UX, Sketch, Design, and pretty decent HTML and CSS — with Javascript and that nice dabble with Java.
        </div>
    </div>

    <button id="dark-mode-toggle" class="button">
        <ion-icon name="moon-outline"></ion-icon>
    </button>

    <button id="back-to-top">
        <ion-icon name="arrow-up-outline"></ion-icon>
    </button>

    <div class="servicesC">
        <div class="title">SERVICES 🛠️</div>
        <div class="titleSmall">What I Offer</div>
        <div class="container">
            <div class="serviceItem">
                <div class="serviceText">
                    <div class="text">Web Development</div>
                    <div class="textMain">
                        Building responsive and high-quality websites.
                    </div>
                </div>
            </div>
            <div class="serviceItem">
                <div class="serviceText">
                    <div class="text">UI/UX Design</div>
                    <div class="textMain">
                        Designing user-friendly interfaces and experiences.
                    </div>
                </div>
            </div>
            <div class="serviceItem">
                <div class="serviceText">
                    <div class="text">SEO Expert</div>
                    <div class="textMain">
                        Optimizing websites for better search engine ranking.
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="footer">
        <span>Copyright ©<span id="copyright-year"></span> All Rights Reserved |</span>
        <span style="position: relative; top: -3.2px">&nbsp;Template Developed With
            <span class="icon-heart"><ion-icon name="heart" style="position: relative; top: 5px"></ion-icon></span>
            By
        </span>
        <span>
            <a href="https://github.com/divyanshudhruv">&nbsp;Divyanshu Dhruv</a>
        </span>
    </div>

    <script>
        // Get references to the elements
        const backToTopButton = document.getElementById("back-to-top");
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        const body = document.body;
        const nav = document.querySelector("nav");

        // Check if dark mode is already enabled in local storage
        if (localStorage.getItem('dark-mode') === 'enabled') {
            body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<ion-icon name="sunny-outline"></ion-icon>';
        &rbrace; else {
            darkModeToggle.innerHTML = '<ion-icon name="moon-outline"></ion-icon>';
        &rbrace;

        // Add event listeners
        backToTopButton.addEventListener("click", () =&gt; {
            // Scroll the page to the top smoothly
            window.scrollTo({
                top: 0 ,
                behavior: "smooth"
            });
        &rbrace;);

        darkModeToggle.addEventListener('click', () =&gt; {
            body.classList.toggle('dark-mode');

            // Save the user preference to localStorage
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('dark-mode', 'enabled');
                darkModeToggle.innerHTML = '<ion-icon name="sunny-outline"></ion-icon>';
            &rbrace; else {
                localStorage.setItem('dark-mode', 'disabled');
                darkModeToggle.innerHTML = '<ion-icon name="moon-outline"></ion-icon>';
            &rbrace;
        &rbrace;);

        // Show/hide the back to top button based on the user's scroll position
        window.addEventListener("scroll", () =&gt; {
            if (window.scrollY &gt; 575) {
                // If the user has scrolled down more than 575 pixels, show the button
                backToTopButton.style.display = "flex";
            &rbrace; else {
                // Otherwise, hide the button
                backToTopButton.style.display = "none";
            &rbrace;

            // Add/remove the scrolled class to the nav bar
            if (window.scrollY &gt; 0) {
                nav.classList.add("scrolled");
            &rbrace; else {
                nav.classList.remove("scrolled");
            &rbrace;
        &rbrace;);
    </script>
</body>
</html>