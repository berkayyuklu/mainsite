(function () {
  "use strict";

  /* ---------- Tema (Dark / Light) ---------- */
  var root = document.documentElement;
  var toggleBtn = document.getElementById("themeToggle");
  var STORAGE_KEY = "bydesign-theme";

  function getPreferredTheme() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (toggleBtn) {
      toggleBtn.setAttribute(
        "aria-label",
        theme === "dark" ? "Açık temaya geç" : "Koyu temaya geç"
      );
    }
  }

  applyTheme(getPreferredTheme());

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      var next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  /* ---------- Footer yılı ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Gizli admin kısayolu: Ctrl + B ---------- */
  // Bu kısayol sitede hiçbir yerde görünmez / linklenmez.
  // Amaç: site sahibinin admin giriş sayfasına hızlıca ulaşabilmesi.
  document.addEventListener("keydown", function (event) {
    var key = event.key ? event.key.toLowerCase() : "";
    if (event.ctrlKey && !event.shiftKey && !event.altKey && key === "b") {
      event.preventDefault();
      window.location.href = "admin.html";
    }
  });
})();
