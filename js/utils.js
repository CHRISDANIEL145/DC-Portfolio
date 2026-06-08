/* ================================================================
   UTILS.JS — Shared Utilities
================================================================ */

'use strict';

// Clamp value between min and max
window.clamp = (val, min, max) => Math.min(Math.max(val, min), max);

// Map value from one range to another
window.mapRange = (val, inMin, inMax, outMin, outMax) => {
  return outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin);
};

// Linear interpolation
window.lerp = (a, b, t) => a + (b - a) * t;

// Debounce
window.debounce = (fn, delay = 200) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

// RAF-throttled resize observer
window.onResizeDebounced = (el, callback) => {
  const ro = new ResizeObserver(window.debounce(callback, 150));
  ro.observe(el);
  return ro;
};

// Animate counter from 0 to target
window.animateCounter = (el, target, duration = 1800) => {
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = window.clamp(elapsed / duration, 0, 1);
    // easeOutExpo
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
};

// Draw GitHub-style contribution heatmap on a canvas
window.drawContributionHeatmap = (canvasId) => {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const W = canvas.offsetWidth || 780;
  const H = canvas.offsetHeight || 110;
  canvas.width = W;
  canvas.height = H;

  const cellSize = 12;
  const cellGap  = 3;
  const step     = cellSize + cellGap;
  const weeks    = Math.floor(W / step);
  const days     = 7;
  const offsetX  = 2;
  const offsetY  = (H - days * step) / 2;

  const baseColor  = '#F75C1A'; // primary orange

  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < days; d++) {
      // Simulate realistic contribution patterns
      const rand = Math.random();
      const weekFactor = (w / weeks); // slight bias toward recent activity
      let intensity;
      if (rand < 0.35) intensity = 0;
      else if (rand < 0.55) intensity = 0.15 + Math.random() * 0.15;
      else if (rand < 0.75) intensity = 0.3 + Math.random() * 0.25;
      else if (rand < 0.90) intensity = 0.55 + Math.random() * 0.25;
      else intensity = 0.80 + Math.random() * 0.20;

      // Higher intensity toward recent weeks
      intensity = Math.min(1, intensity + weekFactor * 0.15);

      const x = offsetX + w * step;
      const y = offsetY + d * step;

      ctx.fillStyle = intensity === 0 ? 'rgba(46, 35, 38, 0.08)' :
        `rgba(247, 92, 26, ${intensity.toFixed(2)})`;

      ctx.beginPath();
      ctx.roundRect(x, y, cellSize, cellSize, 2);
      ctx.fill();
    }
  }
};

// Smooth scroll to element
window.smoothScrollTo = (targetId) => {
  const el = document.querySelector(targetId);
  if (!el) return;
  const navH = document.getElementById('nav')?.offsetHeight || 72;
  const top = el.getBoundingClientRect().top + window.scrollY - navH - 16;
  window.scrollTo({ top, behavior: 'smooth' });
};

// Intersection observer for "enter viewport" class
window.createEnterObserver = (selector, cls = 'is-visible', options = {}) => {
  const els = document.querySelectorAll(selector);
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(cls);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, ...options });
  els.forEach(el => observer.observe(el));
  return observer;
};

console.log('[Portfolio] Utils loaded');
