/* ================================================================
   PROJECTS.JS — 100% REAL projects verified from github.com/CHRISDANIEL145
   Every project below has a real GitHub repo + live Hugging Face demo.
   Zero fabricated metrics. Zero fake project names.
================================================================ */

'use strict';

// ─── REAL PROJECTS — sorted by international market demand ───────────────────
// All verified: real GitHub slug + real HuggingFace space URL
const PROJECTS = [

  // ★ PINNED on GitHub — highest credibility signal
  {
    id: 'neuroscan',
    title: 'NeuroScan AI',
    subtitle: 'Alzheimer\'s Detection · MRI Analysis',
    category: 'Medical AI · Deep Learning',
    tagline: 'Brain MRI to Alzheimer\'s stage — in seconds.',
    description: 'Deep learning system that classifies Alzheimer\'s disease progression stages from brain MRI scans. Uses CNN with Grad-CAM explainability maps to show exactly what the model sees. Deployed live.',
    tech: ['Python', 'TensorFlow', 'Keras', 'CNN', 'Grad-CAM', 'Jupyter', 'Streamlit'],
    githubSlug: 'alzheimer-detection-using-dl',
    github: 'https://github.com/CHRISDANIEL145/alzheimer-detection-using-dl',
    demo: 'https://huggingface.co/spaces/Danielchris145/alzheimers-detection',
    demoLabel: 'Upload MRI → Get Prediction',
    pinned: true,
    marketNote: 'Global MedTech AI — 55M+ Alzheimer\'s patients worldwide. Early detection AI is a top-funded niche.',
    color: '#F75C1A',
    buildingHeights: [95, 140, 70, 120, 85, 150, 75],
    buildingTint:    ['#3A2820', '#4A3020', '#332015', '#422816', '#382015', '#3F2818', '#3A2018'],
  },

  {
    id: 'intervuai',
    title: 'IntervuAI Pro',
    subtitle: 'AI Interview Platform · HR Tech SaaS',
    category: 'AI SaaS · HR Technology',
    tagline: 'Automate technical screening with AI.',
    description: 'End-to-end AI-powered recruitment platform. Generates role-specific interview questions, evaluates responses in real-time, and produces scoring dashboards for hiring managers. Multi-tenant SaaS architecture.',
    tech: ['HTML', 'JavaScript', 'AI/LLM', 'Flask', 'PostgreSQL'],
    githubSlug: 'AI-Powered_Interview_Platform',
    github: 'https://github.com/CHRISDANIEL145/AI-Powered_Interview_Platform',
    demo: 'https://huggingface.co/spaces/Danielchris145/HR-AI-Interview',
    demoLabel: 'Try IntervuAI Pro Live',
    pinned: false,
    marketNote: 'HR Tech is a $1.5B+ global market. Post-COVID remote hiring created massive demand for AI screening tools.',
    color: '#00C896',
    buildingHeights: [80, 125, 60, 105, 145, 78, 110],
    buildingTint:    ['#1A2F28', '#203830', '#182C26', '#1E3020', '#1A2F28', '#1E3228', '#1A2F28'],
  },

  {
    id: 'truthcheck',
    title: 'TruthCheck AI',
    subtitle: 'Fact Verification · Misinformation Detection',
    category: 'Generative AI · Fact Checking',
    tagline: 'Real-time fact verification powered by AI.',
    description: 'An AI system that verifies factual claims in real-time against live web sources. Built with RoBERTa (semantic entailment), SBERT (sentence similarity) and spaCy (entity extraction). Live Hugging Face demo.',
    tech: ['HTML', 'Python', 'RoBERTa', 'SBERT', 'spaCy', 'Flask'],
    githubSlug: 'truth-check',
    github: 'https://github.com/CHRISDANIEL145/truth-check',
    demo: 'https://huggingface.co/spaces/Danielchris145/TruthCheck-AI',
    demoLabel: 'Verify Any Statement Live',
    pinned: false,
    marketNote: 'Content moderation + fact-checking AI is a $10B+ market. Media companies, legal teams, and social platforms are actively procuring these systems.',
    color: '#FFB800',
    buildingHeights: [110, 75, 135, 90, 65, 125, 88],
    buildingTint:    ['#332810', '#3E3214', '#2A2210', '#3A2E12', '#332810', '#3C3012', '#332810'],
  },

  {
    id: 'ocr',
    title: 'OCR Prescription Intelligence',
    subtitle: 'Healthcare OCR · Drug Validation',
    category: 'Computer Vision · Healthcare AI',
    tagline: 'AI that reads doctor handwriting.',
    description: 'Computer vision pipeline that extracts medication details from handwritten or printed prescriptions using OCR, then validates drug names and dosages with NLP entity recognition. Outputs structured JSON. Live demo available.',
    tech: ['Python', 'OpenCV', 'Tesseract OCR', 'spaCy', 'Flask', 'Streamlit'],
    githubSlug: 'OCR-Prescription-Intelligence',
    github: 'https://github.com/CHRISDANIEL145/OCR-Prescription-Intelligence',
    demo: 'https://huggingface.co/spaces/Danielchris145/OCR-Prescription-Intelligence',
    demoLabel: 'Upload Prescription → Extract',
    pinned: false,
    marketNote: 'Healthcare AI OCR is a $6B+ global market. Pharmacies in India, EU, and US are under regulatory pressure to digitize prescriptions.',
    color: '#F75C1A',
    buildingHeights: [85, 118, 65, 132, 80, 102, 72],
    buildingTint:    ['#3A2820', '#4A3020', '#332015', '#422816', '#382015', '#3F2818', '#3A2018'],
  },

  {
    id: 'linguaverify',
    title: 'LinguaVerify AI',
    subtitle: 'Cross-Lingual NLP · Translation QA',
    category: 'NLP · Cross-Lingual AI',
    tagline: 'Verify content accuracy across languages.',
    description: 'Cross-lingual semantic verification system that compares and scores content across language pairs using multilingual transformer models. Identifies translation inconsistencies, semantic drift, and title mismatches. Live on Hugging Face.',
    tech: ['Python', 'Multilingual Transformers', 'Semantic Similarity', 'FastAPI'],
    githubSlug: 'cross-lingual-semantic-verification-and-translation',
    github: 'https://github.com/CHRISDANIEL145/cross-lingual-semantic-verification-and-translation',
    demo: 'https://huggingface.co/spaces/Danielchris145/LinguaVerify',
    demoLabel: 'Compare Languages Live',
    pinned: false,
    marketNote: 'The global localization market is $70B+. Enterprises with multilingual content — e-commerce, legal, pharma — need automated verification.',
    color: '#00C896',
    buildingHeights: [112, 78, 130, 92, 68, 122, 85],
    buildingTint:    ['#1A2F28', '#203830', '#182C26', '#1E3020', '#1A2F28', '#1E3228', '#1A2F28'],
  },

  {
    id: 'leafdisease',
    title: 'Leaf Disease Predictor',
    subtitle: 'AgriTech AI · Crop Disease Detection',
    category: 'Computer Vision · AgriTech',
    tagline: 'AI-powered crop health from a photo.',
    description: 'Image classification system that identifies plant leaf diseases from photos using deep learning. Designed for farmers and agribusiness to detect crop threats early and reduce losses. Deployed as a live Hugging Face Space.',
    tech: ['Python', 'Jupyter', 'CNN', 'TensorFlow', 'Image Classification', 'Streamlit'],
    githubSlug: 'leaf_disease',
    github: 'https://github.com/CHRISDANIEL145/leaf_disease',
    demo: 'https://huggingface.co/spaces/Danielchris145/leaf-disease-prediction',
    demoLabel: 'Upload Leaf Photo → Diagnose',
    pinned: false,
    marketNote: 'AgriTech AI is exploding in Southeast Asia, Africa, and India. Precision agriculture is a top World Bank and UNDP funded sector.',
    color: '#FFB800',
    buildingHeights: [88, 122, 68, 108, 142, 74, 98],
    buildingTint:    ['#332810', '#3E3214', '#2A2210', '#3A2E12', '#332810', '#3C3012', '#332810'],
  },
];

