
(function () {
  const mount = document.getElementById('navbar-mount');
  if (!mount) return;

  const base = /project\.html$/i.test(location.pathname) ? 'index.html' : '';

  const links = [
    ['home', 'Home'],
    ['about', 'About'],
    ['education', 'Education'],
    ['skills', 'Skills'],
    ['experience', 'Experience'],
    ['projects', 'Projects'],
    ['certifications', 'Certifications'],
    ['contact', 'Contact'],
    ['chatbot-section', 'AI Assistant'],
  ];

  const desktopLinks = links.map(([id, label]) =>
    `<a href="${base}#${id}" class="nav-underline hover:text-ink">${
      id === 'chatbot-section' ? '<i class="fa-solid fa-robot text-brand-500 text-xs mr-1.5"></i>' : ''
    }${label}</a>`
  ).join('');

  const mobileLinks = links.map(([id, label]) =>
    `<a href="${base}#${id}" class="mobile-link py-2.5 hover:text-brand-600">${
      id === 'chatbot-section' ? '<i class="fa-solid fa-robot text-brand-500 text-xs mr-1.5"></i>' : ''
    }${label}</a>`
  ).join('');

  mount.innerHTML = `
  <header id="navbar" class="fixed top-0 inset-x-0 z-50 bg-white/85 backdrop-blur-md transition-shadow duration-300">
    <nav class="max-w-6xl mx-auto flex justify-between items-center px-5 sm:px-8 py-4">
      <a href="${base}#home" class="font-display font-bold text-lg tracking-tight text-ink flex items-center gap-2">
        <span class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-600 to-brand-400 text-white flex items-center justify-center text-sm font-display">NT</span>
        <span>Nafisha<span class="text-brand-600">.</span></span>
      </a>

      <div class="hidden xl:flex items-center gap-6 text-sm font-medium text-inksoft">
        ${desktopLinks}
      </div>

      <div class="flex items-center gap-2">
        <button id="themeToggle" type="button"
                class="w-10 h-10 rounded-full border border-brand-150 text-inksoft hover:text-brand-600 hover:border-brand-400 flex items-center justify-center transition"
                aria-label="Switch to dark mode" aria-pressed="false" title="Toggle dark / light mode">
          <i class="fa-solid fa-moon theme-icon-moon"></i>
          <i class="fa-solid fa-sun theme-icon-sun"></i>
        </button>

        <a href="${base}#hireme" class="hidden xl:inline-flex btn-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full items-center gap-2">
          Hire Me <i class="fa-solid fa-arrow-right text-xs"></i>
        </a>

        <button id="menuBtn" type="button" class="xl:hidden text-ink text-xl w-10 h-10 flex items-center justify-center rounded-lg hover:bg-brand-50" aria-label="Toggle menu" aria-expanded="false">
          <i class="fa-solid fa-bars" id="menuIcon"></i>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div id="mobileMenu" class="hidden xl:hidden bg-white border-t border-brand-100">
      <div class="flex flex-col px-6 py-4 gap-1 text-sm font-medium text-inksoft">
        ${mobileLinks}
        <a href="${base}#hireme" class="mobile-link mt-2 btn-primary text-white text-center font-semibold px-5 py-2.5 rounded-full">Hire Me</a>
      </div>
    </div>
  </header>`;

  // ---------- Mobile menu ----------
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const isOpen = !mobileMenu.classList.contains('hidden');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    menuIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuIcon.className = 'fa-solid fa-bars';
    });
  });

  // ---------- Navbar scroll shadow ----------
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });

  // ---------- Dark / light toggle ----------
  // (the saved theme is applied by a tiny script in <head> to avoid a flash)
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');

  function syncThemeButton() {
    const dark = root.classList.contains('dark');
    themeBtn.setAttribute('aria-pressed', String(dark));
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  syncThemeButton();

  themeBtn.addEventListener('click', () => {
    const dark = !root.classList.contains('dark');
    root.classList.toggle('dark', dark);
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
    syncThemeButton();
  });
})();