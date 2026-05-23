lucide.createIcons();

// MOBILE MENU

const mobileToggle = document.querySelector(".mobile-menu-toggle");

const navLinks = document.querySelector(".nav-links");

mobileToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// REVEAL ANIMATION

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 },
);

reveals.forEach((el) => observer.observe(el));

// NAVBAR SCROLL EFFECT

window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");

  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// FORM

document.getElementById("quoteForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("fname").value.trim();

  const phone = document.getElementById("fphone").value.trim();

  if (!name || !phone) {
    alert("Please fill all required fields.");

    return;
  }

  this.style.display = "none";

  document.getElementById("formSuccess").style.display = "block";
});
