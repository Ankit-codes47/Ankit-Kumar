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

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */

function updateNavbar() {

    if (!header) return;

    if (window.scrollY > 60) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", updateNavbar, {
    passive: true
});

updateNavbar();


/* =====================================================
   MOBILE MENU
===================================================== */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            navMenu.classList.toggle("active");

        menuToggle.classList.toggle("active");

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            menuToggle.classList.remove("active");

            document.body.classList.remove(
                "menu-open"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        });
    });
}


/* =====================================================
   NAVIGATION INDICATOR
===================================================== */

function moveIndicator(link) {

    if (
        !navIndicator ||
        !link ||
        window.innerWidth <= 850
    ) {
        return;
    }

    navIndicator.style.width =
        `${link.offsetWidth}px`;

    navIndicator.style.left =
        `${link.offsetLeft}px`;
}


function setActiveLink() {

    let currentSection = "home";

    document
        .querySelectorAll("main section[id]")
        .forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

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


window.addEventListener(
    "scroll",
    setActiveLink,
    {
        passive: true
    }
);


window.addEventListener("resize", () => {

    const activeLink =
        document.querySelector(
            ".nav-link.active"
        );

    if (activeLink) {
        moveIndicator(activeLink);
    }
});


window.addEventListener("load", () => {

    const initialActiveLink =
        document.querySelector(
            ".nav-link.active"
        );

    if (initialActiveLink) {
        moveIndicator(initialActiveLink);
    }

    setActiveLink();
});


/* =====================================================
   OPTIMIZED CURSOR GLOW
===================================================== */

if (cursorGlow) {

    let cursorFrame = null;
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            if (cursorFrame) return;

            cursorFrame =
                requestAnimationFrame(() => {

                    cursorGlow.style.transform =
                        `translate3d(
                            ${mouseX}px,
                            ${mouseY}px,
                            0
                        )`;

                    cursorFrame = null;
                });
        },
        {
            passive: true
        }
    );
}


/* =====================================================
   MAGNETIC HOVER EFFECT
===================================================== */

magneticElements.forEach(element => {

    element.addEventListener(
        "mousemove",
        event => {

            if (window.innerWidth <= 850) {
                return;
            }

            const rect =
                element.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left -
                rect.width / 2;

            const y =
                event.clientY -
                rect.top -
                rect.height / 2;

            element.style.transform =
                `translate3d(
                    ${x * 0.18}px,
                    ${y * 0.18}px,
                    0
                )`;
        }
    );


    element.addEventListener(
        "mouseleave",
        () => {

            element.style.transform =
                "translate3d(0, 0, 0)";
        }
    );
});


/* =====================================================
   MOUSE-TRACKING CARD SPOTLIGHT
===================================================== */

spotlightCards.forEach(card => {

    let spotlightFrame = null;

    card.addEventListener(
        "mousemove",
        event => {

            if (spotlightFrame) {
                return;
            }

            spotlightFrame =
                requestAnimationFrame(() => {

                    const rect =
                        card.getBoundingClientRect();

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

                    spotlightFrame = null;
                });
        }
    );
});


/* =====================================================
   3D PROJECT CARD TILT
===================================================== */

tiltCards.forEach(card => {

    let tiltFrame = null;

    card.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth <= 850 ||
                tiltFrame
            ) {
                return;
            }

            tiltFrame =
                requestAnimationFrame(() => {

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
                        (
                            (mouseY - centerY) /
                            centerY
                        ) * -3;

                    const rotateY =
                        (
                            (mouseX - centerX) /
                            centerX
                        ) * 3;

                    card.style.transform = `
                        perspective(1000px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-4px)
                    `;

                    tiltFrame = null;
                });
        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            if (tiltFrame) {
                cancelAnimationFrame(
                    tiltFrame
                );

                tiltFrame = null;
            }

            card.style.transform = `
                perspective(1000px)
                rotateX(0deg)
                rotateY(0deg)
                translateY(0)
            `;
        }
    );
});


/* =====================================================
   OPTIMIZED TEXT SCRAMBLE EFFECT
===================================================== */

const scrambleCharacters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";


function scrambleText(element) {

    /*
        Prevent the animation from restarting
        while it is already running.
    */

    if (element.scrambleFrame) {
        return;
    }


    const originalText =
        element.dataset.originalText ||
        element.textContent;

    element.dataset.originalText =
        originalText;


    let iteration = 0;

    let lastUpdate = 0;


    function animate(timestamp) {

        /*
            Update the text around 25 times
            per second instead of every frame.
        */

        if (timestamp - lastUpdate >= 40) {

            element.textContent =
                originalText
                    .split("")
                    .map(
                        (
                            character,
                            index
                        ) => {

                            /*
                                Keep spaces
                                unchanged.
                            */

                            if (
                                character === " "
                            ) {
                                return " ";
                            }


                            /*
                                Keep revealed
                                characters.
                            */

                            if (
                                index <
                                iteration
                            ) {
                                return originalText[
                                    index
                                ];
                            }


                            /*
                                Generate random
                                scramble character.
                            */

                            return scrambleCharacters[
                                Math.floor(
                                    Math.random() *
                                    scrambleCharacters
                                        .length
                                )
                            ];
                        }
                    )
                    .join("");


            iteration += 0.5;

            lastUpdate = timestamp;
        }


        if (
            iteration <
            originalText.length
        ) {

            element.scrambleFrame =
                requestAnimationFrame(
                    animate
                );

        } else {

            element.textContent =
                originalText;

            element.scrambleFrame =
                null;
        }
    }


    element.scrambleFrame =
        requestAnimationFrame(
            animate
        );
}


scrambleElements.forEach(element => {

    element.addEventListener(
        "mouseenter",
        () => {

            scrambleText(element);
        }
    );
});


/* =====================================================
   SCROLL REVEAL ANIMATION
===================================================== */

if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList.add(
                                "visible"
                            );

                        revealObserver
                            .unobserve(
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

        revealObserver.observe(
            element
        );
    });

} else {

    /*
        Fallback for browsers without
        IntersectionObserver support.
    */

    revealElements.forEach(element => {

        element.classList.add(
            "visible"
        );
    });
}


/* =====================================================
   CONTACT FORM
===================================================== */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const submitButton =
                contactForm.querySelector(
                    ".submit-btn"
                );

            if (!submitButton) {
                return;
            }


            const buttonText =
                submitButton.querySelector(
                    "span"
                );

            if (!buttonText) {
                return;
            }


            const originalText =
                buttonText.textContent;


            buttonText.textContent =
                "Sending...";

            submitButton.disabled =
                true;


            setTimeout(() => {

                buttonText.textContent =
                    "Message Sent";


                if (formMessage) {

                    formMessage.textContent =
                        "Thanks! Your message has been prepared successfully.";
                }


                contactForm.reset();


                setTimeout(() => {

                    buttonText.textContent =
                        originalText;

                    submitButton.disabled =
                        false;


                    if (formMessage) {

                        formMessage.textContent =
                            "";
                    }

                }, 3000);

            }, 900);
        }
    );
}