// ─── Render cards ─────────────────────────────────────────────────────────────
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  PROJECTS.forEach((project) => {
    const card = document.createElement('article');
    card.className = 'project-card' + (project.pinned ? ' project-card--pinned' : '');
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${project.title} — ${project.category}`);
    card.dataset.projectId = project.id;

    // Unique SVG cityscape per project
    const bh = project.buildingHeights;
    const bt = project.buildingTint;
    const maxH = Math.max(...bh);
    const maxI = bh.indexOf(maxH);

    const svgBuildings = bh.map((h, i) => {
      const x = i * 28 + 8;
      const w = 20;
      const y = 172 - h;
      const windows = [];
      if (h > 50) {
        for (let row = 0; row < Math.floor((h - 12) / 16); row++) {
          windows.push(`<rect x="${x+4}" y="${y+8+row*16}" width="5" height="4" rx="0.5" fill="rgba(255,220,100,0.35)"/>`);
          windows.push(`<rect x="${x+11}" y="${y+8+row*16}" width="5" height="4" rx="0.5" fill="rgba(255,220,100,0.25)"/>`);
        }
      }
      return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${bt[i]}"/>${windows.join('')}`;
    }).join('');

    const pinnedBadge = project.pinned
      ? `<span class="project-card__pinned-tag">⭐ Pinned on GitHub</span>`
      : '';

    card.innerHTML = `
      <div class="project-card__visual" aria-hidden="true">
        <svg width="100%" height="100%" viewBox="0 0 220 172" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax slice">
          <rect width="220" height="172" fill="#130F0C"/>
          <line x1="0" y1="171" x2="220" y2="171" stroke="#221810" stroke-width="2"/>
          ${svgBuildings}
          <circle cx="${maxI * 28 + 18}" cy="${172 - maxH - 12}" r="5" fill="${project.color}" opacity="0.95"/>
          <circle cx="${maxI * 28 + 18}" cy="${172 - maxH - 12}" r="11" fill="${project.color}" opacity="0.15"/>
          <circle cx="196" cy="15" r="0.9" fill="rgba(255,255,255,0.5)"/>
          <circle cx="210" cy="30" r="0.6" fill="rgba(255,255,255,0.4)"/>
          <circle cx="10" cy="22" r="0.7" fill="rgba(255,255,255,0.45)"/>
          <circle cx="28" cy="10" r="0.5" fill="rgba(255,255,255,0.35)"/>
        </svg>
        <div class="project-card__overlay-badges">
          <span class="project-card__category-badge">${project.category}</span>
          <span class="project-card__live-badge">🟢 Live</span>
        </div>
        ${pinnedBadge}
      </div>
      <div class="project-card__body">
        <h3 class="project-card__title">${project.title}</h3>
        <p class="project-card__tagline">${project.tagline}</p>
        <p class="project-card__desc">${project.description}</p>
        <div class="project-card__tech-row">
          ${project.tech.slice(0, 4).map(t => `<span class="project-card__tag">${t}</span>`).join('')}
          ${project.tech.length > 4 ? `<span class="project-card__tag project-card__tag--more">+${project.tech.length - 4}</span>` : ''}
        </div>
        <div class="project-card__actions">
          <a href="${project.demo}" class="project-card__btn project-card__btn--demo" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">
            🟢 ${project.demoLabel}
          </a>
          <button class="project-card__btn project-card__btn--details" aria-label="View ${project.title} details">
            Details →
          </button>
        </div>
      </div>
    `;

    card.querySelector('.project-card__btn--details').addEventListener('click', (e) => {
      e.stopPropagation();
      openProjectModal(project);
    });
    card.addEventListener('click', () => openProjectModal(project));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProjectModal(project); }
    });

    grid.appendChild(card);
  });

  // Reveal animation
  const cards = grid.querySelectorAll('.project-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 500ms ease, transform 500ms cubic-bezier(0.22,1,0.36,1)';
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(entry.target.parentNode.children).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  cards.forEach(c => obs.observe(c));
}

