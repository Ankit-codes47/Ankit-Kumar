/* =====================================================
   ELEMENT REFERENCES
===================================================== */

const header = document.querySelector("#site-header");
const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const navIndicator = document.querySelector(".nav-indicator");

const cursorGlow = document.querySelector(".cursor-glow");

const magneticElements = document.querySelectorAll(".magnetic");
const spotlightCards = document.querySelectorAll(".spotlight");
const tiltCards = document.querySelectorAll(".tilt-card");

const scrambleElements = document.querySelectorAll(".scramble");

const revealElements = document.querySelectorAll(".reveal");

const contactForm = document.querySelector("#contact-form");
const formMessage = document.querySelector("#form-message");

const currentYear = document.querySelector("#current-year");


/* =====================================================
   CURRENT YEAR
===================================================== */

currentYear.textContent = new Date().getFullYear();


/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */

function updateNavbar() {

    if (window.scrollY > 60) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", updateNavbar);

updateNavbar();


/* =====================================================
   MOBILE MENU
===================================================== */

menuToggle.addEventListener("click", () => {

    const isOpen = navMenu.classList.toggle("active");

    menuToggle.classList.toggle("active");

    document.body.classList.toggle("menu-open", isOpen);

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

});


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        menuToggle.classList.remove("active");

        document.body.classList.remove("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


/* =====================================================
   NAVIGATION INDICATOR
===================================================== */

function moveIndicator(link) {

    if (!navIndicator || window.innerWidth <= 850) {
        return;
    }

    navIndicator.style.width = `${link.offsetWidth}px`;
    navIndicator.style.left = `${link.offsetLeft}px`;

}


function setActiveLink() {

    let currentSection = "home";

    document.querySelectorAll("main section[id]").forEach(section => {

        const sectionTop = section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

            moveIndicator(link);

        }

    });

}


window.addEventListener("scroll", setActiveLink);

window.addEventListener("resize", () => {

    const activeLink =
        document.querySelector(".nav-link.active");

    if (activeLink) {
        moveIndicator(activeLink);
    }

});


const initialActiveLink =
    document.querySelector(".nav-link.active");

if (initialActiveLink) {

    window.addEventListener("load", () => {
        moveIndicator(initialActiveLink);
    });

}


/* =====================================================
   CURSOR GLOW
===================================================== */

document.addEventListener("mousemove", event => {

    if (!cursorGlow) {
        return;
    }

    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;

});


/* =====================================================
   MAGNETIC HOVER EFFECT
===================================================== */

magneticElements.forEach(element => {

    element.addEventListener("mousemove", event => {

        /*
            Disable magnetic movement on touch-sized
            screens to avoid awkward interaction.
        */

        if (window.innerWidth <= 850) {
            return;
        }

        const rect = element.getBoundingClientRect();

        const x =
            event.clientX -
            rect.left -
            rect.width / 2;

        const y =
            event.clientY -
            rect.top -
            rect.height / 2;

        element.style.transform =
            `translate(${x * 0.18}px, ${y * 0.18}px)`;

    });


    element.addEventListener("mouseleave", () => {

        element.style.transform =
            "translate(0px, 0px)";

    });

});


/* =====================================================
   MOUSE-TRACKING CARD SPOTLIGHT
===================================================== */

spotlightCards.forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect = card.getBoundingClientRect();

        const x =
            event.clientX -
            rect.left;

        const y =
            event.clientY -
            rect.top;

        card.style.setProperty(
            "--mouse-x",
            `${x}px`
        );

        card.style.setProperty(
            "--mouse-y",
            `${y}px`
        );

    });

});


/* =====================================================
   3D PROJECT CARD TILT
===================================================== */

tiltCards.forEach(card => {

    card.addEventListener("mousemove", event => {

        if (window.innerWidth <= 850) {
            return;
        }

        const rect =
            card.getBoundingClientRect();

        const mouseX =
            event.clientX -
            rect.left;

        const mouseY =
            event.clientY -
            rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            ((mouseY - centerY) / centerY) * -3;

        const rotateY =
            ((mouseX - centerX) / centerX) * 3;


        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-4px)
        `;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            translateY(0)
        `;

    });

});


/* =====================================================
   TEXT SCRAMBLE EFFECT
===================================================== */

const scrambleCharacters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";


function scrambleText(element) {

    /*
        Prevent several animations from running
        on the same element simultaneously.
    */

    if (element.dataset.scrambling === "true") {
        return;
    }

    element.dataset.scrambling = "true";

    const originalText =
        element.dataset.originalText ||
        element.textContent;

    element.dataset.originalText =
        originalText;


    let iteration = 0;


    const interval = setInterval(() => {

        element.textContent =
            originalText
                .split("")
                .map((character, index) => {

                    if (character === " ") {
                        return " ";
                    }

                    if (index < iteration) {
                        return originalText[index];
                    }

                    return scrambleCharacters[
                        Math.floor(
                            Math.random() *
                            scrambleCharacters.length
                        )
                    ];

                })
                .join("");


        iteration += 1 / 3;


        if (iteration >= originalText.length) {

            clearInterval(interval);

            element.textContent =
                originalText;

            element.dataset.scrambling =
                "false";

        }

    }, 25);

}


scrambleElements.forEach(element => {

    element.addEventListener(
        "mouseenter",
        () => scrambleText(element)
    );

});


/* =====================================================
   SCROLL REVEAL ANIMATION
===================================================== */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   CONTACT FORM
===================================================== */

/*
    This demonstration handles the form only on
    the front end.

    To actually receive emails, connect it to:
    - Formspree
    - EmailJS
    - Your own backend API
*/

contactForm.addEventListener("submit", event => {

    event.preventDefault();

    const submitButton =
        contactForm.querySelector(".submit-btn");

    const buttonText =
        submitButton.querySelector("span");

    const originalText =
        buttonText.textContent;


    buttonText.textContent =
        "Sending...";

    submitButton.disabled =
        true;


    setTimeout(() => {

        buttonText.textContent =
            "Message Sent";

        formMessage.textContent =
            "Thanks! Your message has been prepared successfully.";

        contactForm.reset();


        setTimeout(() => {

            buttonText.textContent =
                originalText;

            submitButton.disabled =
                false;

            formMessage.textContent =
                "";

        }, 3000);

    }, 900);

});