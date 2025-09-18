document.addEventListener("DOMContentLoaded", function() {
  // Hamburger toggle
  const menuToggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }

  // Handle ALL submenu toggles — including deeply nested ones
  const submenuToggles = document.querySelectorAll(".submenu-toggle");
  submenuToggles.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent event from bubbling up
      e.preventDefault();  // Prevent link navigation
      
      const submenu = btn.nextElementSibling;
      if (submenu && submenu.classList.contains("submenu")) {
        submenu.classList.toggle("open");
        btn.textContent = submenu.classList.contains("open") ? "▴" : "▾";
      }
    });
  });

  // On mobile: close main menu only if clicked outside submenu
  document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        // Only close if clicked link is NOT a submenu toggle or inside a submenu
        if (!e.target.closest('.submenu') && !e.target.classList.contains('submenu-toggle')) {
          menu.classList.remove('active');
        }
      }
    });
  });

  // On desktop: prevent top-level links with submenus from navigating
  document.querySelectorAll('.menu > li > a').forEach(link => {
    const hasSubmenu = link.nextElementSibling?.classList.contains('submenu');
    if (hasSubmenu) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth > 768) {
          e.preventDefault();
        }
      });
    }
  });
});