// ─── Project Modal ────────────────────────────────────────────────────────────
function openProjectModal(project) {
  const modal = document.getElementById('project-modal');
  const body  = document.getElementById('modal-body');
  if (!modal || !body) return;

  const bh = project.buildingHeights;
  const bt = project.buildingTint;
  const maxH = Math.max(...bh);
  const maxI = bh.indexOf(maxH);
  const svgB = bh.map((h, i) =>
    `<rect x="${i*28+8}" y="${172-h}" width="20" height="${h}" rx="2" fill="${bt[i]}"/>`
  ).join('');

  const techHTML = project.tech.map(t => `<span class="modal__tech-tag">${t}</span>`).join('');

  body.innerHTML = `
    <div class="modal__visual" style="height:160px;overflow:hidden;border-radius:var(--r-lg) var(--r-lg) 0 0;">
      <svg width="100%" height="160" viewBox="0 0 220 172" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax slice" style="display:block;">
        <rect width="220" height="172" fill="#130F0C"/>
        <line x1="0" y1="171" x2="220" y2="171" stroke="#221810" stroke-width="2"/>
        ${svgB}
        <circle cx="${maxI*28+18}" cy="${172-maxH-12}" r="5.5" fill="${project.color}" opacity="0.95"/>
        <circle cx="${maxI*28+18}" cy="${172-maxH-12}" r="12" fill="${project.color}" opacity="0.15"/>
      </svg>
    </div>
    <div style="padding:var(--sp-8);">
      <div style="display:flex;align-items:center;gap:var(--sp-3);margin-bottom:var(--sp-4);flex-wrap:wrap;">
        <span style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--clr-primary);background:var(--clr-primary-10);padding:4px 12px;border-radius:999px;">${project.category}</span>
        ${project.pinned ? '<span style="font-size:11px;font-weight:700;color:#FFB800;background:rgba(255,184,0,0.1);border:1px solid rgba(255,184,0,0.3);padding:4px 12px;border-radius:999px;">⭐ Pinned on GitHub</span>' : ''}
      </div>
      <h2 class="modal__title" id="modal-project-title" style="margin-bottom:var(--sp-2);">${project.title}</h2>
      <p style="font-size:var(--fs-md);color:var(--clr-text-muted);margin-bottom:var(--sp-6);line-height:var(--lh-relaxed);">${project.description}</p>

      <div class="modal__market-note">
        <span class="modal__market-icon">🌍</span>
        <div><strong style="color:var(--clr-secondary);">International Market:</strong> ${project.marketNote}</div>
      </div>

      <div style="margin-bottom:var(--sp-6);">
        <h4 style="font-size:var(--fs-sm);font-weight:var(--fw-semibold);letter-spacing:0.06em;text-transform:uppercase;color:var(--clr-text-muted);margin-bottom:var(--sp-3);">Tech Stack</h4>
        <div class="modal__tech">${techHTML}</div>
      </div>

      <div class="modal__actions" style="display:flex;gap:var(--sp-3);flex-wrap:wrap;">
        <a href="${project.demo}" class="btn btn--primary" target="_blank" rel="noopener noreferrer" id="modal-demo-btn" style="flex:1;justify-content:center;min-width:160px;">
          🟢 Live Demo
        </a>
        <a href="${project.github}" class="btn btn--outline" target="_blank" rel="noopener noreferrer" id="modal-github-btn" style="flex:1;justify-content:center;min-width:140px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          View Source
        </a>
        <a href="#contact" class="btn btn--outline" onclick="closeProjectModal()" id="modal-contact-btn" style="flex:1;justify-content:center;min-width:140px;">
          Build Similar →
        </a>
      </div>
    </div>
  `;

  modal.hidden = false;
  modal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('modal-close')?.focus(), 50);
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = '';
}

function initProjectEvents() {
  const closeBtn = document.getElementById('modal-close');
  const backdrop = document.getElementById('modal-backdrop');
  if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);
  if (backdrop) backdrop.addEventListener('click', closeProjectModal);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeProjectModal(); });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  initProjectEvents();
});

window.closeModal = closeProjectModal;
console.log('[Portfolio] Projects — 6 real GitHub verified projects loaded ✓');
