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
menuLinks.forEach(link => {
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
  rootMargin: "0px 0px -40px 0px"
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
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 40) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
}, { passive: true });

// ASYNC CLIENT-SIDE QUOTE REQUEST FORM HANDLER
document.getElementById("quoteForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("fname").value.trim();
  const phone = document.getElementById("fphone").value.trim();

  if (!name || !phone) {
    alert("Please fill all required fields.");
    return;
  }

  // Visual Swap for completion UI status
  this.style.display = "none";
  document.getElementById("formSuccess").style.display = "block";
});