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

    header.classList.toggle(
        "scrolled",
        window.scrollY > 60
    );
}


window.addEventListener(
    "scroll",
    updateNavbar,
    {
        passive: true
    }
);


updateNavbar();


/* =====================================================
   MOBILE MENU
===================================================== */

if (menuToggle && navMenu) {

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                navMenu.classList.toggle(
                    "active"
                );


            menuToggle.classList.toggle(
                "active",
                isOpen
            );


            document.body.classList.toggle(
                "menu-open",
                isOpen
            );


            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navMenu.classList.remove(
                    "active"
                );


                menuToggle.classList.remove(
                    "active"
                );


                document.body.classList.remove(
                    "menu-open"
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

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


    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;


        if (
            window.scrollY >=
            sectionTop
        ) {

            currentSection =
                section.id;

        }

    });


    navLinks.forEach(link => {

        const isActive =
            link.getAttribute("href") ===
            `#${currentSection}`;


        link.classList.toggle(
            "active",
            isActive
        );


        if (isActive) {

            moveIndicator(link);

        }

    });

}


/* =====================================================
   OPTIMIZED NAVIGATION SCROLL
===================================================== */

let scrollFrame = null;


window.addEventListener(
    "scroll",
    () => {

        if (scrollFrame) return;


        scrollFrame =
            requestAnimationFrame(
                () => {

                    setActiveLink();

                    scrollFrame = null;

                }
            );

    },
    {
        passive: true
    }
);


window.addEventListener(
    "resize",
    () => {

        const activeLink =
            document.querySelector(
                ".nav-link.active"
            );


        if (activeLink) {

            moveIndicator(
                activeLink
            );

        }

    }
);


window.addEventListener(
    "load",
    () => {

        setActiveLink();


        const activeLink =
            document.querySelector(
                ".nav-link.active"
            );


        if (activeLink) {

            moveIndicator(
                activeLink
            );

        }

    }
);


/* =====================================================
   CURSOR GLOW
===================================================== */

if (
    cursorGlow &&
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    let cursorFrame = null;

    let mouseX = 0;
    let mouseY = 0;


    document.addEventListener(
        "pointermove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;


            if (cursorFrame) {

                return;

            }


            cursorFrame =
                requestAnimationFrame(
                    () => {

                        cursorGlow.style.left =
                            `${mouseX}px`;


                        cursorGlow.style.top =
                            `${mouseY}px`;


                        cursorFrame =
                            null;

                    }
                );

        },
        {
            passive: true
        }
    );

}


/* =====================================================
   MAGNETIC HOVER EFFECT
===================================================== */

if (
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    magneticElements.forEach(
        element => {

            let magneticFrame = null;

            let mouseX = 0;
            let mouseY = 0;


            element.addEventListener(
                "pointermove",
                event => {

                    if (
                        window.innerWidth <=
                        850
                    ) {

                        return;

                    }


                    mouseX =
                        event.clientX;

                    mouseY =
                        event.clientY;


                    if (
                        magneticFrame
                    ) {

                        return;

                    }


                    magneticFrame =
                        requestAnimationFrame(
                            () => {

                                const rect =
                                    element
                                        .getBoundingClientRect();


                                const x =
                                    mouseX -
                                    rect.left -
                                    rect.width / 2;


                                const y =
                                    mouseY -
                                    rect.top -
                                    rect.height / 2;


                                element.style.transform =
                                    `translate3d(
                                        ${x * 0.18}px,
                                        ${y * 0.18}px,
                                        0
                                    )`;


                                magneticFrame =
                                    null;

                            }
                        );

                }
            );


            element.addEventListener(
                "pointerleave",
                () => {

                    if (
                        magneticFrame
                    ) {

                        cancelAnimationFrame(
                            magneticFrame
                        );


                        magneticFrame =
                            null;

                    }


                    element.style.transform =
                        "translate3d(0, 0, 0)";

                }
            );

        }
    );

}


/* =====================================================
   CARD SPOTLIGHT EFFECT
===================================================== */

