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
// CAREERS & APPLICATION FORM LOGIC
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. FILTER & SEARCH LOGIC
  const searchInput = document.getElementById('jobSearchInput');
  const deptFilter = document.getElementById('departmentFilter');
  const locFilter = document.getElementById('locationFilter');
  const jobCards = document.querySelectorAll('.job-card-item');
  const countDisplay = document.getElementById('jobCountDisplay');

  function filterJobs() {
    if (!jobCards.length) return;
    const query = (searchInput?.value || '').toLowerCase().trim();
    const dept = deptFilter?.value || 'all';
    const loc = locFilter?.value || 'all';

    let visibleCount = 0;

    jobCards.forEach(card => {
      const cardDept = card.getAttribute('data-dept') || '';
      const cardLoc = card.getAttribute('data-loc') || '';
      const textContent = card.innerText.toLowerCase();

      const matchesSearch = !query || textContent.includes(query);
      const matchesDept = dept === 'all' || cardDept === dept;
      const matchesLoc = loc === 'all' || cardLoc === loc;

      if (matchesSearch && matchesDept && matchesLoc) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (countDisplay) {
      countDisplay.textContent = `Showing ${visibleCount} Opening${visibleCount === 1 ? '' : 's'}`;
    }
  }

  searchInput?.addEventListener('input', filterJobs);
  deptFilter?.addEventListener('change', filterJobs);
  locFilter?.addEventListener('change', filterJobs);

  // 2. MODAL TOGGLE & ROLE AUTO-POPULATE
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

    // Reset view states
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

  document.querySelectorAll('.apply-now-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const jobId = btn.getAttribute('data-job-id') || 'PB-JOB-GEN';
      const jobTitle = btn.getAttribute('data-job-title') || 'General Application';
      openModal(jobId, jobTitle);
    });
  });

  modalCloseBtn?.addEventListener('click', closeModal);
  closeSuccessBtn?.addEventListener('click', closeModal);

  // Close on backdrop click
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeModal();
    }
  });

  // 3. FILE UPLOAD & VALIDATION (CV & Cover Letter)
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
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

      // Validation
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

    dropzone.addEventListener('click', () => input.click());

    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      handleFile(file);
    });

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files.length) {
        input.files = e.dataTransfer.files;
        handleFile(e.dataTransfer.files[0]);
      }
    });

    removeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      input.value = '';
      chip?.classList.remove('active');
      if (errorEl) errorEl.classList.remove('active');
    });
  }

  setupDropzone('cvDropzone', 'cvFileInput', 'cvPreviewChip', 'cvFileName', 'cvFileSize', 'cvRemoveBtn', 'cvErrorMsg');
  setupDropzone('clDropzone', 'clFileInput', 'clPreviewChip', 'clFileName', 'clFileSize', 'clRemoveBtn', 'clErrorMsg');

  // 4. SUBMISSION HANDLER
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

    // Simulate reliable dispatch
    setTimeout(() => {
      const randomRef = 'PB-APP-' + Math.floor(1000 + Math.random() * 9000);
      if (successRefCode) successRefCode.textContent = `Application Ref: #${randomRef}`;

      if (careerForm) careerForm.style.display = 'none';
      if (modalSuccessView) modalSuccessView.classList.add('active');

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Application ↗';
      }

      // Reset form fields
      careerForm.reset();
      document.getElementById('cvPreviewChip')?.classList.remove('active');
      document.getElementById('clPreviewChip')?.classList.remove('active');
    }, 1200);
  });
});
