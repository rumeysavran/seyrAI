(function () {
  'use strict';

  // ----- Mobile nav -----
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  var header = document.querySelector('.header');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('open', !expanded);
      document.body.classList.toggle('nav-open', !expanded);
    });
  }

  // ----- Scroll reveal -----
  function reveal() {
    var els = document.querySelectorAll('.step-card, .solution-card, .why-card, .benefit-card, .testimonial-card, .pricing-card, .case-card, .faq-item, .comparison-col, .tech-item');
    els.forEach(function (el) {
      var top = el.getBoundingClientRect().top;
      var winH = window.innerHeight;
      if (top < winH - 80) {
        el.classList.add('revealed');
      }
    });
  }

  var revealEls = document.querySelectorAll('.step-card, .solution-card, .why-card, .benefit-card, .testimonial-card, .pricing-card, .case-card, .comparison-col, .tech-item');
  revealEls.forEach(function (el) {
    el.classList.add('reveal');
  });

  window.addEventListener('scroll', reveal);
  window.addEventListener('load', reveal);

  // ----- Header background on scroll (solid when scrolled past hero) -----
  function onScroll() {
    if (window.scrollY > 60) {
      header && header.classList.add('scrolled', 'header-scrolled');
    } else {
      header && header.classList.remove('scrolled', 'header-scrolled');
    }
  }

  window.addEventListener('scroll', onScroll);
  onScroll();

  // ----- Contact form (prevent default submit; hook up your backend later) -----
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // Replace with your form endpoint (e.g. Formspree, Netlify Forms, or your API)
      console.log('Form submitted (connect your backend)');
      alert('Thanks for your message. We\'ll be in touch soon.');
    });
  }

  // ----- Dark / light theme (optional: set via data-theme on <html>) -----
  var themeKey = 'seyrai-theme';
  var saved = localStorage.getItem(themeKey);
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }
})();
