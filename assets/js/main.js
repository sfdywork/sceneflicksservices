// ==================== MAIN INTERACTIONS ====================
(function () {
  // Smooth scroll for internal anchors
  document.addEventListener("click", function (e) {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute("href");
    if (href.length > 1) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  // Close mobile nav on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const nav = document.getElementById("nav-list");
      const toggle = document.getElementById("nav-toggle");
      if (nav && nav.classList.contains("open")) {
        nav.classList.remove("open");
        if (toggle) toggle.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
      }
    }
  });
})();

// ==================== MOBILE MENU TOGGLE ====================
const navToggle = document.getElementById("nav-toggle");
const navList = document.getElementById("nav-list");

if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navList.classList.toggle("open");
    const expanded = navToggle.classList.contains("active");
    navToggle.setAttribute("aria-expanded", expanded);
  });

  // Close menu when clicking a link
  document.querySelectorAll(".nav-list a").forEach(link => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navList.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ==================== HEADER SCROLL GLOW ====================
window.addEventListener("scroll", () => {
  const header = document.querySelector(".site-header");
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 50);
  }
});
