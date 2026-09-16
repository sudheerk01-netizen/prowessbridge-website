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


// ============================================================

// ============================================================
// CAREERS: DYNAMIC JOB OPENINGS CONFIGURATION
// ============================================================
const JOB_OPENINGS = [
  {
    id: "PB-SAP-CM-01",
    title: "SAP Convergent Mediation Developer",
    urgent: true,
    department: "SAP Practice (BRIM)",
    deptKey: "sap",
    employmentType: "C2H (Contract-to-Hire)",
    location: "India Delivery Hub / Hybrid / Remote",
    locKey: "hybrid",
    experience: "9+ Years overall | 5+ Years SAP CM",
    description: "We are looking for an experienced SAP Convergent Mediation Developer with strong expertise in high-volume usage and event processing environments. You will architect mediation pipelines, transformation logic, and seamless integration with SAP BRIM, CC, CI, FI-CA, and S/4HANA.",
    responsibilities: [
      "Design, develop and support enterprise SAP Convergent Mediation solutions",
      "Develop mediation pipelines, transformation logic, enrichment and routing rules",
      "Process and transform high-volume usage and real-time event data",
      "Support event collection, normalisation, validation, duplicate detection, and error handling",
      "Integrate with SAP CC, CI, FI-CA, and SAP S/4HANA via APIs and middleware",
      "Optimise mediation pipelines for ultra-high-volume processing and performance tuning",
      "Develop automation scripts, support deployments, root cause analysis (RCA), and maintain technical runbooks"
    ],
    tags: ["SAP Convergent Mediation", "SAP BRIM", "Event Processing", "Mediation Pipelines", "SAP CC", "SAP CI", "FI-CA", "APIs & Middleware", "Performance Tuning"],
    preferred: "SAP S/4HANA | Integration Suite | SAP BTP | Kafka / Event Streaming | Cloud SAP | DevOps",
    badgeColor: "orange"
  },
  {
    id: "PB-SAP-ABAP-02",
    title: "SAP ABAP Developer – S/4HANA / BRIM / FI-CA / Fiori",
    urgent: true,
    department: "SAP Practice (BRIM & S/4HANA)",
    deptKey: "sap",
    employmentType: "C2H (Contract-to-Hire)",
    location: "India Delivery Hub / Hybrid / Remote",
    locKey: "hybrid",
    experience: "10+ Years SAP ABAP | 6+ Years BRIM / FI-CA",
    description: "We are looking for a highly experienced SAP ABAP Developer with strong expertise in S/4HANA, BRIM, FI-CA, and Fiori/UI5. You will engineer custom objects, CDS views, AMDP, RAP, OData APIs, and support end-to-end billing, invoicing, payments, and dunning integrations.",
    responsibilities: [
      "Develop SAP custom objects, enhancements, reports, interfaces, conversions and forms",
      "Develop solutions using ABAP Objects (OO), CDS Views, AMDP, RAP and OData",
      "Build REST/SOAP APIs and enterprise integration solutions",
      "Debug, refactor and optimise ABAP programs, memory consumption and integrations",
      "Develop data migration and ETL solutions using IDocs, BAPIs, Migration Cockpit, LSMW, EMIGALL and BODS",
      "Develop and deploy modern SAP Fiori/UI5 applications",
      "Support BRIM components including SOM, CI, CC and FI-CA",
      "Enhance billing, invoicing, payments and dunning processes",
      "Support BRIM integration with CRM and external systems",
      "Work with RFC, IDocs, REST/SOAP and secure authentication protocols",
      "Support SAP CRM Web UI, GENIL/BOL and One Order architecture"
    ],
    tags: ["SAP ABAP", "S/4HANA", "BRIM", "FI-CA", "ABAP OO", "CDS Views", "AMDP", "RAP", "OData", "Fiori/UI5", "IDocs", "RFC", "GENIL/BOL"],
    preferred: "SAP BTP | Business Application Studio (BAS) | Fiori Elements | DevOps | Agile",
    badgeColor: "orange"
  },
  {
    id: "PB-SAP-DATA-03",
    title: "SAP BRIM Data Analyst / Developer – BODS + EMIGALL",
    urgent: true,
    department: "SAP Practice (Data Migration)",
    deptKey: "sap",
    employmentType: "C2H (Contract-to-Hire)",
    location: "India Delivery Hub / Hybrid / Remote",
    locKey: "hybrid",
    experience: "9+ Years overall | 5+ Years BODS | 3+ Years EMIGALL",
    description: "We are looking for an experienced professional with strong expertise in SAP BODS, EMIGALL, and SAP BRIM/FI-CA data migration. You will lead source-to-target mapping, ETL jobs, EMIGALL object configuration, mock conversions, and cutovers.",
    responsibilities: [
      "Support SAP BRIM data migration and conversion across SOM, CC, CI and FI-CA",
      "Develop source-to-target mappings and complex transformation logic",
      "Design and maintain BODS ETL jobs, workflows, data cleansing and scripts",
      "Optimise ETL performance and troubleshoot complex job failures",
      "Configure EMIGALL migration objects and load programs",
      "Support master and transactional data migration across legacy and S/4HANA systems",
      "Execute migration loads, automated data validation and reconciliation reports",
      "Support mock conversions, dress rehearsals and production cutover windows",
      "Develop SQL queries and reconciliation verification dashboards",
      "Support BRIM integrations with S/4HANA, CRM and external legacy architectures"
    ],
    tags: ["SAP BODS", "SAP BRIM", "EMIGALL", "FI-CA Migration", "ETL", "Data Mapping", "Data Transformation", "SQL", "Reconciliation", "S/4HANA"],
    preferred: "SAP Data Migration Cockpit | SAP HANA | Datasphere | SAC | Cloud SAP Environments",
    badgeColor: "orange"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const jobsContainer = document.getElementById('jobsDynamicContainer');
  const filterBar = document.getElementById('careerFilterBar');
  const countDisplay = document.getElementById('jobCountDisplay');
  const searchInput = document.getElementById('jobSearchInput');
  const deptFilter = document.getElementById('departmentFilter');
  const locFilter = document.getElementById('locationFilter');

  function renderJobsList() {
    if (!jobsContainer) return;

    if (!JOB_OPENINGS || JOB_OPENINGS.length === 0) {
      if (filterBar) filterBar.style.display = 'none';
      jobsContainer.innerHTML = `
        <div class="talent-pool-hero-card">
          <div class="talent-pool-status-tag">
            <span class="pulse-dot"></span> Active Talent Acquisition & Ongoing Sourcing
          </div>
          <h3 class="talent-pool-title">We Hire On An Ongoing Basis for Enterprise Engagements</h3>
          <p class="talent-pool-desc">
            Our technology delivery teams and SAP transformation pods expand dynamically based on new client requirements across North America, Europe, and India. While active project positions are being finalized, we continuously evaluate and interview experienced specialists.
          </p>
          <div class="talent-pool-cta-wrap">
            <button class="btn btn-primary apply-now-btn" data-job-id="PB-TALENT-POOL" data-job-title="General Application / Enterprise Talent Pool" style="padding:16px 36px; font-size:1.05rem;">
              Submit Your CV & Express Interest ↗
            </button>
          </div>
        </div>
      `;
      attachModalListeners();
      return;
    }

    if (filterBar) filterBar.style.display = 'flex';
    filterJobs();
  }

  function filterJobs() {
    if (!JOB_OPENINGS || JOB_OPENINGS.length === 0) return;

    const query = (searchInput?.value || '').toLowerCase().trim();
    const dept = deptFilter?.value || 'all';
    const loc = locFilter?.value || 'all';

    const filtered = JOB_OPENINGS.filter(job => {
      const matchesSearch = !query || 
        job.title.toLowerCase().includes(query) || 
        job.description.toLowerCase().includes(query) ||
        (job.tags && job.tags.some(t => t.toLowerCase().includes(query)));
      const matchesDept = dept === 'all' || job.deptKey === dept;
      const matchesLoc = loc === 'all' || job.locKey === loc;
      return matchesSearch && matchesDept && matchesLoc;
    });

    if (countDisplay) {
      countDisplay.textContent = `Showing ${filtered.length} Active Opening${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      jobsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align:center; padding:50px 20px; background:var(--bg-card); border-radius:20px; border:1px solid var(--border-glass);">
          <h4 style="font-size:1.3rem; color:#ffffff; margin-bottom:8px;">No matching openings found</h4>
          <p style="color:var(--text-secondary); margin-bottom:20px;">Try adjusting your search query or submit a general application.</p>
          <button class="btn btn-outline apply-now-btn" data-job-id="PB-TALENT-POOL" data-job-title="General Application / Enterprise Talent Pool">
            Submit General Application ↗
          </button>
        </div>
      `;
    } else {
      jobsContainer.innerHTML = filtered.map(job => `
        <div class="job-card-item ${job.urgent ? 'urgent-card' : ''}">
          <div>
            <div class="job-meta-top">
              <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
                ${job.urgent ? `<span class="urgent-badge">🔥 URGENT REQUIREMENT</span>` : ''}
                <span class="job-dept-badge ${job.badgeColor || ''}">${job.department}</span>
                ${job.employmentType ? `<span class="c2h-badge">${job.employmentType}</span>` : ''}
              </div>
              <span class="job-location-pill">📍 ${job.location}</span>
            </div>

            <h3 class="job-card-title">${job.title}</h3>
            
            <div class="job-highlight-strip">
              <span><strong>Overall Exp:</strong> 9+ Years</span>
              <span><strong>SAP CM Exp:</strong> 5+ Years</span>
              <span><strong>Model:</strong> C2H Contract</span>
            </div>

            <p class="job-card-desc">${job.description}</p>

            <!-- RESPONSIBILITIES COLLAPSIBLE -->
            ${job.responsibilities && job.responsibilities.length ? `
              <div class="role-details-toggle" data-job-id="${job.id}">
                <button class="role-toggle-btn" type="button">
                  <span>View Key Responsibilities & Integration Scope</span>
                  <span class="toggle-arrow">▾</span>
                </button>
                <div class="role-details-content">
                  <ul class="role-bullets">
                    ${job.responsibilities.map(r => `<li>${r}</li>`).join('')}
                  </ul>
                  ${job.preferred ? `
                    <div class="preferred-skills-box">
                      <strong>⭐ Preferred & Advantageous:</strong> ${job.preferred}
                    </div>
                  ` : ''}
                </div>
              </div>
            ` : ''}

            <div class="job-tags-row" style="margin-top:16px;">
              ${(job.tags || []).map(tag => `<span class="job-skill-chip">${tag}</span>`).join('')}
            </div>
          </div>

          <div class="job-card-footer">
            <div class="job-exp-info">Experience: <strong>${job.experience}</strong></div>
            <button class="btn btn-primary apply-now-btn" data-job-id="${job.id}" data-job-title="${job.title}" style="box-shadow:0 8px 24px rgba(247,127,0,0.35); border-color:var(--orange);">
              Apply for This Position ↗
            </button>
          </div>
        </div>
      `).join('') + `
        <div class="general-app-banner">
          <div class="general-app-text">
            <span class="card-tag" style="color:var(--teal);">ADDITIONAL PROFILES</span>
            <h3>Looking for other SAP modules or Cloud roles?</h3>
            <p>We are constantly expanding our SAP S/4HANA and engineering pods. Submit your profile to our talent desk for upcoming client engagements.</p>
          </div>
          <div>
            <button class="btn btn-outline apply-now-btn" data-job-id="PB-TALENT-POOL" data-job-title="General Application / Enterprise Talent Pool" style="border-color:var(--teal); color:#ffffff;">
              Submit Profile ↗
            </button>
          </div>
        </div>
      `;
    }

    attachModalListeners();
    attachToggleListeners();
  }

  function attachToggleListeners() {
    document.querySelectorAll('.role-toggle-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        const parent = btn.closest('.role-details-toggle');
        if (parent) {
          parent.classList.toggle('open');
          const arrow = btn.querySelector('.toggle-arrow');
          if (arrow) {
            arrow.textContent = parent.classList.contains('open') ? '▴' : '▾';
          }
        }
      };
    });
  }

  searchInput?.addEventListener('input', filterJobs);
  deptFilter?.addEventListener('change', filterJobs);
  locFilter?.addEventListener('change', filterJobs);

  // Modal Setup
  const modal = document.getElementById('applicationModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalRoleTitle = document.getElementById('modalJobTitle');
  const modalJobRef = document.getElementById('modalJobRef');
  const appliedJobId = document.getElementById('appliedJobId');
  const appliedJobTitle = document.getElementById('appliedJobTitle');
  const careerForm = document.getElementById('careerApplicationForm');
  const modalSuccessView = document.getElementById('modalSuccessView');
  const closeSuccessBtn = document.getElementById('closeSuccessBtn');
  const successRefCode = document.getElementById('successRefCode');

  function openModal(jobId, jobTitle) {
    if (!modal) return;
    if (modalRoleTitle) modalRoleTitle.textContent = jobTitle;
    if (modalJobRef) modalJobRef.textContent = `Reference Code: #${jobId}`;
    if (appliedJobId) appliedJobId.value = jobId;
    if (appliedJobTitle) appliedJobTitle.value = jobTitle;

    if (careerForm) careerForm.style.display = 'block';
    if (modalSuccessView) modalSuccessView.classList.remove('active');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  function attachModalListeners() {
    document.querySelectorAll('.apply-now-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        const jobId = btn.getAttribute('data-job-id') || 'PB-TALENT-POOL';
        const jobTitle = btn.getAttribute('data-job-title') || 'General Application';
        openModal(jobId, jobTitle);
      };
    });
  }

  modalCloseBtn?.addEventListener('click', closeModal);
  closeSuccessBtn?.addEventListener('click', closeModal);

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) closeModal();
  });

  // File Upload Handlers (CV & Cover Letter)
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const ALLOWED_EXTS = ['pdf', 'docx', 'doc'];

  function setupDropzone(dropzoneId, inputId, previewChipId, nameId, sizeId, removeBtnId, errorId) {
    const dropzone = document.getElementById(dropzoneId);
    const input = document.getElementById(inputId);
    const chip = document.getElementById(previewChipId);
    const nameEl = document.getElementById(nameId);
    const sizeEl = document.getElementById(sizeId);
    const removeBtn = document.getElementById(removeBtnId);
    const errorEl = document.getElementById(errorId);

    if (!dropzone || !input) return;

    function formatSize(bytes) {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    function handleFile(file) {
      if (!file) return;
      const ext = file.name.split('.').pop().toLowerCase();

      if (!ALLOWED_EXTS.includes(ext) || file.size > MAX_FILE_SIZE) {
        if (errorEl) {
          errorEl.textContent = !ALLOWED_EXTS.includes(ext)
            ? 'Only PDF, DOCX, or DOC formats are accepted.'
            : `File size (${formatSize(file.size)}) exceeds the maximum 5 MB limit.`;
          errorEl.classList.add('active');
        }
        input.value = '';
        chip?.classList.remove('active');
        return false;
      }

      if (errorEl) errorEl.classList.remove('active');
      if (nameEl) nameEl.textContent = file.name;
      if (sizeEl) sizeEl.textContent = formatSize(file.size);
      chip?.classList.add('active');
      return true;
    }

    dropzone.onclick = () => input.click();

    input.onchange = (e) => {
      const file = e.target.files[0];
      handleFile(file);
    };

    dropzone.ondragover = (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    };

    dropzone.ondragleave = () => {
      dropzone.classList.remove('dragover');
    };

    dropzone.ondrop = (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files.length) {
        input.files = e.dataTransfer.files;
        handleFile(e.dataTransfer.files[0]);
      }
    };

    removeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      input.value = '';
      chip?.classList.remove('active');
      if (errorEl) errorEl.classList.remove('active');
    });
  }

  setupDropzone('cvDropzone', 'cvFileInput', 'cvPreviewChip', 'cvFileName', 'cvFileSize', 'cvRemoveBtn', 'cvErrorMsg');
  setupDropzone('clDropzone', 'clFileInput', 'clPreviewChip', 'clFileName', 'clFileSize', 'clRemoveBtn', 'clErrorMsg');

  // Form Submission
  careerForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const cvInput = document.getElementById('cvFileInput');
    if (!cvInput?.files?.length) {
      const cvError = document.getElementById('cvErrorMsg');
      if (cvError) {
        cvError.textContent = 'Please attach your Curriculum Vitae (CV) / Resume.';
        cvError.classList.add('active');
      }
      return;
    }

    const submitBtn = document.getElementById('submitAppBtn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Transmitting Application...';
    }

    setTimeout(() => {
      const randomRef = 'PB-APP-' + Math.floor(1000 + Math.random() * 9000);
      if (successRefCode) successRefCode.textContent = `Application Ref: #${randomRef}`;

      if (careerForm) careerForm.style.display = 'none';
      if (modalSuccessView) modalSuccessView.classList.add('active');

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Application ↗';
      }

      careerForm.reset();
      document.getElementById('cvPreviewChip')?.classList.remove('active');
      document.getElementById('clPreviewChip')?.classList.remove('active');
    }, 1200);
  });

  renderJobsList();
});
