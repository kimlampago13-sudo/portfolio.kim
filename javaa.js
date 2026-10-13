/* =========================================
   KIM NICOLE — PORTFOLIO INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTS
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const yearElement = document.getElementById("year");

    // ENABLE JAVASCRIPT-SPECIFIC ANIMATIONS
    document.body.classList.add("js-enabled");

    // AUTOMATIC COPYRIGHT YEAR
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // MOBILE NAVIGATION
    if (menuToggle && navMenu) {

        const closeMenu = () => {
            navMenu.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");

            const icon = menuToggle.querySelector(".menu-icon");

            if (icon) {
                icon.textContent = "☰";
            }
        };

        const openMenu = () => {
            navMenu.classList.add("active");

            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute("aria-label", "Close navigation");

            const icon = menuToggle.querySelector(".menu-icon");

            if (icon) {
                icon.textContent = "✕";
            }
        };

        // OPEN OR CLOSE MENU
        menuToggle.addEventListener("click", () => {
            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // CLOSE MENU AFTER NAVIGATION
        navMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        // CLOSE MENU WHEN CLICKING OUTSIDE
        document.addEventListener("click", (event) => {
            const isOpen =
                navMenu.classList.contains("active");

            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (
                isOpen &&
                !clickedInsideMenu &&
                !clickedToggle
            ) {
                closeMenu();
            }
        });

        // CLOSE MENU USING ESCAPE
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        // RESET MENU WHEN SWITCHING TO DESKTOP
        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                closeMenu();
            }
        });
    }

    // SCROLL REVEAL ANIMATIONS
    const revealElements =
        document.querySelectorAll(".reveal");

    const showAllElements = () => {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    };

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (
        prefersReducedMotion ||
        !("IntersectionObserver" in window)
    ) {
        showAllElements();
    } else {

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");

                        observerInstance.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -30px 0px"
            }
        );

        revealElements.forEach((element) => {
            observer.observe(element);
        });
    }

    // PROFILE PHOTO FALLBACK
    const profilePhoto =
        document.querySelector(".profile-photo");

    if (profilePhoto) {
        profilePhoto.addEventListener("error", () => {
            profilePhoto.alt =
                "Profile photo unavailable. Please check profile.jpg.";
        }, { once: true });
    }

});
