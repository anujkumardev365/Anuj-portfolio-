/* ================= TYPING EFFECT ================= */

const typingElement = document.getElementById("typing");

const words = [
    "Aspiring Software Developer",
    "BCA Student",
    "Web Development Learner",
    "Problem Solver"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    typingElement.textContent = isDeleting
        ? currentWord.substring(0, charIndex--)
        : currentWord.substring(0, charIndex++);

    let speed = isDeleting ? 50 : 120;

    if (!isDeleting && charIndex === currentWord.length + 1) {
        isDeleting = true;
        speed = 2000;
    } else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

if (typingElement) {
    typeEffect();
}


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

function closeMenu() {
    navbar.classList.remove("show");
    menuBtn.setAttribute("aria-expanded", "false");
}

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", () => {
        const isOpen = navbar.classList.toggle("show");
        menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    document.querySelectorAll(".navbar a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (e) => {
        if (!navbar.contains(e.target) && !menuBtn.contains(e.target)) {
            closeMenu();
        }
    });

}


/* ================= ACTIVE NAV LINK + SCROLL TO TOP ================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a");
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    const scrollPos = window.scrollY + 120;

    let currentSection = "";

    sections.forEach(section => {
        if (scrollPos >= section.offsetTop) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + currentSection
        );
    });

    if (topBtn) {
        topBtn.classList.toggle("show", window.scrollY > 400);
    }

});

if (topBtn) {
    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}


/* ================= COPYRIGHT YEAR ================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* ================= CONTACT FORM (Web3Forms) ================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    const submitBtn = document.getElementById("submitBtn");
    const btnLabel = submitBtn ? submitBtn.querySelector(".btn-label") : null;
    const formStatus = document.getElementById("formStatus");

    const STATUS_MESSAGES = {
        loading: "Sending...",
        success: "Thank you! Your message has been sent.",
        error: "Sorry! Your message could not be sent. Please try again."
    };

    /* Updates the status box and the submit button for each state */
    function setFormState(state, text) {

        if (formStatus) {
            formStatus.textContent = text;
            formStatus.className = "form-status show " + state;
        }

        const isLoading = state === "loading";

        if (submitBtn) {
            submitBtn.disabled = isLoading;
            submitBtn.classList.toggle("loading", isLoading);
        }

        if (btnLabel) {
            btnLabel.textContent = isLoading ? "Sending..." : "Send Message";
        }
    }

    /* Hide stale success/error messages once the user edits the form */
    contactForm.addEventListener("input", () => {

        if (!formStatus) return;

        if (formStatus.classList.contains("success") ||
            formStatus.classList.contains("error")) {
            formStatus.textContent = "";
            formStatus.className = "form-status";
        }
    });

    contactForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        /* Client-side validation: required, type="email", minlength... */
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        setFormState("loading", STATUS_MESSAGES.loading);

        try {

            /* Same request format as the official Web3Forms AJAX example:
               JSON body + Accept: application/json guarantees a JSON response
               (no 303 redirect, which is only for non-JS submissions).       */
            const payload = Object.fromEntries(new FormData(contactForm));

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json().catch(() => null);

            if (!response.ok || !data || !data.success) {

                /* API puts errors in message or body.message depending on type */
                const apiMessage = data
                    ? data.message || (data.body && data.body.message)
                    : null;

                setFormState("error", apiMessage || STATUS_MESSAGES.error);
                return;
            }

            contactForm.reset();
            setFormState("success", STATUS_MESSAGES.success);

        } catch (error) {

            /* Network failure, offline, blocked request... */
            setFormState("error", STATUS_MESSAGES.error);

        } finally {

            if (submitBtn) submitBtn.disabled = false;
            if (submitBtn) submitBtn.classList.remove("loading");
            if (btnLabel) btnLabel.textContent = "Send Message";
        }
    });

}
