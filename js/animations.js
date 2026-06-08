/* ================================================================
   ANIMATIONS.JS — GSAP Scroll Animations + Stat Counters
================================================================ */

'use strict';

function initAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    // Fallback: just show everything if GSAP not loaded
    document.querySelectorAll('[data-animate]').forEach(el => {
      el.style.opacity = 1;
      el.style.transform = 'none';
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ---- Hero content entrance ----
  const heroTl = gsap.timeline({ delay: 0.2 });

  heroTl
    .to('#anim-badge', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
    })
    .to('#anim-headline', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.35')
    .to('#anim-sub', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
    }, '-=0.45')
    .to('#anim-actions', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.4')
    .to('#anim-stats', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.35');

  // ---- Animated stat counters ----
  const statEls = document.querySelectorAll('.hero__stat-value[data-count]');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !statsAnimated) {
      statsAnimated = true;
      statEls.forEach(el => {
        const target = parseInt(el.dataset.count, 10);
        window.animateCounter(el, target, 1600);
      });
      statsObserver.disconnect();
    }
  }, { threshold: 0.5 });

  const statsEl = document.getElementById('anim-stats');
  if (statsEl) statsObserver.observe(statsEl);

  // ---- Section elements with ScrollTrigger ----
  // Lab stations
  gsap.utils.toArray('.lab__station').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      delay: i * 0.06,
    });
  });

  // Service cards
  gsap.utils.toArray('.service-card').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      delay: i * 0.05,
    });
  });

  // Platform cards
  gsap.utils.toArray('.platform-card').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      delay: i * 0.1,
    });
  });

  // Benefit items
  gsap.utils.toArray('.benefit-item').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      delay: i * 0.06,
    });
  });

  // Case studies
  gsap.utils.toArray('.case-study').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      delay: i * 0.1,
    });
  });

  // Process steps
  gsap.utils.toArray('.process-step').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      delay: i * 0.12,
    });
  });

  // Testimonials
  gsap.utils.toArray('.testimonial-card').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      delay: i * 0.1,
    });
  });

  // ---- Section title entrance ----
  gsap.utils.toArray('.section__title').forEach(el => {
    gsap.from(el, {
      opacity: 0,
      y: 28,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  });

  // ---- CTA Banner ----
  ScrollTrigger.create({
    trigger: '#cta-banner',
    start: 'top 80%',
    onEnter: () => {
      gsap.from('#cta-banner', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
      });
    },
    once: true,
  });

  // ---- GitHub Heatmap (draw when visible) ----
  ScrollTrigger.create({
    trigger: '.gh-activity',
    start: 'top 85%',
    onEnter: () => {
      window.drawContributionHeatmap('contribution-canvas');
    },
    once: true,
  });

  console.log('[Portfolio] Animations initialized with GSAP');
}

document.addEventListener('DOMContentLoaded', initAnimations);
