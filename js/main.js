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

  function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const button = form.querySelector('[type="submit"]');
      const originalText = button.textContent;
      button.textContent = "✓ Mesajınız Alındı";
      button.disabled = true;
      form.reset();
      const notice = document.getElementById("formSuccess");
      if (notice) notice.style.display = "block";
      window.setTimeout(function () {
        button.textContent = originalText;
        button.disabled = false;
        if (notice) notice.style.display = "none";
      }, 5000);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    highlightActiveNav();
    initContactForm();
  });
})();
