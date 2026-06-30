(function () {
  function slugify(value) {
    return String(value).toLocaleLowerCase("tr-TR")
      .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i")
      .replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character];
    });
  }

  function getParams() {
    return Object.fromEntries(new URLSearchParams(window.location.search));
  }

  window.TestCozUtils = { slugify: slugify, escapeHtml: escapeHtml, getParams: getParams };
})();
