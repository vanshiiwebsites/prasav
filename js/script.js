/* =========================================================
   PRASAV — COMMON JAVASCRIPT
   File: js/script.js
   Part 14A
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* =====================================================
       DOM ELEMENTS
       ===================================================== */

    const body = document.body;

    const header =
        document.querySelector(".site-header");

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navLinks =
        document.querySelector(".nav-links");

    const navigationLinks =
        document.querySelectorAll(".nav-links a");

    const currentYearElements =
        document.querySelectorAll(".current-year");


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    currentYearElements.forEach((element) => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       STICKY HEADER
       ===================================================== */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    function openMenu() {

        if (!menuToggle || !navLinks) return;

        menuToggle.classList.add("active");

        navLinks.classList.add("active");

        body.classList.add("menu-open");

    }


    function closeMenu() {

        if (!menuToggle || !navLinks) return;

        menuToggle.classList.remove("active");

        navLinks.classList.remove("active");

        body.classList.remove("menu-open");

    }


    function toggleMenu() {

        if (!navLinks) return;

        navLinks.classList.contains("active")
            ? closeMenu()
            : openMenu();

    }


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            toggleMenu
        );

    }


    navigationLinks.forEach((link) => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });


    /* =====================================================
       ESC KEY SUPPORT
       ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeMenu();

        }

    });


    /* =====================================================
       WINDOW RESIZE
       ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 1024) {

            closeMenu();

        }

    });
      /* =====================================================
       SMOOTH SCROLLING
       PART 14B
       ===================================================== */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');


    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length < 2
            ) {
                return;
            }

            const targetSection =
                document.querySelector(targetId);

            if (!targetSection) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                targetSection.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

            closeMenu();

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION LINK
       ===================================================== */

    function removeActiveNavigationLinks() {

        navigationLinks.forEach((link) => {

            link.classList.remove("active");

            link.removeAttribute("aria-current");

        });

    }


    function activateNavigationLink(sectionId) {

        if (!sectionId) return;

        const activeLink =
            document.querySelector(
                `.nav-links a[href="#${sectionId}"]`
            );

        if (!activeLink) return;

        removeActiveNavigationLinks();

        activeLink.classList.add("active");

        activeLink.setAttribute(
            "aria-current",
            "page"
        );

    }


    /* =====================================================
       SCROLL SPY
       ===================================================== */

    const observedSections = [];

    navigationLinks.forEach((link) => {

        const href =
            link.getAttribute("href");

        if (
            !href ||
            !href.startsWith("#") ||
            href === "#"
        ) {
            return;
        }

        const section =
            document.querySelector(href);

        if (section) {

            observedSections.push(section);

        }

    });


    function updateActiveNavigation() {

        if (observedSections.length === 0) {
            return;
        }

        const headerOffset =
            header
                ? header.offsetHeight + 80
                : 120;

        let activeSection = null;

        observedSections.forEach((section) => {

            const sectionTop =
                section.getBoundingClientRect().top;

            if (sectionTop <= headerOffset) {

                activeSection = section;

            }

        });

        if (!activeSection) {

            activeSection =
                observedSections[0];

        }

        activateNavigationLink(
            activeSection.id
        );

    }


    updateActiveNavigation();

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        {
            passive: true
        }
    );


    /* =====================================================
       URL HASH SUPPORT
       ===================================================== */

    function scrollToInitialHash() {

        const hash =
            window.location.hash;

        if (
            !hash ||
            hash === "#"
        ) {
            return;
        }

        const targetSection =
            document.querySelector(hash);

        if (!targetSection) {
            return;
        }

        window.setTimeout(() => {

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                targetSection.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({

                top: targetPosition,

                behavior: "auto"

            });

        }, 100);

    }


    scrollToInitialHash();


    /* =====================================================
       KEYBOARD NAVIGATION SUPPORT
       ===================================================== */

    navigationLinks.forEach((link) => {

        link.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    link.click();

                }

            }
        );

    });


    /* =====================================================
       PART 14B COMPLETE
       ===================================================== */
      /* =====================================================
       SEARCH OVERLAY
       PART 15A
       ===================================================== */

    const searchToggle =
        document.querySelector(".search-toggle");

    const searchPanel =
        document.querySelector(".search-panel");

    const searchClose =
        document.querySelector(".search-close");

    const searchInput =
        document.querySelector(".search-input");


    function openSearchPanel() {

        if (!searchPanel) return;

        searchPanel.classList.add("active");

        body.classList.add("search-open");

        if (searchInput) {

            window.setTimeout(() => {

                searchInput.focus();

            }, 250);

        }

    }


    function closeSearchPanel() {

        if (!searchPanel) return;

        searchPanel.classList.remove("active");

        body.classList.remove("search-open");

    }


    if (searchToggle) {

        searchToggle.addEventListener(

            "click",

            openSearchPanel

        );

    }


    if (searchClose) {

        searchClose.addEventListener(

            "click",

            closeSearchPanel

        );

    }


    /* =====================================================
       CLOSE SEARCH USING ESC
       ===================================================== */

    document.addEventListener(

        "keydown",

        (event) => {

            if (event.key === "Escape") {

                closeSearchPanel();

            }

        }

    );


    /* =====================================================
       CLICK OUTSIDE TO CLOSE
       ===================================================== */

    if (searchPanel) {

        searchPanel.addEventListener(

            "click",

            (event) => {

                if (

                    event.target === searchPanel

                ) {

                    closeSearchPanel();

                }

            }

        );

    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =

        document.querySelectorAll(

            ".reveal"

        );


    if (

        "IntersectionObserver" in window &&

        revealElements.length

    ) {

        const revealObserver =

            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach(

                        (entry) => {

                            if (

                                !entry.isIntersecting

                            ) {

                                return;

                            }

                            entry.target.classList.add(

                                "revealed"

                            );

                            observer.unobserve(

                                entry.target

                            );

                        }

                    );

                },

                {

                    threshold: 0.15,

                    rootMargin:

                        "0px 0px -80px 0px"

                }

            );


        revealElements.forEach(

            (element) => {

                revealObserver.observe(

                    element

                );

            }

        );

    } else {

        revealElements.forEach(

            (element) => {

                element.classList.add(

                    "revealed"

                );

            }

        );

    }


    /* =====================================================
       SEARCH FORM
       ===================================================== */

    const searchForm =

        document.querySelector(

            ".search-form"

        );


    if (

        searchForm &&

        searchInput

    ) {

        searchForm.addEventListener(

            "submit",

            (event) => {

                event.preventDefault();

                closeSearchPanel();

            }

        );

    }


    /* =====================================================
       PART 15A COMPLETE
       ===================================================== */
      /* =====================================================
       NEWSLETTER FORM
       PART 15B
       ===================================================== */

    const newsletterForm =
        document.querySelector(".newsletter-form");

    const newsletterInput =
        document.querySelector(".newsletter-input");


    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }


    function showNewsletterMessage(message, type) {

        if (!newsletterForm) return;

        let messageElement =
            newsletterForm.parentElement.querySelector(
                ".newsletter-message"
            );

        if (!messageElement) {

            messageElement =
                document.createElement("p");

            messageElement.className =
                "newsletter-message";

            messageElement.setAttribute(
                "role",
                "status"
            );

            messageElement.setAttribute(
                "aria-live",
                "polite"
            );

            newsletterForm.insertAdjacentElement(
                "afterend",
                messageElement
            );

        }

        messageElement.textContent = message;

        messageElement.classList.remove(
            "success",
            "error"
        );

        messageElement.classList.add(type);

    }


    if (newsletterForm && newsletterInput) {

        newsletterForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                const email =
                    newsletterInput.value.trim();

                if (!email) {

                    showNewsletterMessage(
                        "Please enter your email address.",
                        "error"
                    );

                    newsletterInput.focus();

                    return;

                }

                if (!isValidEmail(email)) {

                    showNewsletterMessage(
                        "Please enter a valid email address.",
                        "error"
                    );

                    newsletterInput.focus();

                    return;

                }

                showNewsletterMessage(
                    "Thank you for joining the PRASAV community.",
                    "success"
                );

                newsletterForm.reset();

            }
        );

    }


    /* =====================================================
       IMAGE LOADING ENHANCEMENTS
       ===================================================== */

    const pageImages =
        document.querySelectorAll("img");


    pageImages.forEach((image) => {

        if (!image.hasAttribute("loading")) {

            const isHeroImage =
                image.closest(".hero") ||
                image.closest(".hero-section");

            if (!isHeroImage) {

                image.setAttribute(
                    "loading",
                    "lazy"
                );

            }

        }

        if (!image.hasAttribute("decoding")) {

            image.setAttribute(
                "decoding",
                "async"
            );

        }

        image.addEventListener(
            "load",
            () => {

                image.classList.add(
                    "image-loaded"
                );

            },
            {
                once: true
            }
        );

        if (image.complete) {

            image.classList.add(
                "image-loaded"
            );

        }

    });


    /* =====================================================
       EXTERNAL LINK SECURITY
       ===================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );


    externalLinks.forEach((link) => {

        const currentRel =
            link.getAttribute("rel") || "";

        const relValues =
            new Set(
                currentRel
                    .split(/\s+/)
                    .filter(Boolean)
            );

        relValues.add("noopener");

        relValues.add("noreferrer");

        link.setAttribute(
            "rel",
            Array.from(relValues).join(" ")
        );

    });


    /* =====================================================
       ACCESSIBILITY ATTRIBUTES
       ===================================================== */

    if (menuToggle) {

        menuToggle.setAttribute(
            "aria-expanded",
            navLinks &&
            navLinks.classList.contains("active")
                ? "true"
                : "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    }


    if (searchToggle) {

        searchToggle.setAttribute(
            "aria-expanded",
            searchPanel &&
            searchPanel.classList.contains("active")
                ? "true"
                : "false"
        );

        searchToggle.setAttribute(
            "aria-label",
            "Open search"
        );

    }


    if (searchClose) {

        searchClose.setAttribute(
            "aria-label",
            "Close search"
        );

    }


    const originalOpenMenu =
        openMenu;

    const originalCloseMenu =
        closeMenu;

    openMenu = function () {

        originalOpenMenu();

        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

        }

    };


    closeMenu = function () {

        originalCloseMenu();

        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    };


    const originalOpenSearchPanel =
        openSearchPanel;

    const originalCloseSearchPanel =
        closeSearchPanel;

    openSearchPanel = function () {

        originalOpenSearchPanel();

        if (searchToggle) {

            searchToggle.setAttribute(
                "aria-expanded",
                "true"
            );

        }

        if (searchPanel) {

            searchPanel.setAttribute(
                "aria-hidden",
                "false"
            );

        }

    };


    closeSearchPanel = function () {

        originalCloseSearchPanel();

        if (searchToggle) {

            searchToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

        if (searchPanel) {

            searchPanel.setAttribute(
                "aria-hidden",
                "true"
            );

        }

    };


    if (searchPanel) {

        searchPanel.setAttribute(
            "aria-hidden",
            searchPanel.classList.contains("active")
                ? "false"
                : "true"
        );

    }


    /* =====================================================
       REDUCED MOTION SUPPORT
       ===================================================== */

    const reducedMotionQuery =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    function updateMotionPreference(event) {

        body.classList.toggle(
            "reduced-motion",
            event.matches
        );

    }


    updateMotionPreference(
        reducedMotionQuery
    );


    if (
        typeof reducedMotionQuery.addEventListener
        === "function"
    ) {

        reducedMotionQuery.addEventListener(
            "change",
            updateMotionPreference
        );

    } else if (
        typeof reducedMotionQuery.addListener
        === "function"
    ) {

        reducedMotionQuery.addListener(
            updateMotionPreference
        );

    }


    /* =====================================================
       PAGE VISIBILITY OPTIMIZATION
       ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            body.classList.toggle(
                "page-hidden",
                document.hidden
            );

        }
    );


    /* =====================================================
       RESIZE OPTIMIZATION
       ===================================================== */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            window.clearTimeout(
                resizeTimer
            );

            resizeTimer =
                window.setTimeout(
                    () => {

                        updateHeader();

                        updateActiveNavigation();

                    },
                    150
                );

        },
        {
            passive: true
        }
    );


    /* =====================================================
       FINAL PAGE READY STATE
       ===================================================== */

    window.requestAnimationFrame(() => {

        body.classList.add(
            "page-ready"
        );

    });


    /* =====================================================
       PRASAV JAVASCRIPT COMPLETE
       ===================================================== */

});
