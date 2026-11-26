/* ==========================================================================
   Mousumi Web (MousumiWeb.com) — Vanilla JavaScript Interactivity
   Compatible with direct browser viewing, XAMPP, and cPanel shared hosting.
   ========================================================================== */

(function () {
  'use strict';

  const html = document.documentElement;

  /* ------------------------------------------------------------------------
     1. Light / Dark Theme Toggle
     ------------------------------------------------------------------------ */
  const themeToggle = document.getElementById('themeToggle');
  const THEME_STORAGE_KEY = 'mousumi_web_theme';

  function applyTheme(theme) {
    const resolved = theme === 'light' ? 'light' : 'dark';
    html.setAttribute('data-theme', resolved);
    if (themeToggle) {
      const isLight = resolved === 'light';
      themeToggle.setAttribute('aria-pressed', String(isLight));
      themeToggle.setAttribute(
        'aria-label',
        isLight ? 'Switch to dark theme' : 'Switch to light theme'
      );
    }
  }

  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  applyTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark');

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(THEME_STORAGE_KEY, next);
    });
  }

  /* ------------------------------------------------------------------------
     2. Bilingual Language Switcher (EN + বাং | EN | বাংলা)
     ------------------------------------------------------------------------ */
  const langButtons = document.querySelectorAll('[data-lang-choice]');
  const LANG_STORAGE_KEY = 'mousumi_web_lang';

  function applyLanguageMode(mode) {
    const valid = mode === 'en' || mode === 'bn' ? mode : 'both';
    html.setAttribute('data-lang', valid);
    html.setAttribute('lang', valid === 'bn' ? 'bn' : 'en');
    langButtons.forEach(function (btn) {
      const active = btn.getAttribute('data-lang-choice') === valid;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  applyLanguageMode(localStorage.getItem(LANG_STORAGE_KEY) || 'both');

  langButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const choice = btn.getAttribute('data-lang-choice') || 'both';
      applyLanguageMode(choice);
      localStorage.setItem(LANG_STORAGE_KEY, choice);
      updateHeroPhraseImmediate();
    });
  });

  /* ------------------------------------------------------------------------
     3. Mobile Navigation Drawer
     ------------------------------------------------------------------------ */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-hire-btn');

  function setMobileMenuOpen(isOpen) {
    if (!mobileMenuBtn || !mobileDrawer) return;
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    mobileMenuBtn.setAttribute(
      'aria-label',
      isOpen ? 'Close navigation menu' : 'Open navigation menu'
    );
    mobileDrawer.hidden = !isOpen;
  }

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', function () {
      const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      setMobileMenuOpen(!expanded);
    });

    mobileNavLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        setMobileMenuOpen(false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !mobileDrawer.hidden) {
        setMobileMenuOpen(false);
        mobileMenuBtn.focus();
      }
    });
  }

  /* ------------------------------------------------------------------------
     4. Animated Hero Specialization Text
     ------------------------------------------------------------------------ */
  const heroRotator = document.getElementById('heroRotator');
  const heroPhrases = [
    {
      en: 'Modern, Responsive & User-Friendly Websites',
      bn: 'আধুনিক, রেসপন্সিভ ও ব্যবহারবান্ধব ওয়েবসাইট',
    },
    {
      en: 'Portfolio & Business Website Design',
      bn: 'পোর্টফোলিও ও বিজনেস ওয়েবসাইট ডিজাইন',
    },
    {
      en: 'PHP & MySQL Student Management Systems',
      bn: 'PHP ও MySQL স্টুডেন্ট ম্যানেজমেন্ট সিস্টেম',
    },
  ];
  let phraseIndex = 0;

  function formatPhrase(item) {
    const mode = html.getAttribute('data-lang');
    if (mode === 'bn') return item.bn;
    if (mode === 'en') return item.en;
    return item.en + ' · ' + item.bn;
  }

  function updateHeroPhraseImmediate() {
    if (!heroRotator) return;
    heroRotator.textContent = formatPhrase(heroPhrases[phraseIndex]);
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  updateHeroPhraseImmediate();

  if (heroRotator && !prefersReducedMotion) {
    window.setInterval(function () {
      heroRotator.classList.add('is-swapping');
      window.setTimeout(function () {
        phraseIndex = (phraseIndex + 1) % heroPhrases.length;
        heroRotator.textContent = formatPhrase(heroPhrases[phraseIndex]);
        heroRotator.classList.remove('is-swapping');
      }, 220);
    }, 3600);
  }

  /* ------------------------------------------------------------------------
     5. Scroll Reveal, Skill Bars & Active Navigation Highlight
     ------------------------------------------------------------------------ */
  const revealItems = document.querySelectorAll('.reveal');
  const skillCards = document.querySelectorAll('.skill-card[data-skill-level]');

  skillCards.forEach(function (card) {
    const level = card.getAttribute('data-skill-level') || '0.85';
    card.style.setProperty('--skill-scale', level);
  });

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -30px 0px' }
    );

    revealItems.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealItems.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  const sections = document.querySelectorAll('main section[id]');
  const desktopNavLinks = document.querySelectorAll('.main-nav .nav-link');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            desktopNavLinks.forEach(function (link) {
              const target = link.getAttribute('href');
              link.classList.toggle('is-active', target === '#' + id);
            });
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );

    sections.forEach(function (sec) {
      sectionObserver.observe(sec);
    });
  }

  /* ------------------------------------------------------------------------
     6. Project Category Filtering
     ------------------------------------------------------------------------ */
  const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
  const projectCards = document.querySelectorAll('.project-card[data-category]');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const selected = btn.getAttribute('data-filter') || 'all';
      filterButtons.forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
      });

      projectCards.forEach(function (card) {
        const category = card.getAttribute('data-category');
        const show = selected === 'all' || category === selected;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ------------------------------------------------------------------------
     7. Project Preview & Editable Placeholder Modal
     ------------------------------------------------------------------------ */
  const projectCatalog = {
    sms: {
      title: 'Student Management System · স্টুডেন্ট ম্যানেজমেন্ট সিস্টেম',
      meta: 'PHP · MySQL · HTML5 · CSS3 · JavaScript',
      image: './assets/images/project-sms.jpg',
      alt: 'Student Management System web application preview',
      desc: 'Built with PHP, MySQL, HTML5, CSS3, and JavaScript featuring student registration, login authentication, dashboard, attendance tracking, result records, and administration controls.',
    },
    restaurant: {
      title: 'Restaurant Website · রেস্টুরেন্ট ওয়েবসাইট',
      meta: 'HTML5 · CSS3 · JavaScript · Bootstrap',
      image: './assets/images/project-restaurant.jpg',
      alt: 'Restaurant Website responsive design preview',
      desc: 'Modern hospitality website concept featuring organized food menus, visual gallery sections, responsive mobile layout, and a customer contact section.',
    },
    portfolio: {
      title: 'Personal Portfolio Website · পার্সোনাল পোর্টফোলিও ওয়েবসাইট',
      meta: 'HTML5 · CSS3 · JavaScript · UI/UX',
      image: './assets/images/project-portfolio.jpg',
      alt: 'Personal Portfolio Website interface preview',
      desc: 'Bilingual portfolio design for Mousumi Web showcasing skills, services, project filtering, light/dark theme switching, and accessible contact validation.',
    },
  };

  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalMeta = document.getElementById('modalMeta');
  const modalImage = document.getElementById('modalImage');
  const modalMediaWrap = document.getElementById('modalMediaWrap');
  const modalDesc = document.getElementById('modalDesc');
  const modalNotice = document.getElementById('modalNotice');
  let lastFocusedElement = null;

  function openModal(config) {
    if (!projectModal) return;
    lastFocusedElement = document.activeElement;
    modalTitle.textContent = config.title;
    modalMeta.textContent = config.meta;
    modalDesc.textContent = config.desc;
    modalNotice.textContent = config.notice;

    if (config.image) {
      modalMediaWrap.hidden = false;
      modalImage.src = config.image;
      modalImage.alt = config.alt || config.title;
    } else {
      modalMediaWrap.hidden = true;
    }

    projectModal.hidden = false;
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closeModal() {
    if (!projectModal || projectModal.hidden) return;
    projectModal.hidden = true;
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  document.querySelectorAll('[data-preview-project]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const id = btn.getAttribute('data-preview-project');
      const item = projectCatalog[id];
      if (!item) return;
      openModal({
        title: item.title,
        meta: item.meta,
        image: item.image,
        alt: item.alt,
        desc: item.desc,
        notice:
          'Editable Project Placeholder: Replace the Live Demo and Source Code href links in index.html once your live project or GitHub repository is published.',
      });
    });
  });

  document.querySelectorAll('[data-project-action]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      const href = link.getAttribute('href') || '';
      if (!href.startsWith('#project-')) return;
      event.preventDefault();
      const id = link.getAttribute('data-project-id');
      const actionType = link.getAttribute('data-project-action');
      const item = projectCatalog[id];
      if (!item) return;

      const label = actionType === 'code' ? 'Source Code Placeholder' : 'Live Demo Placeholder';
      openModal({
        title: item.title,
        meta: label + ' · ' + item.meta,
        image: item.image,
        alt: item.alt,
        desc: item.desc,
        notice:
          actionType === 'code'
            ? 'This Source Code link is an editable placeholder. Replace its href in index.html with your GitHub repository URL.'
            : 'This Live Demo link is an editable placeholder. Replace its href in index.html with your live project URL.',
      });
    });
  });

  document.querySelectorAll('[data-placeholder-link]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      const href = link.getAttribute('href');
      if (href === '#contact') {
        event.preventDefault();
        const network = link.getAttribute('data-placeholder-link');
        openModal({
          title: network + ' Profile Link (Editable Placeholder)',
          meta: 'Mousumi Web · Social URL',
          image: '',
          desc:
            'This ' +
            network +
            ' link is currently a safe placeholder so no fictional external URLs are included.',
          notice:
            'To connect your real profile, open index.html, locate data-placeholder-link="' +
            network +
            '", and replace href="#contact" with your ' +
            network +
            ' URL.',
        });
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', function (event) {
      if (event.target === projectModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  /* ------------------------------------------------------------------------
     8. Contact Form Validation & Frontend Demo Status
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  function setFieldError(inputEl, errorEl, message) {
    if (!inputEl || !errorEl) return;
    errorEl.textContent = message;
    inputEl.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  if (contactForm) {
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');

    const errorName = document.getElementById('errorName');
    const errorEmail = document.getElementById('errorEmail');
    const errorSubject = document.getElementById('errorSubject');
    const errorMessage = document.getElementById('errorMessage');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const nameVal = nameInput.value.trim();
      const emailVal = emailInput.value.trim();
      const subjectVal = subjectInput.value.trim();
      const messageVal = messageInput.value.trim();

      let hasError = false;

      if (nameVal.length < 2) {
        setFieldError(nameInput, errorName, 'Please enter your name (at least 2 characters).');
        hasError = true;
      } else {
        setFieldError(nameInput, errorName, '');
      }

      if (!emailRegex.test(emailVal)) {
        setFieldError(emailInput, errorEmail, 'Please enter a valid email address.');
        hasError = true;
      } else {
        setFieldError(emailInput, errorEmail, '');
      }

      if (subjectVal.length < 3) {
        setFieldError(subjectInput, errorSubject, 'Please enter a brief subject.');
        hasError = true;
      } else {
        setFieldError(subjectInput, errorSubject, '');
      }

      if (messageVal.length < 10) {
        setFieldError(
          messageInput,
          errorMessage,
          'Please write a message of at least 10 characters.'
        );
        hasError = true;
      } else {
        setFieldError(messageInput, errorMessage, '');
      }

      if (hasError) {
        formStatus.hidden = false;
        formStatus.className = 'form-status is-error';
        formStatus.textContent =
          'Please check the highlighted fields above before submitting.';
        return;
      }

      formStatus.hidden = false;
      formStatus.className = 'form-status is-success';
      formStatus.textContent =
        'Thank you, ' +
        nameVal +
        '! All fields passed validation. Note: This form is a frontend demo — connect a PHP mail handler on XAMPP/cPanel or a service like Formspree to send real emails.';
      contactForm.reset();
    });
  }

  /* ------------------------------------------------------------------------
     9. Footer Year & Back to Top
     ------------------------------------------------------------------------ */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    });
  }
})();
