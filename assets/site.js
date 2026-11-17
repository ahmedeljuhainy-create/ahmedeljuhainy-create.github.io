(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-nav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navigation.classList.contains("is-open")) {
        navigation.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
        menuButton.focus();
      }
    });
  }

  const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
  const projectCards = Array.from(document.querySelectorAll(".project-card[data-category]"));
  const projectCount = document.querySelector("#project-count");

  function applyProjectFilter(filter) {
    let visibleCount = 0;

    projectCards.forEach((card) => {
      const categories = (card.dataset.category || "").split(/\s+/);
      const isVisible = filter === "all" || categories.includes(filter);
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === filter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    if (projectCount) {
      projectCount.textContent = "Showing " + visibleCount + " selected " + (visibleCount === 1 ? "project" : "projects");
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => applyProjectFilter(button.dataset.filter || "all"));
  });

  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  document.querySelectorAll(".project-details").forEach((details) => {
    const summary = details.querySelector("summary");
    if (summary) {
      details.addEventListener("toggle", () => {
        summary.setAttribute("aria-expanded", String(details.open));
      });
    }
  });
})();
