/* ================================================================
   MAIN.JS — Entry Point: Nav · Smooth Links · Contact Form
================================================================ */

'use strict';

// ---- Navigation scroll state ----
function initNav() {
  const nav    = document.getElementById('nav');
  const toggle = document.getElementById('nav-toggle');
  const mobile = document.getElementById('nav-mobile');
  if (!nav) return;

  // Scroll class
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    if (y > 60) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
    lastY = y;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
      if (isOpen) {
        mobile.classList.add('is-visible');
        mobile.removeAttribute('aria-hidden');
      } else {
        mobile.classList.remove('is-visible');
        mobile.setAttribute('aria-hidden', 'true');
      }
    });

    // Close mobile nav on link click
    mobile.querySelectorAll('.nav__mobile-link, .btn').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        mobile.classList.remove('is-visible');
        mobile.setAttribute('aria-hidden', 'true');
      });
    });
  }
}

// ---- Smooth anchor scrolling ----
function initSmoothLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('nav')?.offsetHeight || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ---- Contact Form ----
function initContactForm() {
  const form      = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');
  const success   = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Simple validation
    const name    = document.getElementById('f-name')?.value.trim();
    const email   = document.getElementById('f-email')?.value.trim();
    const message = document.getElementById('f-message')?.value.trim();

    if (!name || !email || !message) {
      shakeButton(submitBtn);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      shakeButton(submitBtn);
      return;
    }

    // Submit
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending...</span>';

    try {
      const SUPABASE_URL = 'https://udxnysukqvjfkamgytor.supabase.co';
      const SUPABASE_ANON_KEY = 'sb_publishable_iA3VJQciyp7PqrgKU6kH6A_8C-TGDAz';

      const company = document.getElementById('f-company')?.value.trim() || null;
      const service = document.getElementById('f-service')?.value || null;

      const payload = {
        name: name,
        email: email,
        company: company,
        service: service,
        message: message
      };

      const response = await fetch(`${SUPABASE_URL}/rest/v1/contacts`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        form.reset();
        if (success) {
          success.hidden = false;
          success.removeAttribute('hidden');
        }
        submitBtn.innerHTML = '<span>Message Sent ✓</span>';
        submitBtn.style.background = 'var(--clr-secondary)';
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `Send Message <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3.75 9h10.5M9.75 4.5l4.5 4.5-4.5 4.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      alert('Something went wrong. Please email daniel@danielchristopher.dev directly.');
    }
  });
}

function shakeButton(btn) {
  if (!btn) return;
  btn.style.animation = 'none';
  btn.style.transform = 'translateX(0)';
  void btn.offsetWidth; // reflow
  btn.style.animation = 'shake 0.4s ease';
  setTimeout(() => btn.style.animation = '', 400);
}

// ---- Add shake keyframe ----
function addShakeKeyframe() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-6px); }
      40% { transform: translateX(6px); }
      60% { transform: translateX(-4px); }
      80% { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(style);
}

// ---- Cursor hover enhancement on primary buttons ----
function initButtonEffects() {
  document.querySelectorAll('.btn--primary').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transition = 'all 200ms ease';
    });
  });
}

// ---- Performance: Lazy canvas init ----
function initCanvasResize() {
  // Ensure hero canvas fills parent correctly
  const heroCanvas = document.getElementById('hero-canvas');
  if (heroCanvas) {
    function resizeHeroCanvas() {
      heroCanvas.style.width  = '100%';
      heroCanvas.style.height = '100%';
    }
    resizeHeroCanvas();
    window.addEventListener('resize', window.debounce(resizeHeroCanvas, 100));
  }
}

// ---- Active nav link highlighting ----
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));
}

// ---- Boot ----
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initSmoothLinks();
  initContactForm();
  initButtonEffects();
  initCanvasResize();
  initActiveNav();
  addShakeKeyframe();

  // Draw heatmap if already visible
  if (document.getElementById('contribution-canvas')) {
    const el = document.getElementById('contribution-canvas');
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      window.drawContributionHeatmap('contribution-canvas');
    }
  }

  console.log('[Portfolio] Daniel Christopher Portfolio — Initialized ✓');
});

// Add is-active nav link style
const navActiveStyle = document.createElement('style');
navActiveStyle.textContent = `
  .nav__link.is-active { opacity: 1; }
  .nav__link.is-active::after { width: 100%; }
`;
document.head.appendChild(navActiveStyle);
