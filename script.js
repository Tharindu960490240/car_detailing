// Initialize Lucide Vector Icons
lucide.createIcons();

// RESPONSIVE MOBILE NAVIGATION CONTROLLER
const mobileToggle = document.querySelector(".mobile-menu-toggle");
const navLinks = document.querySelector(".nav-links");
const menuLinks = document.querySelectorAll(".nav-links a");

function toggleMenu() {
  const isExpanded = mobileToggle.getAttribute("aria-expanded") === "true";
  mobileToggle.setAttribute("aria-expanded", !isExpanded);
  mobileToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
}

mobileToggle.addEventListener("click", toggleMenu);

// Automatically dismiss menu overlay when links are activated
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
      toggleMenu();
    }
  });
});

// INTERSECTION REVEAL SCROLL ANIMATION
const reveals = document.querySelectorAll(".reveal");
const observerOptions = {
  root: null,
  threshold: 0.1,
  rootMargin: "0px 0px -40px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      // Once it animates, stop watching this element for clean runtime performance
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

reveals.forEach((el) => observer.observe(el));

// NAVBAR ON-SCROLL COMPRESSION TRANSITION
window.addEventListener(
  "scroll",
  () => {
    const nav = document.querySelector("nav");
    const promo = document.querySelector(".pb-shell");
    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
      promo.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
      promo.classList.remove("scrolled"); 
    }
  },
  { passive: true },
);

// ASYNC CLIENT-SIDE QUOTE REQUEST FORM HANDLER (Formspree)
document
  .getElementById("quoteForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = this; // Cache the form element
    const submitBtn = document.getElementById("formSubmitBtn");
    const formSuccessAlert = document.getElementById("formSuccessAlert");
    const formErrorAlert = document.getElementById("formErrorAlert");

    // Basic UI Feedback
    submitBtn.textContent = "Sending…";
    submitBtn.disabled = true;

    // Hide previous alerts
    formSuccessAlert.style.display = "none";
    formErrorAlert.style.display = "none";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (response.ok) {
        form.reset();
        form.style.display = "none";
        formSuccessAlert.style.display = "block";

        // If using Lucide icons, refresh them
        if (typeof lucide !== "undefined") lucide.createIcons();

        setTimeout(() => {
          form.style.display = "block";
          formSuccessAlert.style.display = "none";
        }, 5000); // Increased to 5s for better readability
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      form.style.display = "none";
      formErrorAlert.style.display = "block";

      if (typeof lucide !== "undefined") lucide.createIcons();

      setTimeout(() => {
        form.style.display = "block";
        formErrorAlert.style.display = "none";
      }, 5000);
    } finally {
      submitBtn.textContent = "Send Request";
      submitBtn.disabled = false;
    }
  });

// SCROLL TO TOP (PAGE UP) FUNCTIONALITY
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener(
  "scroll",
  () => {
    // Show button after scrolling down 400px
    if (window.scrollY > 400) {
      scrollToTopBtn.classList.add("show");
    } else {
      scrollToTopBtn.classList.remove("show");
    }
  },
  { passive: true },
);

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
