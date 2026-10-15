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


/* ================= CONTACT FORM ================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const body =
            "Name: " + name + "\n" +
            "Email: " + email + "\n\n" +
            message;

        window.location.href =
            "mailto:kanujkumar361@gmail.com" +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(body);

        contactForm.reset();

    });

}
