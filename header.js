document.addEventListener("DOMContentLoaded", function() {
  // Hamburger toggle
  const menuToggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }

  // Handle submenu toggles (mobile only)
  const submenuToggles = document.querySelectorAll(".submenu-toggle");
  submenuToggles.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent link navigation on toggle click
      const submenu = btn.nextElementSibling;
      if (submenu && submenu.classList.contains("submenu")) {
        submenu.classList.toggle("open");
        btn.textContent = submenu.classList.contains("open") ? "▴" : "▾";
      }
    });
  });

  // On mobile: close menu when clicking a link
  document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        menu.classList.remove('active');
      }
    });
  });

  // Desktop: allow normal navigation on top-level links (Home, About, etc.)
  // But prevent navigation on items with submenus — let JS handle expand/collapse
  document.querySelectorAll('.menu > li > a').forEach(link => {
    const hasSubmenu = link.nextElementSibling?.classList.contains('submenu');
    if (hasSubmenu) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth > 768) {
          // On desktop: do nothing — hover controls the submenu
          e.preventDefault();
        }
        // On mobile, we already handled it above via .submenu-toggle
      });
    }
  });
});