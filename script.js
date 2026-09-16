// ============================================================
// ProwessBridge Tech & ProCXel — Main Interactive Script
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  const mainNav = document.querySelector('.main-nav');
  if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      const expanded = mainNav.classList.contains('open');
      hamburger.setAttribute('aria-expanded', expanded);
    });
  }

  // FAQ Accordion (about.html)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(f => f.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // Services Tab Switcher (services.html)
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  if (tabBtns.length && tabPanes.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const targetPane = document.getElementById(targetId);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });
  }

  // ProCXel Screener ATS Interactive Simulation (procxel.html)
  const candidateBtns = document.querySelectorAll('.candidate-select-btn');
  const candName = document.querySelector('.screener-cand-name');
  const candRole = document.querySelector('.screener-cand-role');
  const scoreInner = document.querySelector('.score-circle-inner');
  const scoreCircle = document.querySelector('.score-circle');
  const candSummary = document.querySelector('.screener-cand-summary');

  const candidateData = {
    sap: {
      name: "Priya Sharma - Lead SAP S/4HANA Architect",
      role: "SAP S/4HANA Migration & Clean Core Lead",
      score: "96%",
      deg: "345deg",
      summary: "14+ years in complex Greenfield S/4HANA rollouts across manufacturing and global retail. Certified in S/4HANA 2023, Clean Core architecture, and BTP.",
      skills: [98, 95, 92, 97]
    },
    cloud: {
      name: "Rahul Verma - Senior Cloud & Full-Stack Architect",
      role: "AWS / Kubernetes / Microservices Tech Lead",
      score: "94%",
      deg: "338deg",
      summary: "11+ years leading high-throughput distributed systems in Node.js, Python, and React. Extensive production experience with EKS, Terraform, and CI/CD.",
      skills: [96, 92, 94, 95]
    },
    supply: {
      name: "Anita Desai - Supply Chain & Logistics Strategist",
      role: "S&OP Planning & Procure-to-Pay (P2P) Lead",
      score: "91%",
      deg: "328deg",
      summary: "12+ years optimizing global supply chain logistics, demand forecasting, multi-echelon inventory safety stocks, and warehouse fulfillment automation.",
      skills: [93, 89, 94, 90]
    }
  };

  if (candidateBtns.length && candName && scoreInner && scoreCircle) {
    candidateBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        candidateBtns.forEach(b => {
          b.classList.remove('active');
          b.classList.remove('btn-primary');
          b.classList.add('btn-outline');
        });
        btn.classList.add('active');
        btn.classList.remove('btn-outline');
        btn.classList.add('btn-primary');

        const key = btn.getAttribute('data-candidate');
        const data = candidateData[key];
        if (data) {
          candName.textContent = data.name;
          if (candRole) candRole.textContent = data.role;
          scoreInner.textContent = data.score;
          scoreCircle.style.background = `conic-gradient(var(--teal) 0% ${data.score}, #162f4d ${data.score} 100%)`;
          if (candSummary) candSummary.textContent = data.summary;

          const progressFills = document.querySelectorAll('.progress-fill');
          progressFills.forEach((fill, index) => {
            if (data.skills[index]) {
              fill.style.width = data.skills[index] + '%';
            }
          });
        }
      });
    });
  }

  // Dynamic Contact Form Routing (index.html)
  const inquiryCategory = document.getElementById('inquiryCategory');
  const channelNotice = document.getElementById('channelNotice');
  const mainContactForm = document.getElementById('mainContactForm');
  const formStatus = document.getElementById('formStatus');

  if (inquiryCategory && channelNotice) {
    inquiryCategory.addEventListener('change', () => {
      const val = inquiryCategory.value;
      if (val === 'talent' || val === 'careers') {
        channelNotice.innerHTML = '📌 <strong>Routing Desk:</strong> ProCXel Recruitment Consultancy (<span style="color:var(--pink); font-weight:700;">info@procxel.com</span>)';
      } else {
        channelNotice.innerHTML = '📌 <strong>Routing Desk:</strong> Technology & SAP Advisory (<span style="color:var(--teal); font-weight:700;">info@prowessbridgetech.com</span>)';
      }
    });
  }

  if (mainContactForm && formStatus) {
    mainContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = mainContactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Transmitting Enquiry...';
      }
      setTimeout(() => {
        formStatus.className = 'form-status success';
        formStatus.innerHTML = '✓ Thank you! Your enquiry has been routed to our advisory team. We will respond within 24 hours.';
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Transmit Enquiry ↗';
        }
        mainContactForm.reset();
      }, 1000);
    });
  }

  // ============================================================
  // CAREERS PAGE: SEARCH, FILTERS & APPLICATION MODAL
  // ============================================================
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
      countDisplay.textContent = `Showing ${visibleCount} Active Opening${visibleCount === 1 ? '' : 's'}`;
    }
  }

  searchInput?.addEventListener('input', filterJobs);
  deptFilter?.addEventListener('change', filterJobs);
  locFilter?.addEventListener('change', filterJobs);

  // Application Modal Logic
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

  document.querySelectorAll('.apply-now-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const jobId = btn.getAttribute('data-job-id') || 'PB-TALENT-POOL';
      const jobTitle = btn.getAttribute('data-job-title') || 'General Application';
      openModal(jobId, jobTitle);
    });
  });

  modalCloseBtn?.addEventListener('click', closeModal);
  closeSuccessBtn?.addEventListener('click', closeModal);

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) closeModal();
  });

  // CV & Cover Letter Upload Handlers
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

  // Application Submission Simulation
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
});
