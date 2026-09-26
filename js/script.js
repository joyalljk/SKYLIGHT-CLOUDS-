/**
 * SKYLIGHTS CLOUDS — CLIENT-SIDE JAVASCRIPT
 * Vanilla JS for navigation, interactions, and gallery lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- 1. Sticky / Scrolled Navbar Behavior ---
  const navbar = document.querySelector('.navbar-custom');
  const handleScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // --- 2. Mobile Navbar Auto-Collapse on Link Click ---
  const navLinks = document.querySelectorAll('.nav-link-custom, .navbar-collapse .btn-custom');
  const navCollapse = document.getElementById('navbarContent');
  if (navCollapse && typeof bootstrap !== 'undefined') {
    const bsCollapse = bootstrap.Collapse.getInstance(navCollapse) || new bootstrap.Collapse(navCollapse, { toggle: false });
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navCollapse.classList.contains('show')) {
          bsCollapse.hide();
        }
      });
    });
  }

  // --- 3. Active Nav Link on Scroll (Scrollspy) ---
  const sections = document.querySelectorAll('section[id]');
  const navAnchorLinks = document.querySelectorAll('.navbar-nav .nav-link-custom');

  const highlightNavOnScroll = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navAnchorLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // --- 4. Gallery Lightbox Handling ---
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModalEl = document.getElementById('lightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');

  if (galleryItems.length > 0 && lightboxModalEl && typeof bootstrap !== 'undefined') {
    const lightboxModal = new bootstrap.Modal(lightboxModalEl);

    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        const imgSrc = item.getAttribute('data-img-src') || item.querySelector('img')?.getAttribute('src');
        const imgTitle = item.getAttribute('data-title') || item.querySelector('.gallery-caption-title')?.textContent || 'Skylights Clouds';
        const imgCategory = item.getAttribute('data-category') || '';

        if (lightboxImage && imgSrc) {
          lightboxImage.setAttribute('src', imgSrc);
          lightboxImage.setAttribute('alt', imgTitle);
        }

        if (lightboxCaption) {
          lightboxCaption.textContent = imgCategory ? `${imgTitle} — ${imgCategory}` : imgTitle;
        }

        lightboxModal.show();
      });
    });
  }

  // --- 5. Back to Top Smooth Scroll ---
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
