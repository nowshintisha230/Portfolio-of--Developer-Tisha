
if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('reveal-ready');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('show'));
}


const SLIDE_INTERVAL = 2500; 
const RESPECT_REDUCED_MOTION = false;

(function () {
  const reduceMotion = RESPECT_REDUCED_MOTION && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const all = window.PROJECT_IMAGES || {};

  document.querySelectorAll('[data-slideshow]').forEach(box => {
    const extras = (all[box.dataset.slideshow] || []).filter(src => src && src.trim());
    const cover = box.querySelector('.slide-img');
    if (!cover || extras.length === 0 || reduceMotion) return; // nothing to rotate

    const slides = [cover];
    extras.forEach(src => {
      const img = new Image();
      img.className = 'slide-img';
      img.alt = cover.alt;
      img.src = src;
      img.onerror = () => {               // bad path -> drop it from the rotation
        console.warn('[slideshow] image not found, skipped:', src);
        const i = slides.indexOf(img);
        if (i > -1) { slides.splice(i, 1); img.remove(); }
      };
      box.appendChild(img);
      slides.push(img);
    });

    let current = 0;
    setInterval(() => {
      if (document.hidden || slides.length < 2) return;
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, SLIDE_INTERVAL);
  });
})();