if (
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    spotlightCards.forEach(
        card => {

            let spotlightFrame = null;

            let mouseX = 0;
            let mouseY = 0;


            card.addEventListener(
                "pointermove",
                event => {

                    mouseX =
                        event.clientX;

                    mouseY =
                        event.clientY;


                    if (
                        spotlightFrame
                    ) {

                        return;

                    }


                    spotlightFrame =
                        requestAnimationFrame(
                            () => {

                                const rect =
                                    card
                                        .getBoundingClientRect();


                                card.style.setProperty(
                                    "--mouse-x",
                                    `${
                                        mouseX -
                                        rect.left
                                    }px`
                                );


                                card.style.setProperty(
                                    "--mouse-y",
                                    `${
                                        mouseY -
                                        rect.top
                                    }px`
                                );


                                spotlightFrame =
                                    null;

                            }
                        );

                }
            );

        }
    );

}


/* =====================================================
   PROJECT CARD 3D TILT
===================================================== */

if (
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    tiltCards.forEach(
        card => {

            let tiltFrame = null;

            let mouseX = 0;
            let mouseY = 0;


            card.addEventListener(
                "pointermove",
                event => {

                    if (
                        window.innerWidth <=
                        850
                    ) {

                        return;

                    }


                    mouseX =
                        event.clientX;

                    mouseY =
                        event.clientY;


                    if (
                        tiltFrame
                    ) {

                        return;

                    }


                    tiltFrame =
                        requestAnimationFrame(
                            () => {

                                const rect =
                                    card
                                        .getBoundingClientRect();


                                const centerX =
                                    rect.width / 2;


                                const centerY =
                                    rect.height / 2;


                                const rotateX =
                                    (
                                        (
                                            mouseY -
                                            rect.top -
                                            centerY
                                        ) /
                                        centerY
                                    ) * -3;


                                const rotateY =
                                    (
                                        (
                                            mouseX -
                                            rect.left -
                                            centerX
                                        ) /
                                        centerX
                                    ) * 3;


                                card.style.transform = `
                                    perspective(1000px)
                                    rotateX(${rotateX}deg)
                                    rotateY(${rotateY}deg)
                                    translateY(-4px)
                                `;


                                tiltFrame =
                                    null;

                            }
                        );

                }
            );


            card.addEventListener(
                "pointerleave",
                () => {

                    if (
                        tiltFrame
                    ) {

                        cancelAnimationFrame(
                            tiltFrame
                        );


                        tiltFrame =
                            null;

                    }


                    card.style.transform = `
                        perspective(1000px)
                        rotateX(0deg)
                        rotateY(0deg)
                        translateY(0)
                    `;

                }
            );

        }
    );

}


/* =====================================================
   STABLE TEXT SCRAMBLE EFFECT
===================================================== */

const scrambleUppercase =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const scrambleLowercase =
    "abcdefghijklmnopqrstuvwxyz";

const scrambleNumbers =
    "0123456789";


/* =====================================================
   GET TEXT NODES
===================================================== */

/*
    This allows the scramble effect to work
    without destroying nested HTML elements.

    Example:

    <h2 class="scramble">
        Beyond the <span>code.</span>
    </h2>
*/

function getTextNodes(element) {

    const textNodes = [];


    const walker =
        document.createTreeWalker(

            element,

            NodeFilter.SHOW_TEXT,

            {

                acceptNode(node) {

                    if (
                        node.nodeValue
                            .trim()
                            .length === 0
                    ) {

                        return NodeFilter
                            .FILTER_REJECT;

                    }


                    return NodeFilter
                        .FILTER_ACCEPT;

                }

            }

        );


    while (
        walker.nextNode()
    ) {

        textNodes.push({

            node:
                walker.currentNode,

            original:
                walker.currentNode
                    .nodeValue

        });

    }


    return textNodes;

}


/* =====================================================
   SAVE ORIGINAL SCRAMBLE TEXT
===================================================== */

scrambleElements.forEach(
    element => {

        element._scrambleNodes =
            getTextNodes(
                element
            );


        element._scrambleRunning =
            false;


        element._scrambleFrame =
            null;

    }
);


/* =====================================================
   GET RANDOM SCRAMBLE CHARACTER
===================================================== */

function getScrambleCharacter(
    character
) {

    /*
        Preserve spaces and line breaks.
    */

    if (
        /\s/.test(
            character
        )
    ) {

        return character;

    }


    /*
        Preserve punctuation.

        This means:
        . , ! ? - ' etc.

        will not change.
    */

    if (
        !/[a-zA-Z0-9]/.test(
            character
        )
    ) {

        return character;

    }


    /*
        Replace uppercase letters
        only with uppercase letters.
    */

    if (
        /[A-Z]/.test(
            character
        )
    ) {

        return scrambleUppercase[
            Math.floor(
                Math.random() *
                scrambleUppercase.length
            )
        ];

    }


    /*
        Replace lowercase letters
        only with lowercase letters.
    */

    if (
        /[a-z]/.test(
            character
        )
    ) {

        return scrambleLowercase[
            Math.floor(
                Math.random() *
                scrambleLowercase.length
            )
        ];

    }


    /*
        Replace numbers only
        with other numbers.
    */

    return scrambleNumbers[
        Math.floor(
            Math.random() *
            scrambleNumbers.length
        )
    ];

}


