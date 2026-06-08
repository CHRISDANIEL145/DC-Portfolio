/* ================================================================
   TERMINAL.JS — Interactive Agency Command Terminal
================================================================ */

'use strict';

const TERMINAL_RESPONSES = {
  'hire': {
    lines: [
      '> Initiating hire sequence...',
      '',
      '✓ Daniel Christopher — AI Engineer & Full Stack Developer',
      '✓ Available for: Full-time projects, consulting, partnerships',
      '✓ Timezone: Flexible (async-friendly)',
      '✓ Delivery: Agile sprints with weekly demos',
      '',
      '→ Ready to discuss your project.',
      '→ Use the form below or type "book-call" to schedule.',
    ]
  },

  'projects': {
    lines: [
      '> Loading project registry...',
      '',
      '[01] uber-helpful-feedback-ai   — NLP · 94% accuracy · 80% time saved',
      '[02] linguaverify-ai            — Language AI · 99.2% detection',
      '[03] rag-enterprise-chatbot     — LLM · $50K annual savings',
      '[04] ml-recommendation-engine  — ML · 28% revenue increase',
      '[05] predictive-analytics-plat  — Data Science · 87% accuracy',
      '[06] ai-saas-platform           — SaaS · 500+ users in 3 months',
      '',
      '→ Scroll up on this page to explore the Project City.',
      '→ View all: github.com/CHRISDANIEL145',
    ]
  },

  'services': {
    lines: [
      '> Listing available services...',
      '',
      '01. AI Development          — Custom AI systems, end-to-end',
      '02. LLM Applications        — RAG, LangChain agents, GPT-4',
      '03. Chatbot Development     — Domain-specific, multi-platform',
      '04. SaaS Development        — Multi-tenant, full-stack',
      '05. Full Stack Development  — React + Python APIs',
      '06. Machine Learning        — Predictive models, recommendations',
      '07. Data Science            — Analysis, modeling, dashboards',
      '08. Automation Systems      — Workflow, document processing',
      '09. AI Consulting           — Roadmaps, architecture, audits',
      '',
      '→ Scroll to Services section for full details.',
      '→ Type "hire" to start working together.',
    ]
  },

  'contact': {
    lines: [
      '> Retrieving contact information...',
      '',
      '📧 Email   : daniel@danielchristopher.dev',
      '🐙 GitHub  : github.com/CHRISDANIEL145',
      '💼 LinkedIn: linkedin.com/in/danielchristopherm',
      '🤗 HF      : huggingface.co/Danielchris145',
      '',
      '→ Response time: usually within 2 hours.',
      '→ Use the form below to send a message directly.',
    ]
  },

  'book-call': {
    lines: [
      '> Opening calendar scheduler...',
      '',
      '📅 30-minute discovery call — free, no commitment.',
      '',
      '✓ We\'ll discuss your project goals',
      '✓ Technical requirements & feasibility',
      '✓ Timeline and budget overview',
      '✓ Next steps if it\'s a good fit',
      '',
      '→ Booking link: calendly.com/danielchristopher',
      '→ Or use the contact form below with "Book a call" subject.',
    ]
  },

  'help': {
    lines: [
      '> Available commands:',
      '',
      '  hire       — Start working with Daniel',
      '  projects   — View all AI projects',
      '  services   — List all services offered',
      '  contact    — Get contact information',
      '  book-call  — Schedule a discovery call',
      '  help       — Show this help message',
      '  clear      — Clear terminal output',
      '',
      '→ Click any command above to run it.',
    ]
  },

  'clear': { lines: [], clear: true },

  'ls': {
    lines: [
      'projects/   services/   contact/   lab/',
      'github.com  linkedin.com  huggingface.co',
    ]
  },

  'whoami': {
    lines: [
      'daniel.christopher',
      '> AI Engineer · Generative AI Developer · ML Engineer',
      '> Full Stack Developer · Freelancer · AI Agency Founder',
    ]
  },

  'pwd': { lines: ['/home/daniel/ai-agency'] },

  'echo': { lines: ['Echo... echo... echo...'] },
};

const UNKNOWN_CMD_RESPONSES = [
  (cmd) => `zsh: command not found: ${cmd}\n→ Type "help" to see available commands.`,
  (cmd) => `Error: "${cmd}" is not recognized.\n→ Did you mean: hire | projects | services | contact | book-call?`,
  (cmd) => `Unknown command: ${cmd}\n→ Type "help" for a list of commands.`,
];

let unknownIdx = 0;

function initTerminal() {
  const output  = document.getElementById('terminal-output');
  const input   = document.getElementById('terminal-input');
  if (!output || !input) return;

  const history = [];
  let histIdx = -1;

  function printLines(lines, isError = false) {
    lines.forEach((line, i) => {
      setTimeout(() => {
        const p = document.createElement('p');
        p.className = 't-line' + (isError ? ' t-line--error' : line.startsWith('>') ? ' t-line--cmd' : line.startsWith('→') ? ' t-line--response' : line === '' ? '' : '');
        p.textContent = line;
        output.appendChild(p);
        output.scrollTop = output.scrollHeight;
      }, i * 30);
    });
  }

  function printPromptEcho(cmd) {
    const p = document.createElement('p');
    p.className = 't-line t-line--cmd';
    p.innerHTML = `<span style="color:var(--clr-secondary)">daniel</span><span style="color:rgba(255,255,255,0.35)">@</span><span style="color:var(--clr-primary)">agency</span> <span style="color:rgba(255,255,255,0.5)">$</span> ${escapeHtml(cmd)}`;
    output.appendChild(p);
  }

  function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    history.unshift(raw.trim());
    histIdx = -1;

    printPromptEcho(raw.trim());

    if (cmd === 'clear') {
      setTimeout(() => {
        output.innerHTML = '';
      }, 60);
      return;
    }

    const response = TERMINAL_RESPONSES[cmd];
    if (response) {
      printLines(response.lines);
    } else {
      // handle "echo [text]"
      if (cmd.startsWith('echo ')) {
        printLines([cmd.slice(5)]);
      } else {
        const errFn = UNKNOWN_CMD_RESPONSES[unknownIdx % UNKNOWN_CMD_RESPONSES.length];
        unknownIdx++;
        printLines(errFn(cmd).split('\n'), true);
      }
    }

    // spacer
    setTimeout(() => {
      const spacer = document.createElement('br');
      output.appendChild(spacer);
      output.scrollTop = output.scrollHeight;
    }, (response?.lines?.length || 3) * 32 + 30);
  }

  // Input handler
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value;
      input.value = '';
      runCommand(val);
    }

    // Command history navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx < history.length - 1) {
        histIdx++;
        input.value = history[histIdx];
      }
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx > 0) {
        histIdx--;
        input.value = history[histIdx];
      } else {
        histIdx = -1;
        input.value = '';
      }
    }

    // Tab completion
    if (e.key === 'Tab') {
      e.preventDefault();
      const val = input.value.toLowerCase();
      const cmds = Object.keys(TERMINAL_RESPONSES);
      const match = cmds.find(c => c.startsWith(val) && c !== val);
      if (match) input.value = match;
    }
  });

  // Clickable command buttons
  document.querySelectorAll('.t-cmd-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      input.focus();
      runCommand(btn.dataset.cmd);
    });
  });

  // Auto-focus terminal on click
  const termBox = document.getElementById('terminal-box');
  if (termBox) {
    termBox.addEventListener('click', () => input.focus());
  }

  console.log('[Portfolio] Terminal initialized');
}

document.addEventListener('DOMContentLoaded', initTerminal);
