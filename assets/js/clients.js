document.addEventListener("DOMContentLoaded", () => {
  fetch("../data/clients.json")
    .then((response) => response.json())
    .then((clients) => {
      const grid = document.getElementById("clients-grid");

      clients.forEach((client) => {
        const card = document.createElement("div");
        card.classList.add("client-card");

        card.innerHTML = `
          <img src="../${client.logo}" alt="${client.name} Logo" class="client-logo" onerror="this.src='../assets/images/clients/default.png'">
          <h3 class="client-name">${client.name}</h3>
          <p class="client-category">${client.category}</p>
          <p class="client-desc">${client.description}</p>
        `;

        grid.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error loading clients:", error);
    });
});
