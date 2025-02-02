'use strict';

(function (e) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=+<>,./?[{()}]!@#$%^&*~`|".split("");
    const source = e.querySelector(".source");
    const target = e.querySelector(".target");

    let interval, timeout, incrementInterval;
    let index = 0;
    let self = this;

    this.start = function () {
        source.style.display = "none";
        target.style.display = "block";

        // Random character substitution effect
        interval = setInterval(() => {
            if (index <= source.innerText.length) {
                target.innerText = source.innerText.substring(0, index) + getRandomString(source.innerText.length - index);
            }
        }, 15);

        // Delayed start of revealing the original text
        timeout = setTimeout(() => {
            incrementInterval = setInterval(() => {
                if (index > source.innerText.length - 1) {
                    self.stop();
                }
                index++;
            }, 70);
        }, 350);
    };

    this.stop = function () {
        source.style.display = "block";
        target.style.display = "none";
        target.innerText = "";
        index = 0;

        if (interval !== undefined) clearInterval(interval);
        if (incrementInterval !== undefined) clearInterval(incrementInterval);
        if (timeout !== undefined) clearTimeout(timeout);
    };

    function getRandomString(length) {
        let str = "";
        for (let i = 0; i < length; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    this.start();
})(document.getElementById("error_text"));

// Handle different language settings
if (navigator.language.substring(0, 2).toLowerCase() !== "en") {
    let script = document.createElement("script");
    let body = document.body;

    script.src = "";  // Add the correct script source URL here
    script.async = true;
    script.defer = true;

    script.addEventListener("load", () => body.removeChild(script));
    body.appendChild(script);
}
