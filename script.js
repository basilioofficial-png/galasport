/* ============================================================
   GALASPORT — LANDING PAGE SCRIPTS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- HEADER SCROLL ---------- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ---------- HERO BG ANIMATION ---------- */
  setTimeout(() => {
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) heroBg.classList.add('loaded');
  }, 100);

  /* ---------- BURGER / MOBILE NAV ---------- */
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavClose = document.querySelector('.mobile-nav-close');

  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    const closeMobileNav = () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    };
    mobileNavClose.addEventListener('click', closeMobileNav);
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });
  }

  /* ---------- SCROLL REVEAL ---------- */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => revealObserver.observe(el));

  /* ---------- ACTIVE NAV ON SCROLL ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => sectionObserver.observe(s));

  /* ---------- SCROLL TO TOP ---------- */
  const scrollTopBtn = document.getElementById('scroll-top');
  window.addEventListener('scroll', () => {
    scrollTopBtn?.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- FLOATING MESSENGERS EXPAND ---------- */
  const floatingCta = document.querySelector('.floating-cta');
  const floatingBtn = document.querySelector('.floating-btn');
  let expanded = false;

  floatingBtn?.addEventListener('click', (e) => {
    if (!expanded) {
      expanded = true;
      floatingCta?.classList.add('expanded');
      // After 400ms still click popup
      setTimeout(() => {
        openPopup();
        expanded = false;
        floatingCta?.classList.remove('expanded');
      }, 300);
    }
  });

  // Collapse on outside click
  document.addEventListener('click', (e) => {
    if (expanded && !floatingCta?.contains(e.target)) {
      expanded = false;
      floatingCta?.classList.remove('expanded');
    }
  });

  /* ---------- PRICE TABS ---------- */
  const tabs = document.querySelectorAll('.price-tab');
  const panels = document.querySelectorAll('.price-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('panel-' + target)?.classList.add('active');
    });
  });

  /* ---------- SCHEDULE DAYS ---------- */
  const dayBtns = document.querySelectorAll('.day-btn');
  const schedulePanels = document.querySelectorAll('.schedule-panel');
  dayBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const day = btn.dataset.day;
      dayBtns.forEach(b => b.classList.remove('active'));
      schedulePanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('day-' + day)?.classList.add('active');
    });
  });

  /* ---------- GALLERY LIGHTBOX ---------- */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img')?.src;
      if (src && lightbox && lightboxImg) {
        lightboxImg.src = src;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    lightbox?.classList.remove('open');
    document.body.style.overflow = '';
    if (lightboxImg) lightboxImg.src = '';
  }

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  /* ---------- POPUP ---------- */
  const popupOverlay = document.getElementById('popup-overlay');
  const popupCloseBtns = document.querySelectorAll('.popup-close');
  const popupTriggers = document.querySelectorAll('[data-popup]');

  function openPopup() {
    popupOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    popupOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  popupTriggers.forEach(btn => btn.addEventListener('click', openPopup));
  popupCloseBtns.forEach(btn => btn.addEventListener('click', closePopup));
  popupOverlay?.addEventListener('click', e => { if (e.target === popupOverlay) closePopup(); });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeLightbox(); closePopup(); }
  });

  // Auto popup after 25 seconds (once per session)
  if (!sessionStorage.getItem('popupShown')) {
    setTimeout(() => {
      openPopup();
      sessionStorage.setItem('popupShown', '1');
    }, 25000);
  }

  /* ---------- FORM SUBMISSIONS ---------- */
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Отправка...';
    btn.disabled = true;
    setTimeout(() => {
      contactForm.style.display = 'none';
      if (contactSuccess) contactSuccess.style.display = 'block';
    }, 1000);
  });

  const popupForm = document.getElementById('popup-form');
  popupForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = popupForm.querySelector('button[type="submit"]');
    btn.textContent = 'Отправка...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✓ Заявка отправлена!';
      btn.style.background = '#1a7a1a';
      setTimeout(closePopup, 2000);
    }, 1000);
  });

  /* ---------- SMOOTH SCROLL ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- PHONE COPY ON DESKTOP ---------- */
  const headerPhone = document.querySelector('.header-phone');
  if (headerPhone && !('ontouchstart' in window)) {
    headerPhone.setAttribute('title', 'Нажмите для звонка или скопируйте номер');
    headerPhone.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      navigator.clipboard?.writeText('+79119446565').then(() => {
        const orig = headerPhone.textContent;
        headerPhone.textContent = 'Скопировано!';
        setTimeout(() => { headerPhone.textContent = orig; }, 1500);
      });
    });
  }

});

