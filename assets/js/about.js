document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".about-hero");
  const heroTitle = document.querySelector(".about-hero h1");
  const articles = document.querySelectorAll(".about-content article");
  const progressBar = document.getElementById("scroll-progress");

  // Parallax and fade animations
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollY / docHeight) * 100;

    // Update scroll progress bar
    if (progressBar) progressBar.style.width = `${scrollPercent}%`;

    // Parallax effect
    if (hero) hero.style.backgroundPositionY = `${scrollY * 0.4}px`;

    // Title fade effect
    if (heroTitle) {
      const intensity = Math.max(1 - scrollY / 400, 0.4);
      heroTitle.style.opacity = intensity;
    }

    // Fade-in for content articles
    articles.forEach(article => {
      const rect = article.getBoundingClientRect();
      if (rect.top < window.innerHeight - 120) {
        article.classList.add("visible");
      }
    });
  });
});
