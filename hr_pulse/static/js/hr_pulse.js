/*!
 * global.js - Advanced HR Landing Page JS (Safe jQuery)
 * Dependencies: jQuery 3+, IntersectionObserver
 * Features: Sticky Navbar, Smooth Scroll, AJAX API calls, Counters, Modals, Scroll Animations, Theme Toggle
 */

jQuery(function ($) {
  /** =========================
   * Variables
   ========================= */
  const $navbar = $('nav');
  const $navLinks = $('nav a');
  const $backToTop = $('#back-to-top');
  const $body = $('body');

  /** =========================
   * Debounce Utility
   ========================= */
  function debounce(func, wait = 20, immediate = false) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  /** =========================
   * Sticky Navbar & Active Section Highlight
   ========================= */
  function handleScroll() {
    const scrollTop = $(window).scrollTop();

    $navbar.toggleClass('navbar-sticky shadow-md bg-white transition-all', scrollTop > 50);

    $('section[id]').each(function () {
      const sectionTop = $(this).offset().top - 100;
      const sectionBottom = sectionTop + $(this).outerHeight();
      const id = $(this).attr('id');

      $navLinks.removeClass('text-blue-600');
      if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
        $navLinks.filter(`[href="#${id}"]`).addClass('text-blue-600');
      }
    });

    $backToTop.fadeToggle(scrollTop > 400);
  }
  $(window).on('scroll', debounce(handleScroll, 25));

  /** =========================
   * Smooth Scroll
   ========================= */
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    const target = this.hash;
    if (target && $(target).length) {
      $('html, body').animate(
        { scrollTop: $(target).offset().top - 80 },
        600,
        'swing'
      );
    }
  });

  $backToTop.on('click', () => $('html, body').animate({ scrollTop: 0 }, 600));

  /** =========================
   * AJAX Stats Counter
   ========================= */
  function animateCounter($el, target) {
    $({ countNum: 0 }).animate(
      { countNum: target },
      {
        duration: 1800,
        easing: 'swing',
        step: function () {
          $el.text(Math.floor(this.countNum));
        },
        complete: function () {
          $el.text(target);
        },
      }
    );
  }

  function loadStats(retries = 3) {
    $.ajax({
      url: '/api/stats/',
      method: 'GET',
      dataType: 'json',
      timeout: 5000,
      success: function (data) {
        $('.stat-number').each(function (i) {
          animateCounter($(this), data[i]?.value || 0);
        });
      },
      error: function () {
        if (retries > 0) {
          console.warn('Failed to load stats. Retrying...');
          setTimeout(() => loadStats(retries - 1), 3000);
        } else {
          console.error('Failed to load stats after multiple attempts.');
        }
      },
    });
  }

  const statsObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadStats();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );

  const $statsSection = $('.stats-section')[0];
  if ($statsSection) statsObserver.observe($statsSection);

  /** =========================
   * Scroll Reveal Animations
   ========================= */
  const scrollElements = $('.scroll-reveal');
  const scrollObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          $(entry.target).addClass('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  scrollElements.each(function () {
    scrollObserver.observe(this);
  });

  /** =========================
   * AJAX Modal
   ========================= */
  function openModal(modalId, apiUrl) {
    const $modal = $(`#${modalId}`);
    $modal.find('.modal-content').html('<p>Loading...</p>');
    $modal.fadeIn(300);

    $.ajax({
      url: apiUrl,
      method: 'GET',
      dataType: 'json',
      success: function (response) {
        $modal.find('.modal-content').html(response.html || '<p>No content available.</p>');
      },
      error: function () {
        $modal.find('.modal-content').html('<p>Failed to load content.</p>');
      },
    });
  }

  $('.open-modal').click(function () {
    openModal($(this).data('modal'), $(this).data('api'));
  });

  $('.close-modal, .modal-overlay').click(function () {
    $(this).closest('.modal').fadeOut(300);
  });

  $(document).on('keydown', e => {
    if (e.key === 'Escape') $('.modal').fadeOut(300);
  });

  /** =========================
   * AJAX Form Submission
   ========================= */
  $('form.ajax-form').submit(function (e) {
    e.preventDefault();
    const $form = $(this);
    const url = $form.attr('action');

    $.ajax({
      url: url,
      method: 'POST',
      data: $form.serialize(),
      dataType: 'json',
      beforeSend: () => $form.find('button[type="submit"]').prop('disabled', true),
      success: response => {
        $form.find('.form-message').text(response.message || 'Success').fadeIn();
        if (response.success) $form[0].reset();
      },
      error: () => $form.find('.form-message').text('Submission failed. Try again.').fadeIn(),
      complete: () => $form.find('button[type="submit"]').prop('disabled', false),
    });
  });

  /** =========================
   * Load Dynamic Sections via API
   ========================= */
  function loadDynamicSection(apiUrl, container) {
    const $container = $(container);
    $container.html('<p class="text-center py-4">Loading...</p>');

    $.ajax({
      url: apiUrl,
      method: 'GET',
      dataType: 'json',
      success: data => {
        const html = data
          .map(item => `<div class="card scroll-reveal">
                          <div class="icon">${item.icon || ''}</div>
                          <h3>${item.title}</h3>
                          <p>${item.description}</p>
                        </div>`)
          .join('');
        $container.html(html);
        $container.find('.scroll-reveal').each(el => scrollObserver.observe(el));
      },
      error: () => console.error(`Failed to load ${container}`),
    });
  }

  loadDynamicSection('/api/features/', '.features-container');
  loadDynamicSection('/api/benefits/', '.benefits-container');

  /** =========================
   * Theme Toggle
   ========================= */
  $('#theme-toggle').click(function () {
    const isDark = $body.hasClass('dark');
    $body.toggleClass('dark light');
    const newTheme = isDark ? 'light' : 'dark';

    $.ajax({
      url: '/api/theme/',
      method: 'POST',
      headers: { 'X-CSRFToken': getCookie('csrftoken') },
      data: { theme: newTheme },
      success: () => console.log('Theme updated'),
      error: () => console.error('Failed to save theme'),
    });
  });

  /** =========================
   * CSRF Utility
   ========================= */
  function getCookie(name) {
    let cookieValue = null;
    document.cookie.split(';').forEach(cookie => {
      cookie = cookie.trim();
      if (cookie.startsWith(name + '=')) cookieValue = decodeURIComponent(cookie.split('=')[1]);
    });
    return cookieValue;
  }
});
