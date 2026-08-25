(function () {
  'use strict';

  var header = document.getElementById('site-header');
  var menuToggle = document.getElementById('menu-toggle');
  var mainNav = document.getElementById('main-nav');
  var navBackdrop = document.getElementById('nav-backdrop');
  var body = document.body;

  function onScroll() {
    if (window.scrollY > 8) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function closeNav() {
    mainNav.classList.remove('is-open');
    navBackdrop.classList.remove('is-visible');
    menuToggle.setAttribute('aria-expanded', 'false');
    body.classList.remove('nav-open');
  }

  function openNav() {
    mainNav.classList.add('is-open');
    navBackdrop.classList.add('is-visible');
    menuToggle.setAttribute('aria-expanded', 'true');
    body.classList.add('nav-open');
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.contains('is-open');
      if (isOpen) { closeNav(); } else { openNav(); }
    });
  }
  if (navBackdrop) { navBackdrop.addEventListener('click', closeNav); }
  document.querySelectorAll('#main-nav a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  var revealTargets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealTargets.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  var anoEl = document.getElementById('ano-atual');
  if (anoEl) { anoEl.textContent = String(new Date().getFullYear()); }
})();
