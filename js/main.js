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

  loadAboutContent();
  loadSpecialists();
});