/* =====================================================
   SCRAMBLE ANIMATION
===================================================== */

function scrambleText(
    element
) {

    /*
        Do not start another animation
        while one is already running.
    */

    if (
        element._scrambleRunning
    ) {

        return;

    }


    const textNodes =
        element._scrambleNodes;


    if (
        !textNodes ||
        textNodes.length === 0
    ) {

        return;

    }


    element._scrambleRunning =
        true;


    /*
        Total scramble animation duration.
    */

    const duration =
        400;


    /*
        Update approximately every 55ms.

        This reduces unnecessary DOM updates.
    */

    const updateInterval =
        55;


    let startTime =
        null;


    let lastUpdate =
        0;


    /* Restore original text */

    function restoreText() {

        textNodes.forEach(
            item => {

                item.node.nodeValue =
                    item.original;

            }
        );


        element._scrambleRunning =
            false;


        element._scrambleFrame =
            null;

    }


    /* Animation loop */

    function animate(
        timestamp
    ) {

        if (
            startTime === null
        ) {

            startTime =
                timestamp;

        }


        const elapsed =
            timestamp -
            startTime;


        /*
            Generate new random characters.
        */

        if (
            timestamp -
            lastUpdate >=
            updateInterval
        ) {

            textNodes.forEach(
                item => {

                    item.node.nodeValue =
                        Array.from(
                            item.original
                        )

                            .map(
                                character => {

                                    return getScrambleCharacter(
                                        character
                                    );

                                }
                            )

                            .join("");

                }
            );


            lastUpdate =
                timestamp;

        }


        /*
            Continue animation.
        */

        if (
            elapsed <
            duration
        ) {

            element._scrambleFrame =
                requestAnimationFrame(
                    animate
                );

        }

        /*
            Animation complete.
        */

        else {

            restoreText();

        }

    }


    element._scrambleFrame =
        requestAnimationFrame(
            animate
        );

}


/* =====================================================
   SCRAMBLE HOVER EVENT
===================================================== */

/*
    mouseenter is used instead of pointerenter.

    This prevents touch interactions from
    accidentally triggering the scramble effect.
*/

scrambleElements.forEach(
    element => {

        element.addEventListener(
            "mouseenter",
            () => {

                scrambleText(
                    element
                );

            }
        );

    }
);


/* =====================================================
   SCROLL REVEAL ANIMATION
===================================================== */

if (
    "IntersectionObserver"
    in window
) {

    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

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

                    }
                );

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );

}

else {

    revealElements.forEach(
        element => {

            element.classList.add(
                "visible"
            );

        }
    );

}


/* =====================================================
   CONTACT FORM
===================================================== */

if (
    contactForm
) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const submitButton =
                contactForm.querySelector(
                    ".submit-btn"
                );


            if (
                !submitButton
            ) {

                return;

            }


            const buttonText =
                submitButton.querySelector(
                    "span"
                );


            if (
                !buttonText
            ) {

                return;

            }


            const originalText =
                buttonText.textContent;


            buttonText.textContent =
                "Sending...";


            submitButton.disabled =
                true;


            setTimeout(
                () => {

                    buttonText.textContent =
                        "Message Sent";


                    if (
                        formMessage
                    ) {

                        formMessage.textContent =
                            "Thanks! Your message has been prepared successfully.";

                    }


                    contactForm.reset();


                    setTimeout(
                        () => {

                            buttonText.textContent =
                                originalText;


                            submitButton.disabled =
                                false;


                            if (
                                formMessage
                            ) {

                                formMessage.textContent =
                                    "";

                            }

                        },
                        3000
                    );

                },
                900
            );

        }
    );

}


/* =====================================================
   REDUCED MOTION SUPPORT
===================================================== */

if (
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches
) {

    revealElements.forEach(
        element => {

            element.classList.add(
                "visible"
            );

        }
    );

}