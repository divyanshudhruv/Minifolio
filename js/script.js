// =======+Back to top+=======//

const backToTopButton = document.getElementById("back-to-top");

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 575) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});

// =======+Theme switcher+=======//

const theme = document.getElementById("theme-switcher");
const html = document.querySelector("html");

theme.addEventListener("click", () => {
  html.classList.toggle("dark");
});

function change(iconID) {
  if (document.getElementById(iconID).className == "ri-sun-line") {
    document.getElementById(iconID).className = "ri-moon-line";
  } else {
    document.getElementById(iconID).className = "ri-sun-line";
  }
}

/*
$(window).load(function () {
  $("#loading-bar-spinner").delay(1500).fadeOut("slow");
  $(".overlayer").delay(2000).fadeOut("slow");
  $(".loadingP").delay(1500).fadeOut("slow");

});

.overlayer {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: #fff;
}

#loading-bar-spinner.spinner {
  left: 50%;
  margin-left: -20px;
  top: 50%;
  margin-top: -20px;
  position: absolute;
  z-index: 1001 !important;
  animation: loading-bar-spinner 700ms linear infinite;
}

#loading-bar-spinner.spinner .spinner-icon {
  width: 50px;
  height: 50px;
  border: solid 5px transparent;
  border-top-color: #01b3af !important;
  border-left-color: #01b3af !important;
  border-radius: 50%;
}
@keyframes loading-bar-spinner {
  0% {
    transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.loadingP {
  left: 50%;
  margin-left: -40px;
  top: 65%;
  margin-top: -20px;
  position: absolute;
  z-index: 1001 !important;
  font-family: Poppins;
  color: #272341;
  font-size: 20px;
  font-weight: 400;
}

*/
