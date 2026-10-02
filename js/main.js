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

  initSpecialistsCarousels();
});
