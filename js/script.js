document.addEventListener("DOMContentLoaded", function () {
    // Select the text element to be animated
    const textElement = document.querySelector(".animate-text");
  
    // Use TweenMax to animate the text
    gsap.fromTo(
      textElement,
      {
        opacity: 0,
        y: 50, // Initial position below the viewport
      },
      {
        opacity: 1,
        y: 0, // Final position (centered)
        duration: 0.6, // Duration of the animation in seconds
        ease: "linear", // Easing function for smooth animation
      }
    );

    gsap.fromTo(
        document.querySelector(".animate-text2"),
        {
          opacity: 0,
          y: 50, // Initial position below the viewport
        },
        {
          opacity: 1,
          y: 0, // Final position (centered)
          duration: 0.8, // Duration of the animation in seconds
          ease: "linear", // Easing function for smooth animation
        }
      );
      gsap.fromTo(
        document.querySelector(".bg-img"),
        {
          opacity: 0,
          y: 100, // Initial position below the viewport
        },
        {
          opacity: 1,
          y: 0, // Final position (centered)
          duration: 0.8, // Duration of the animation in seconds
          ease: "linear", // Easing function for smooth animation
        }
      );
      gsap.fromTo(
        document.querySelector(".user-img"),
        {
          opacity: 0,
          x: 0, // Initial position below the viewport
        },
        {
          opacity: 1,
          x: -200, // Final position (centered)
          duration: 0.5, // Duration of the animation in seconds
        }
      );
  });