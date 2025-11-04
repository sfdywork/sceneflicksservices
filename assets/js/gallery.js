// Gallery-specific JS
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("gallery-grid");
  const filterButtons = document.querySelectorAll(".filter-bar button");

  // Fetch gallery data
  fetch("../data/gallery.json")
    .then((res) => res.json())
    .then((data) => {
      // Create gallery items
      data.forEach((item) => {
        const fig = document.createElement("figure");
        fig.className = "gallery-item";
        fig.dataset.type = item.type;
        fig.innerHTML = `
          <img src="../${item.thumb}" alt="${item.title}" loading="lazy">
          <figcaption>${item.title}</figcaption>
        `;
        grid.appendChild(fig);
      });

      // Filter functionality
      filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const filter = btn.dataset.filter;
          document.querySelectorAll(".gallery-item").forEach((it) => {
            it.style.display =
              filter === "all" || it.dataset.type === filter ? "block" : "none";
          });
        });
      });
    })
    .catch((err) => console.error("Error loading gallery:", err));
});
