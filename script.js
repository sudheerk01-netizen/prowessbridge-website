document.addEventListener('DOMContentLoaded', () => {
  // 1. MOBILE MENU TOGGLE
  const hamb = document.querySelector('.hamburger');
  const nav = document.querySelector('.main-nav');
  
  if (hamb && nav) {
    hamb.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      hamb.setAttribute('aria-expanded', isOpen);
      hamb.innerHTML = isOpen ? '✕' : '☰';
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !hamb.contains(e.target) && nav.classList.contains('open')) {
        nav.classList.remove('open');
        hamb.setAttribute('aria-expanded', 'false');
        hamb.innerHTML = '☰';
      }
    });
  }

  // 2. ACTIVE NAVIGATION HIGHLIGHTING
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 3. TABBED SWITCHERS (FOR SAP & TECH PAGES)
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabTarget = btn.getAttribute('data-tab');
      const parentTabs = btn.closest('.tabs-container');
      
      if (parentTabs) {
        parentTabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        parentTabs.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        
        btn.classList.add('active');
        const targetPane = parentTabs.querySelector(`#${tabTarget}`);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      }
    });
  });

  // 4. FAQ ACCORDIONS
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const faqItem = q.closest('.faq-item');
      const isAlreadyOpen = faqItem.classList.contains('open');
      
      // Close other accordions in the same container
      const container = faqItem.closest('.faq-container');
      if (container) {
        container.querySelectorAll('.faq-item').forEach(item => item.classList.remove('open'));
      }
      
      if (!isAlreadyOpen) {
        faqItem.classList.add('open');
      }
    });
  });

  // 5. PROCXEL AI SCREENER INTERACTIVE DEMO SIMULATOR
  const candidateButtons = document.querySelectorAll('.candidate-select-btn');
  if (candidateButtons.length > 0) {
    const candidateData = {
      sap: {
        title: "Priya Sharma — Lead SAP S/4HANA Architect",
        score: "96%",
        scoreDegree: "96%",
        role: "SAP S/4HANA Migration & Clean Core Lead",
        skills: [
          { name: "S/4HANA 2023 Enterprise Cloud", score: "98%" },
          { name: "FICO & Order-to-Cash (O2C)", score: "95%" },
          { name: "ABAP on HANA & BTP Extension", score: "92%" },
          { name: "Enterprise Architecture Governance", score: "97%" }
        ],
        summary: "14+ years in complex Greenfield S/4HANA rollouts across manufacturing and global retail."
      },
      cloud: {
        title: "Rahul Verma — Senior Cloud & Full-Stack Architect",
        score: "94%",
        scoreDegree: "94%",
        role: "Cloud Modernization & Microservices",
        skills: [
          { name: "AWS & Azure Cloud Architecture", score: "96%" },
          { name: "Node.js / React / TypeScript Stack", score: "95%" },
          { name: "Kubernetes & CI/CD Pipelines", score: "91%" },
          { name: "Data Security & Observability", score: "93%" }
        ],
        summary: "10+ years architecting multi-tenant SaaS and enterprise containerized platforms."
      },
      supply: {
        title: "Anita Desai — Supply Chain & Logistics Strategist",
        score: "91%",
        scoreDegree: "91%",
        role: "Procurement & Warehouse Operations Specialist",
        skills: [
          { name: "Demand Forecasting & S&OP", score: "94%" },
          { name: "SAP EWM / WMS Integration", score: "90%" },
          { name: "Procure-to-Pay (P2P) Optimization", score: "93%" },
          { name: "Supply Chain Control Tower Analytics", score: "88%" }
        ],
        summary: "9+ years driving inventory reduction and automated fulfillment for tier-1 enterprises."
      }
    };

    candidateButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        candidateButtons.forEach(b => b.classList.remove('btn-primary', 'active'));
        candidateButtons.forEach(b => b.classList.add('btn-outline'));
        btn.classList.remove('btn-outline');
        btn.classList.add('btn-primary', 'active');

        const key = btn.getAttribute('data-candidate');
        const cand = candidateData[key];
        if (cand) {
          document.querySelector('.screener-cand-name').textContent = cand.title;
          document.querySelector('.screener-cand-role').textContent = cand.role;
          document.querySelector('.screener-cand-summary').textContent = cand.summary;
          document.querySelector('.score-circle-inner').textContent = cand.score;
          
          const circle = document.querySelector('.score-circle');
          circle.style.background = `conic-gradient(var(--teal) 0% ${cand.scoreDegree}, #1e3a58 ${cand.scoreDegree} 100%)`;

          const skillContainer = document.querySelector('.skill-bars');
          skillContainer.innerHTML = cand.skills.map(s => `
            <div class="skill-bar-item">
              <div class="skill-info">
                <span>${s.name}</span>
                <span style="color:var(--teal); font-weight:800;">${s.score}</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" style="width: ${s.score};"></div>
              </div>
            </div>
          `).join('');
        }
      });
    });
  }

  // 6. CONTACT FORM HANDLER WITH DYNAMIC INQUIRY ROUTING
  const contactForm = document.getElementById('mainContactForm');
  if (contactForm) {
    const channelSelect = document.getElementById('inquiryCategory');
    const channelNotice = document.getElementById('channelNotice');

    if (channelSelect && channelNotice) {
      channelSelect.addEventListener('change', () => {
        const val = channelSelect.value;
        if (val === 'talent' || val === 'staffing') {
          channelNotice.innerHTML = `📌 <strong>Routing Desk:</strong> ProCXel Recruitment (<span style="color:var(--pink)">info@procxel.com</span>)`;
        } else {
          channelNotice.innerHTML = `📌 <strong>Routing Desk:</strong> Technology & SAP Advisory (<span style="color:var(--teal)">info@prowessbridgetech.com</span>)`;
        }
      });
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending Enquiry... ⏳';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = 'Enquiry Transmitted ✓';
        submitBtn.style.background = 'var(--green)';
        
        const statusBox = document.getElementById('formStatus');
        if (statusBox) {
          statusBox.className = 'form-status success';
          statusBox.innerHTML = `<strong>Thank you!</strong> Your message has been received. Our advisory team will respond within 24 business hours.`;
        }
        
        contactForm.reset();
      }, 900);
    });
  }
});
