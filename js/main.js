/* TestÇöz genel arayüz davranışları. Sayfa ve test verileri data/ altında tutulur. */
(function () {
  function initMobileMenu() {
    const button = document.getElementById("mobileMenuBtn");
    const menu = document.getElementById("mobileMenu");
    if (!button || !menu) return;

    button.addEventListener("click", function () {
      const isOpen = menu.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", function (event) {
      if (!button.contains(event.target) && !menu.contains(event.target)) {
        menu.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
      }
    });
  }

  function highlightActiveNav() {
    const page = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".main-nav a, .mobile-nav a").forEach(function (link) {
      const target = (link.getAttribute("href") || "").split("?")[0].split("/").pop();
      link.classList.toggle("active", target === page);
    });
  }

  function initAuthLinks() {
    const links = document.querySelectorAll("[data-auth-link]");
    if (!links.length) return;
    fetch("/api/auth-status", { headers: { Accept: "application/json" } })
      .then(function (response) { return response.ok ? response.json() : { configured: false }; })
      .then(function (data) { if (data.configured) links.forEach(function (link) { link.hidden = false; }); })
      .catch(function () {});
  }

  document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    highlightActiveNav();
    initAuthLinks();
  });
})();
