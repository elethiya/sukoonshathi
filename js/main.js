// ==========================================
// Sukoon Saathi — Main Application Script
// ==========================================

// ---------- Config: Unified Google Apps Script Web App URL ----------
// Single Google Sheet Web App URL for Orders, Bookings, and Contact forms
window.SUKOON_SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbya4XxtryHc7s9ej222hsiKMGGcAQJ2CSFL_lvkVAwSs4m5lw7Lem1YAE8W_dj-uVi7/exec";
const SHEET_ENDPOINT = window.SUKOON_SHEET_ENDPOINT;

document.addEventListener("DOMContentLoaded", () => {
  // ---------- Page routing ----------
  const pages = document.querySelectorAll(".page");
  const navLinks = document.querySelectorAll("[data-nav]");
  const menuOverlay = document.getElementById("menuOverlay");
  const menuOpenBtn = document.getElementById("menuOpenBtn");
  const menuCloseBtn = document.getElementById("menuCloseBtn");

  let updateAllSpecialistCarousels = () => {};

  function showPage(name) {
    pages.forEach((p) => p.classList.toggle("active", p.id === "page-" + name));
    navLinks.forEach((link) => {
      const target = link.getAttribute("data-nav");
      link.classList.toggle("active", target === name);
    });
    window.scrollTo({
      top: 0,
      behavior: "instant" in document.documentElement.style ? "instant" : "auto",
    });
    updateAllSpecialistCarousels();
  }

  function routeFromHash() {
    const hash = (location.hash || "#home").replace("#", "");
    const valid = ["home", "about", "contact", "products", "book"];
    showPage(valid.includes(hash) ? hash : "home");
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("data-nav");
      location.hash = target === "home" ? "" : target;
      showPage(target);
      closeMenu();
    });
  });

  window.addEventListener("hashchange", routeFromHash);
  routeFromHash();

  // ---------- Global Floating Window Scroll Lock Helpers ----------
  window.lockBodyScroll = function () {
    document.documentElement.classList.add("modal-open");
    document.body.classList.add("modal-open");
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  };

  window.unlockBodyScroll = function () {
    requestAnimationFrame(() => {
      const hasOpenModal = document.querySelector(
        ".pdp-modal-overlay.open, .checkout-modal-overlay.open, .cart-drawer-overlay.open, .wishlist-modal-overlay.open, #menuOverlay.open"
      );
      if (!hasOpenModal) {
        document.documentElement.classList.remove("modal-open");
        document.body.classList.remove("modal-open");
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }
    });
  };

  // Prevent background scroll bleed when scrolling or dragging directly over modal overlays
  const backdropOverlayIds = [
    "pdpModalOverlay",
    "checkoutModalOverlay",
    "cartDrawerOverlay",
    "wishlistModalOverlay",
    "menuOverlay",
  ];

  backdropOverlayIds.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const preventBackdropScroll = (e) => {
      // If cursor/finger is directly on the overlay or a non-scrollable area inside it
      const scrollable = e.target.closest(
        ".checkout-modal-body, .checkout-flow-column, .checkout-summary-column, .cart-drawer-body, .pdp-modal-container, .wishlist-drawer-body"
      );
      // For menu overlay, the overlay itself is the scrollable container
      if (id === "menuOverlay") return;

      if (!scrollable) {
        if (e.cancelable) e.preventDefault();
      }
    };

    el.addEventListener("wheel", preventBackdropScroll, { passive: false });
    el.addEventListener("touchmove", preventBackdropScroll, { passive: false });
  });

  // ---------- Fullscreen menu ----------
  function openMenu() {
    if (!menuOverlay) return;
    menuOverlay.classList.add("open");
    menuOverlay.setAttribute("aria-hidden", "false");
    menuOpenBtn?.setAttribute("aria-expanded", "true");
    window.lockBodyScroll();
  }

  function closeMenu() {
    if (!menuOverlay) return;
    menuOverlay.classList.remove("open");
    menuOverlay.setAttribute("aria-hidden", "true");
    menuOpenBtn?.setAttribute("aria-expanded", "false");
    window.unlockBodyScroll();
  }

  menuOpenBtn?.addEventListener("click", openMenu);
  menuCloseBtn?.addEventListener("click", closeMenu);
  menuOverlay?.addEventListener("click", (e) => {
    if (e.target === menuOverlay) closeMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // ---------- Footer year ----------
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---------- Form submission to Google Sheet ----------
  async function handleFormSubmit(formEl, statusEl, formType) {
    if (!formEl || !statusEl) return;

    formEl.addEventListener("submit", async (e) => {
      e.preventDefault();
      statusEl.className = "form-status";
      const submitBtn = formEl.querySelector(".submit-btn");
      const originalText = submitBtn ? submitBtn.textContent : "Submit";

      if (SHEET_ENDPOINT.includes("PASTE_YOUR")) {
        statusEl.textContent = "Form is not yet connected to Google Sheets. Add your Apps Script URL in the code.";
        statusEl.classList.add("show", "err");
        return;
      }

      if (!formEl.checkValidity()) {
        formEl.reportValidity();
        return;
      }

      const data = Object.fromEntries(new FormData(formEl).entries());
      data.form_type = formType;
      data.submitted_at = new Date().toISOString();
      if (formType === "book") {
        data.bookingId = "BK-" + Math.floor(10000 + Math.random() * 90000);
      } else {
        data.inquiryId = "INQ-" + Math.floor(10000 + Math.random() * 90000);
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }

      try {
        await fetch(SHEET_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(data),
        });

        statusEl.textContent =
          formType === "book"
            ? `Thank you, ${data.name || "friend"}! Your session request (${data.bookingId}) has been received. A confirmation has been sent to your email and our care team will contact you shortly.`
            : `Thank you, ${data.name || "friend"}! Your message (${data.inquiryId}) has been sent. A confirmation copy has been sent to your email and we'll reply soon.`;
        statusEl.classList.add("show", "ok");
        formEl.reset();
      } catch (err) {
        statusEl.textContent = "Something went wrong. Please try again in a moment.";
        statusEl.classList.add("show", "err");
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      }
    });
  }

  handleFormSubmit(document.getElementById("contactForm"), document.getElementById("contactStatus"), "contact");
  handleFormSubmit(document.getElementById("bookForm"), document.getElementById("bookStatus"), "book");

  // ---------- About Us Dynamic Content (data/about.json) ----------
  function getAboutIconSvg(icon) {
    if (icon === "lock") {
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;
    }
    if (icon === "clock") {
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;
    }
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>`;
  }

  async function loadAboutContent() {
    const aboutHeader = document.getElementById("aboutHeader");
    const aboutGrid = document.getElementById("aboutGrid");
    const teamHeader = document.getElementById("aboutTeamHeaderText");
    if (!aboutHeader && !aboutGrid) return;

    try {
      const res = await fetch("data/about.json?v=" + Date.now());
      if (!res.ok) throw new Error("Status " + res.status);
      const data = await res.json();

      if (aboutHeader && data.header) {
        aboutHeader.innerHTML = `
          <span class="eyebrow-line">${data.header.eyebrow}</span>
          <h1>${data.header.title}</h1>
          <p>${data.header.subtitle}</p>
        `;
      }

      if (aboutGrid) {
        const storyHtml = (data.story || []).map((p) => `<p>${p}</p>`).join("");
        const statsHtml = (data.stats || [])
          .map(
            (s) => `
          <div class="stat"><span class="num">${s.number}</span><span class="cap">${s.label}</span></div>
        `
          )
          .join("");

        const valuesHtml = (data.values || [])
          .map(
            (v) => `
          <li>
            <span class="mini-heart" aria-hidden="true">
              ${getAboutIconSvg(v.icon)}
            </span>
            <div>
              <h3>${v.title}</h3>
              <p>${v.description}</p>
            </div>
          </li>
        `
          )
          .join("");

        aboutGrid.innerHTML = `
          <div class="about-copy">
            ${storyHtml}
            <div class="stat-row">
              ${statsHtml}
            </div>
          </div>
          <ul class="value-list">
            ${valuesHtml}
          </ul>
        `;
      }

      if (teamHeader && data.teamSection) {
        teamHeader.innerHTML = `
          <span class="eyebrow-line">${data.teamSection.eyebrow}</span>
          <h2 id="aboutSpecialistsHeading" class="specialists-title">${data.teamSection.title}</h2>
          <p class="specialists-subtitle">${data.teamSection.subtitle}</p>
        `;
      }
    } catch (err) {
      console.warn("Could not load data/about.json:", err);
    }
  }

  // ---------- Specialists Dynamic Content (data/specialists.json) ----------
  function createSpecialistCardHtml(s) {
    return `
      <article class="specialist-card">
        <div class="specialist-header-row">
          <div class="specialist-avatar-wrap">
            <img src="${s.avatar}" alt="${s.name}" class="specialist-avatar" loading="lazy">
          </div>
          <div class="specialist-identity">
            <h3 class="specialist-name">${s.name}</h3>
            <p class="specialist-role">${s.role}</p>
            <span class="specialist-reg">${s.registration}</span>
          </div>
        </div>

        <div class="specialist-footer">
          <a href="#book" class="btn-book-specialist" data-specialist-pref="${s.bookingPref}">
            <span>Book Session</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </article>
    `;
  }

  async function loadSpecialists() {
    const homeTrack = document.getElementById("homeSpecialistsTrack");
    const aboutTrack = document.getElementById("aboutSpecialistsTrack");

    try {
      const res = await fetch("data/specialists.json?v=" + Date.now());
      if (!res.ok) throw new Error("Status " + res.status);
      const specialists = await res.json();

      if (Array.isArray(specialists) && specialists.length > 0) {
        const cardsHtml = specialists.map(createSpecialistCardHtml).join("");
        if (homeTrack) homeTrack.innerHTML = cardsHtml;
        if (aboutTrack) aboutTrack.innerHTML = cardsHtml;
      }
    } catch (err) {
      console.warn("Could not load data/specialists.json:", err);
    }

    initSpecialistsCarousels();
  }

  // ---------- Specialists Side-by-Side Carousels & Booking Integration ----------
  function initSpecialistsCarousels() {
    const updateFns = [];

    document.querySelectorAll(".specialists-section").forEach((section) => {
      const track = section.querySelector(".specialists-track");
      const prevBtn = section.querySelector(".spec-nav-btn.prev");
      const nextBtn = section.querySelector(".spec-nav-btn.next");
      if (!track) return;

      const getScrollDistance = () => {
        const firstCard = track.querySelector(".specialist-card");
        if (firstCard) {
          const gap = parseFloat(window.getComputedStyle(track).gap) || 22;
          return firstCard.offsetWidth + gap;
        }
        return 330;
      };

      const updateNavBtnStates = () => {
        if (!prevBtn || !nextBtn) return;
        const maxScroll = track.scrollWidth - track.clientWidth - 5;
        const current = track.scrollLeft;
        prevBtn.style.opacity = current <= 5 ? "0.38" : "1";
        prevBtn.style.cursor = current <= 5 ? "default" : "pointer";
        nextBtn.style.opacity = current >= maxScroll ? "0.38" : "1";
        nextBtn.style.cursor = current >= maxScroll ? "default" : "pointer";
      };

      prevBtn?.addEventListener("click", () => {
        track.scrollBy({ left: -getScrollDistance(), behavior: "smooth" });
      });

      nextBtn?.addEventListener("click", () => {
        track.scrollBy({ left: getScrollDistance(), behavior: "smooth" });
      });

      // ---------- Desktop Mouse Grab & Move Left / Right ----------
      let isDown = false;
      let startX = 0;
      let scrollStart = 0;
      let hasDragged = false;
      let lastX = 0;
      let lastTime = 0;
      let velocity = 0;

      // Prevent native HTML5 drag on child images / links
      track.querySelectorAll("img, a").forEach((el) => {
        el.addEventListener("dragstart", (e) => e.preventDefault());
      });

      track.addEventListener("mousedown", (e) => {
        if (e.button !== 0) return; // left click only
        isDown = true;
        hasDragged = false;
        startX = e.pageX;
        scrollStart = track.scrollLeft;
        lastX = e.pageX;
        lastTime = performance.now();
        velocity = 0;
      });

      window.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        const dx = e.pageX - startX;
        if (Math.abs(dx) > 4) {
          hasDragged = true;
          track.classList.add("is-dragging");
        }
        if (hasDragged) {
          e.preventDefault();
          track.scrollLeft = scrollStart - dx;

          const now = performance.now();
          const dt = now - lastTime;
          if (dt > 8) {
            velocity = (e.pageX - lastX) / dt;
            lastX = e.pageX;
            lastTime = now;
          }
        }
      });

      window.addEventListener("mouseup", () => {
        if (!isDown) return;
        isDown = false;
        if (hasDragged) {
          track.classList.remove("is-dragging");
          // Natural momentum glide if mouse was moving when released
          if (Math.abs(velocity) > 0.15) {
            const glide = -velocity * 180;
            track.scrollBy({ left: glide, behavior: "smooth" });
          }
          // Delay clearing hasDragged so click event on child doesn't fire
          setTimeout(() => {
            hasDragged = false;
          }, 80);
        }
      });

      // Capture phase click handler to block accidental clicks when dragged
      track.addEventListener(
        "click",
        (e) => {
          if (hasDragged) {
            e.preventDefault();
            e.stopPropagation();
          }
        },
        true
      );

      track.addEventListener("scroll", updateNavBtnStates, { passive: true });
      updateFns.push(updateNavBtnStates);
    });

    updateAllSpecialistCarousels = () => {
      requestAnimationFrame(() => {
        updateFns.forEach((fn) => fn());
      });
    };

    window.addEventListener("resize", updateAllSpecialistCarousels, { passive: true });
    setTimeout(updateAllSpecialistCarousels, 150);

    // Wire specialist booking buttons
    document.querySelectorAll(".btn-book-specialist").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const pref = btn.getAttribute("data-specialist-pref") || "";
        location.hash = "book";
        showPage("book");

        const notesField = document.getElementById("b-notes");
        if (notesField && pref) {
          const prefNote = `Preferred Specialist: ${pref}`;
          if (!notesField.value.includes(prefNote)) {
            notesField.value = notesField.value.trim()
              ? `${prefNote}\n${notesField.value.trim()}`
              : prefNote;
          }
        }

        const bookPage = document.getElementById("page-book");
        if (bookPage) {
          bookPage.scrollIntoView({ behavior: "smooth", block: "start" });
          setTimeout(() => {
            document.getElementById("b-name")?.focus();
          }, 350);
        }
      });
    });
  }

  // ==========================================
  // Mindful Breathing Meditation Engine
  // ==========================================
  function initMindfulBreathing() {
    const section = document.getElementById("meditationSection");
    if (!section) return;

    const playBtn = document.getElementById("meditationPlayBtn");
    const playBtnText = document.getElementById("playBtnText");
    const playIcon = playBtn?.querySelector(".play-icon");
    const pauseIcon = playBtn?.querySelector(".pause-icon");
    const resetBtn = document.getElementById("meditationResetBtn");
    const soundBtn = document.getElementById("meditationSoundBtn");
    const soundLabel = document.getElementById("soundLabel");
    const soundIconOn = soundBtn?.querySelector(".sound-icon-on");
    const soundIconOff = soundBtn?.querySelector(".sound-icon-off");

    const visualWrap = section.querySelector(".meditation-visual-wrap");
    const bubble = document.getElementById("meditationBubble");
    const phaseEl = document.getElementById("bubblePhase");
    const countdownEl = document.getElementById("bubbleCountdown");
    const promptEl = document.getElementById("bubblePrompt");
    const progressBar = document.getElementById("meditationProgressBar");
    const breathsCountEl = document.getElementById("breathsCount");
    const modeBtns = section.querySelectorAll(".meditation-mode-btn");

    const CIRCUMFERENCE = 2 * Math.PI * 126; // ~791.68px
    if (progressBar) {
      progressBar.style.strokeDasharray = `${CIRCUMFERENCE}`;
      progressBar.style.strokeDashoffset = `${CIRCUMFERENCE}`;
    }

    // Breathing Patterns
    const MODES = {
      calm: {
        name: "Calm Flow",
        phases: [
          { name: "Inhale", type: "inhale", duration: 4, prompt: "Breathe in deeply through your nose", scale: 1.34 },
          { name: "Exhale", type: "exhale", duration: 4, prompt: "Release gently, let shoulders soften", scale: 0.84 }
        ]
      },
      box: {
        name: "Box Breathing",
        phases: [
          { name: "Inhale", type: "inhale", duration: 4, prompt: "Fill your lungs steadily", scale: 1.34 },
          { name: "Hold", type: "hold", duration: 4, prompt: "Hold softly, remain centered", scale: 1.34 },
          { name: "Exhale", type: "exhale", duration: 4, prompt: "Release slowly and completely", scale: 0.84 },
          { name: "Rest", type: "hold", duration: 4, prompt: "Rest in quiet stillness", scale: 0.84 }
        ]
      },
      relax: {
        name: "Deep Sleep 4-7-8",
        phases: [
          { name: "Inhale", type: "inhale", duration: 4, prompt: "Breathe in quiet tranquility", scale: 1.34 },
          { name: "Hold", type: "hold", duration: 7, prompt: "Retain the breath with ease", scale: 1.34 },
          { name: "Exhale", type: "exhale", duration: 8, prompt: "Sigh out tension through your mouth", scale: 0.84 }
        ]
      }
    };

    let currentModeKey = "calm";
    let isRunning = false;
    let isSoundEnabled = true;
    let currentPhaseIndex = 0;
    let phaseTimeRemaining = 4;
    let phaseTotalDuration = 4;
    let totalCompletedBreaths = 0;
    let animationTimer = null;
    let audioCtx = null;

    // Web Audio Chime generator
    function playChime(freq = 432, duration = 1.4, gainLevel = 0.07) {
      if (!isSoundEnabled) return;
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        if (!audioCtx) {
          audioCtx = new AudioContextClass();
        }
        if (audioCtx.state === "suspended") {
          audioCtx.resume();
        }

        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const harmonicOsc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1400, now);

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        harmonicOsc.type = "sine";
        harmonicOsc.frequency.setValueAtTime(freq * 1.5, now);

        gainNode.gain.setValueAtTime(0.0001, now);
        gainNode.gain.exponentialRampToValueAtTime(gainLevel, now + 0.08);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gainNode);
        harmonicOsc.connect(gainNode);
        gainNode.connect(filter);
        filter.connect(audioCtx.destination);

        osc.start(now);
        harmonicOsc.start(now);
        osc.stop(now + duration + 0.1);
        harmonicOsc.stop(now + duration + 0.1);
      } catch (err) {
        // Audio policy or unsupported: fail silently
      }
    }

    function setPhaseUI(phase, initial = false) {
      if (!bubble || !phaseEl || !countdownEl || !promptEl) return;

      phaseEl.textContent = phase.name;
      countdownEl.textContent = `${Math.ceil(phaseTimeRemaining)}s`;
      promptEl.textContent = phase.prompt;

      if (visualWrap) {
        visualWrap.classList.remove("is-inhale", "is-hold", "is-exhale");
      }
      bubble.classList.remove("phase-inhale", "phase-hold", "phase-exhale");

      if (phase.type === "inhale") {
        if (visualWrap) visualWrap.classList.add("is-inhale");
        bubble.classList.add("phase-inhale");
        if (progressBar) progressBar.style.stroke = "var(--gold)";
        if (!initial) playChime(432, 1.6, 0.08);
      } else if (phase.type === "hold") {
        if (visualWrap) visualWrap.classList.add("is-hold");
        bubble.classList.add("phase-hold");
        if (progressBar) progressBar.style.stroke = "rgba(245, 238, 225, 0.7)";
        if (!initial) playChime(528, 1.2, 0.06);
      } else if (phase.type === "exhale") {
        if (visualWrap) visualWrap.classList.add("is-exhale");
        bubble.classList.add("phase-exhale");
        if (progressBar) progressBar.style.stroke = "#549989";
        if (!initial) playChime(360, 1.8, 0.07);
      }

      if (isRunning) {
        bubble.style.transition = `transform ${phaseTotalDuration}s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.6s ease, border-color 0.4s ease`;
        bubble.style.transform = `scale(${phase.scale})`;
      } else {
        bubble.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
        bubble.style.transform = "scale(1)";
      }
    }

    function updateProgress(fraction) {
      if (!progressBar) return;
      const offset = CIRCUMFERENCE * (1 - fraction);
      progressBar.style.strokeDashoffset = `${offset}`;
    }

    function tick() {
      if (!isRunning) return;

      phaseTimeRemaining -= 0.1;
      if (phaseTimeRemaining <= 0) {
        const phases = MODES[currentModeKey].phases;
        currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;

        if (currentPhaseIndex === 0) {
          totalCompletedBreaths++;
          if (breathsCountEl) {
            breathsCountEl.textContent = totalCompletedBreaths;
            breathsCountEl.style.transform = "scale(1.3)";
            setTimeout(() => {
              breathsCountEl.style.transform = "scale(1)";
            }, 300);
          }
        }

        const nextPhase = phases[currentPhaseIndex];
        phaseTotalDuration = nextPhase.duration;
        phaseTimeRemaining = nextPhase.duration;

        setPhaseUI(nextPhase);
        updateProgress(0);
      } else {
        if (countdownEl) {
          countdownEl.textContent = `${Math.ceil(phaseTimeRemaining)}s`;
        }
        const fraction = Math.max(0, Math.min(1, (phaseTotalDuration - phaseTimeRemaining) / phaseTotalDuration));
        updateProgress(fraction);
      }
    }

    function startBreathing() {
      if (isRunning) return;
      isRunning = true;

      if (playBtnText) playBtnText.textContent = "Pause Session";
      if (playIcon) playIcon.style.display = "none";
      if (pauseIcon) pauseIcon.style.display = "block";

      const currentPhase = MODES[currentModeKey].phases[currentPhaseIndex];
      setPhaseUI(currentPhase);

      clearInterval(animationTimer);
      animationTimer = setInterval(tick, 100);
    }

    function pauseBreathing() {
      if (!isRunning) return;
      isRunning = false;

      if (playBtnText) playBtnText.textContent = "Resume Inhale";
      if (playIcon) playIcon.style.display = "block";
      if (pauseIcon) pauseIcon.style.display = "none";

      clearInterval(animationTimer);

      const computedScale = window.getComputedStyle(bubble).transform;
      if (computedScale && computedScale !== "none") {
        bubble.style.transition = "none";
        bubble.style.transform = computedScale;
      }
    }

    function resetBreathing(full = false) {
      pauseBreathing();
      currentPhaseIndex = 0;
      const initialPhase = MODES[currentModeKey].phases[0];
      phaseTotalDuration = initialPhase.duration;
      phaseTimeRemaining = initialPhase.duration;

      if (playBtnText) playBtnText.textContent = "Begin Inhale";
      if (playIcon) playIcon.style.display = "block";
      if (pauseIcon) pauseIcon.style.display = "none";

      if (visualWrap) {
        visualWrap.classList.remove("is-inhale", "is-hold", "is-exhale");
      }
      bubble.classList.remove("phase-inhale", "phase-hold", "phase-exhale");
      bubble.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
      bubble.style.transform = "scale(1)";

      if (phaseEl) phaseEl.textContent = initialPhase.name;
      if (countdownEl) countdownEl.textContent = `${initialPhase.duration}s`;
      if (promptEl) promptEl.textContent = initialPhase.prompt;

      if (progressBar) {
        progressBar.style.strokeDashoffset = `${CIRCUMFERENCE}`;
      }

      if (full && breathsCountEl) {
        totalCompletedBreaths = 0;
        breathsCountEl.textContent = "0";
      }
    }

    playBtn?.addEventListener("click", () => {
      if (isRunning) {
        pauseBreathing();
      } else {
        startBreathing();
      }
    });

    resetBtn?.addEventListener("click", () => {
      resetBreathing(true);
    });

    soundBtn?.addEventListener("click", () => {
      isSoundEnabled = !isSoundEnabled;
      if (soundLabel) {
        soundLabel.textContent = isSoundEnabled ? "Chime: On" : "Chime: Off";
      }
      if (soundIconOn) soundIconOn.style.display = isSoundEnabled ? "block" : "none";
      if (soundIconOff) soundIconOff.style.display = isSoundEnabled ? "none" : "block";

      if (isSoundEnabled) {
        playChime(528, 0.8, 0.08);
      }
    });

    modeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const mode = btn.getAttribute("data-mode");
        if (!mode || !MODES[mode]) return;

        modeBtns.forEach((b) => {
          const isSelected = b === btn;
          b.classList.toggle("active", isSelected);
          b.setAttribute("aria-selected", isSelected ? "true" : "false");
        });

        currentModeKey = mode;
        const wasRunning = isRunning;
        resetBreathing(false);
        if (wasRunning) {
          startBreathing();
        }
      });
    });

    window.addEventListener("hashchange", () => {
      const hash = (location.hash || "").replace("#", "");
      if (hash && hash !== "home") {
        pauseBreathing();
      }
    });

    resetBreathing(false);
  }

  // ==========================================
  // Background Ambient Music System
  // ==========================================
  function initBackgroundMusic() {
    const audio = document.getElementById("bgMusicAudio");
    const widget = document.getElementById("bgMusicWidget");
    if (!audio || !widget) return;

    const toggleBtn = document.getElementById("bgMusicToggleBtn");
    const stateIcon = document.getElementById("bgMusicStateIcon");
    const labelEl = document.getElementById("bgMusicLabel");
    const iconPause = stateIcon?.querySelector(".icon-pause");
    const iconPlay = stateIcon?.querySelector(".icon-play");
    const topbarMusicBtn = document.getElementById("topbarMusicBtn");
    const topbarMusicText = document.getElementById("topbarMusicText");
    const menuMusicToggle = document.getElementById("menuMusicToggle");
    const menuMusicText = document.getElementById("menuMusicText");

    const promptEl = document.getElementById("bgMusicPrompt");
    const promptClose = document.getElementById("bgMusicPromptClose");

    const settingsBtn = document.getElementById("bgMusicSettingsBtn");
    const card = document.getElementById("bgMusicCard");
    const cardCloseBtn = document.getElementById("bgMusicCardCloseBtn");
    const cardTrackTitle = document.getElementById("cardTrackTitle");
    const cardTrackSub = document.getElementById("cardTrackSub");

    const volSlider = document.getElementById("bgMusicVolSlider");
    const volVal = document.getElementById("bgMusicVolVal");
    const muteBtn = document.getElementById("bgMusicMuteBtn");
    const volIconHigh = muteBtn?.querySelector(".vol-high");
    const volIconMuted = muteBtn?.querySelector(".vol-muted");

    const trackOptionBtns = widget.querySelectorAll(".track-option-btn");

    // State
    let isPlaying = false;
    let currentTrack = "ambient";
    let targetVolume = parseFloat(localStorage.getItem("sukoon_bg_music_vol") || "0.35");
    let previousVolume = targetVolume > 0 ? targetVolume : 0.35;
    let isMuted = false;
    let userPaused = localStorage.getItem("sukoon_bg_music_user_paused") === "true";
    let fadeInterval = null;

    // Web Audio Synthesizer for extra soundscapes
    let webAudioCtx = null;
    let synthNodes = [];
    let synthInterval = null;

    function getAudioContext() {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return null;
      if (!webAudioCtx) {
        webAudioCtx = new AudioContextClass();
      }
      if (webAudioCtx.state === "suspended") {
        webAudioCtx.resume();
      }
      return webAudioCtx;
    }

    function stopSynth() {
      if (synthInterval) {
        clearInterval(synthInterval);
        synthInterval = null;
      }
      synthNodes.forEach((node) => {
        try {
          if (node.stop) node.stop();
          if (node.disconnect) node.disconnect();
        } catch (e) {}
      });
      synthNodes = [];
    }

    function startSynthBowls() {
      stopSynth();
      const ctx = getAudioContext();
      if (!ctx) return;

      const masterGain = ctx.createGain();
      const currentVol = isMuted ? 0 : targetVolume;
      masterGain.gain.setValueAtTime(currentVol * 0.45, ctx.currentTime);
      masterGain.connect(ctx.destination);
      synthNodes.push(masterGain);

      // Warm drone at 216Hz and 432Hz
      const droneOsc = ctx.createOscillator();
      const droneGain = ctx.createGain();
      droneOsc.type = "sine";
      droneOsc.frequency.setValueAtTime(216, ctx.currentTime);
      droneGain.gain.setValueAtTime(0.08, ctx.currentTime);
      droneOsc.connect(droneGain);
      droneGain.connect(masterGain);
      droneOsc.start();
      synthNodes.push(droneOsc, droneGain);

      // Play Tibetan singing bowl strike
      const bowlNotes = [270, 324, 360, 432, 540, 648];
      function playRandomBowl() {
        if (!isPlaying || currentTrack !== "bowls") return;
        const now = ctx.currentTime;
        const freq = bowlNotes[Math.floor(Math.random() * bowlNotes.length)];
        const osc = ctx.createOscillator();
        const oscHarmonic = ctx.createOscillator();
        const bGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1600, now);

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);
        oscHarmonic.type = "sine";
        oscHarmonic.frequency.setValueAtTime(freq * 1.5, now);

        bGain.gain.setValueAtTime(0.0001, now);
        bGain.gain.exponentialRampToValueAtTime(0.22, now + 0.08);
        bGain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);

        osc.connect(bGain);
        oscHarmonic.connect(bGain);
        bGain.connect(filter);
        filter.connect(masterGain);

        osc.start(now);
        oscHarmonic.start(now);
        osc.stop(now + 6.0);
        oscHarmonic.stop(now + 6.0);
      }

      playRandomBowl();
      synthInterval = setInterval(playRandomBowl, 4200);
    }

    function startSynthWaves() {
      stopSynth();
      const ctx = getAudioContext();
      if (!ctx) return;

      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2 + white * 0.5362) * 0.06;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(380, ctx.currentTime);

      const waveGain = ctx.createGain();
      const currentVol = isMuted ? 0 : targetVolume;
      waveGain.gain.setValueAtTime(currentVol * 0.35, ctx.currentTime);

      // Low frequency wave oscillator for ocean breathing swell
      const swellOsc = ctx.createOscillator();
      const swellGain = ctx.createGain();
      swellOsc.frequency.setValueAtTime(0.1, ctx.currentTime); // 10s cycle
      swellGain.gain.setValueAtTime(140, ctx.currentTime);

      swellOsc.connect(filter.frequency);
      whiteNoise.connect(filter);
      filter.connect(waveGain);
      waveGain.connect(ctx.destination);

      whiteNoise.start();
      swellOsc.start();
      synthNodes.push(whiteNoise, swellOsc, filter, waveGain);
    }

    function updateVolumeDisplay(vol) {
      if (volSlider) volSlider.value = vol;
      if (volVal) volVal.textContent = `${Math.round(vol * 100)}%`;
      if (volIconHigh && volIconMuted) {
        if (vol === 0 || isMuted) {
          volIconHigh.style.display = "none";
          volIconMuted.style.display = "block";
        } else {
          volIconHigh.style.display = "block";
          volIconMuted.style.display = "none";
        }
      }
    }

    function fadeAudioTo(targetVol, durationMs = 2000) {
      clearInterval(fadeInterval);
      const startVol = audio.volume;
      const steps = 25;
      const stepTime = durationMs / steps;
      const volStep = (targetVol - startVol) / steps;
      let currentStep = 0;

      fadeInterval = setInterval(() => {
        currentStep++;
        const newVol = Math.max(0, Math.min(1, startVol + volStep * currentStep));
        audio.volume = newVol;
        if (currentStep >= steps) {
          clearInterval(fadeInterval);
          audio.volume = targetVol;
        }
      }, stepTime);
    }

    function setUIState(playing) {
      isPlaying = playing;
      widget.classList.toggle("is-playing", playing);

      if (topbarMusicBtn) {
        topbarMusicBtn.classList.toggle("playing", playing);
        if (topbarMusicText) {
          topbarMusicText.textContent = playing ? "Ambient · Playing" : "Ambient · Paused";
        }
      }

      if (menuMusicToggle) {
        menuMusicToggle.classList.toggle("playing", playing);
        if (menuMusicText) {
          menuMusicText.textContent = playing ? "Ambient Music: Playing" : "Ambient Music: Paused";
        }
      }

      if (labelEl) {
        labelEl.textContent = playing ? "Calm Playing" : "Calm Paused";
      }

      if (iconPause && iconPlay) {
        iconPause.style.display = playing ? "block" : "none";
        iconPlay.style.display = playing ? "none" : "block";
      }

      if (playing) {
        promptEl?.classList.add("hidden");
      }
    }

    function playActiveTrack() {
      const vol = isMuted ? 0 : targetVolume;

      if (currentTrack === "ambient") {
        stopSynth();
        audio.volume = 0.001;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setUIState(true);
              fadeAudioTo(vol, 2500);
            })
            .catch(() => {
              // Blocked by browser autoplay: listen for user gesture
              setUIState(false);
              setupGestureListener();
            });
        }
      } else if (currentTrack === "bowls") {
        audio.pause();
        startSynthBowls();
        setUIState(true);
      } else if (currentTrack === "waves") {
        audio.pause();
        startSynthWaves();
        setUIState(true);
      }
    }

    function pauseActiveTrack() {
      if (currentTrack === "ambient") {
        fadeAudioTo(0, 400);
        setTimeout(() => {
          audio.pause();
          setUIState(false);
        }, 420);
      } else {
        stopSynth();
        setUIState(false);
      }
    }

    function togglePlayback() {
      if (isPlaying) {
        userPaused = true;
        localStorage.setItem("sukoon_bg_music_user_paused", "true");
        pauseActiveTrack();
      } else {
        userPaused = false;
        localStorage.removeItem("sukoon_bg_music_user_paused");
        playActiveTrack();
      }
    }

    function setupGestureListener() {
      if (promptEl) promptEl.classList.remove("hidden");

      const onFirstGesture = () => {
        if (!userPaused) {
          playActiveTrack();
        }
        cleanupListeners();
      };

      const events = ["click", "touchstart", "pointerdown", "keydown", "scroll"];
      function cleanupListeners() {
        events.forEach((ev) => window.removeEventListener(ev, onFirstGesture, { passive: true }));
      }
      events.forEach((ev) => window.addEventListener(ev, onFirstGesture, { passive: true, once: true }));
    }

    // Toggle Button Event
    toggleBtn?.addEventListener("click", togglePlayback);
    topbarMusicBtn?.addEventListener("click", togglePlayback);
    menuMusicToggle?.addEventListener("click", togglePlayback);

    // Prompt Close
    promptClose?.addEventListener("click", (e) => {
      e.stopPropagation();
      promptEl?.classList.add("hidden");
    });

    // Settings Card Open/Close
    settingsBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = card?.classList.toggle("open");
      settingsBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    cardCloseBtn?.addEventListener("click", () => {
      card?.classList.remove("open");
      settingsBtn?.setAttribute("aria-expanded", "false");
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (card?.classList.contains("open") && !widget.contains(e.target)) {
        card.classList.remove("open");
        settingsBtn?.setAttribute("aria-expanded", "false");
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && card?.classList.contains("open")) {
        card.classList.remove("open");
        settingsBtn?.setAttribute("aria-expanded", "false");
      }
    });

    // Volume Slider Event
    volSlider?.addEventListener("input", (e) => {
      const val = parseFloat(e.target.value);
      targetVolume = val;
      isMuted = val === 0;
      localStorage.setItem("sukoon_bg_music_vol", `${val}`);

      if (currentTrack === "ambient") {
        audio.volume = val;
      } else if (synthNodes.length > 0) {
        synthNodes.forEach((node) => {
          if (node instanceof GainNode) {
            node.gain.setValueAtTime(val * 0.45, (webAudioCtx || {}).currentTime || 0);
          }
        });
      }
      updateVolumeDisplay(val);
    });

    // Mute/Unmute Toggle
    muteBtn?.addEventListener("click", () => {
      if (isMuted || targetVolume === 0) {
        isMuted = false;
        targetVolume = previousVolume > 0 ? previousVolume : 0.35;
      } else {
        previousVolume = targetVolume;
        isMuted = true;
        targetVolume = 0;
      }
      localStorage.setItem("sukoon_bg_music_vol", `${targetVolume}`);
      if (currentTrack === "ambient") {
        audio.volume = targetVolume;
      }
      updateVolumeDisplay(targetVolume);
    });

    // Track Selection
    trackOptionBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const trackKey = btn.getAttribute("data-track");
        if (!trackKey || trackKey === currentTrack) return;

        trackOptionBtns.forEach((b) => b.classList.toggle("active", b === btn));
        currentTrack = trackKey;

        if (cardTrackTitle && cardTrackSub) {
          if (trackKey === "ambient") {
            cardTrackTitle.textContent = "Sukoon Waves";
            cardTrackSub.textContent = "Meditative drone & ocean breath (432Hz)";
          } else if (trackKey === "bowls") {
            cardTrackTitle.textContent = "Tibetan Zen Bowls";
            cardTrackSub.textContent = "Harmonic peaceful meditation bells";
          } else if (trackKey === "waves") {
            cardTrackTitle.textContent = "Ocean Tide & Rain";
            cardTrackSub.textContent = "Gentle pink noise & water swells";
          }
        }

        if (isPlaying) {
          playActiveTrack();
        }
      });
    });

    // Initial Volume setup
    updateVolumeDisplay(targetVolume);

    // Initial Autoplay trigger on page entrance
    if (!userPaused) {
      playActiveTrack();
    } else {
      setUIState(false);
    }
  }

  loadAboutContent();
  loadSpecialists();
  initMindfulBreathing();
  initBackgroundMusic();
});
