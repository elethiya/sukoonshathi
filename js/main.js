// ==========================================
// Sukoon Saathi — Main Application Script
// ==========================================

// ---------- Config: Deployed Google Apps Script Web App URL ----------
const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbya4XxtryHc7s9ej222hsiKMGGcAQJ2CSFL_lvkVAwSs4m5lw7Lem1YAE8W_dj-uVi7/exec";

document.addEventListener("DOMContentLoaded", () => {
  // ---------- Page routing ----------
  const pages = document.querySelectorAll(".page");
  const navLinks = document.querySelectorAll("[data-nav]");
  const menuOverlay = document.getElementById("menuOverlay");
  const menuOpenBtn = document.getElementById("menuOpenBtn");
  const menuCloseBtn = document.getElementById("menuCloseBtn");

  function showPage(name) {
    pages.forEach((p) => p.classList.toggle("active", p.id === "page-" + name));
    window.scrollTo({
      top: 0,
      behavior: "instant" in document.documentElement.style ? "instant" : "auto",
    });
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

  // ---------- Fullscreen menu ----------
  function openMenu() {
    if (!menuOverlay) return;
    menuOverlay.classList.add("open");
    menuOverlay.setAttribute("aria-hidden", "false");
    menuOpenBtn?.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    if (!menuOverlay) return;
    menuOverlay.classList.remove("open");
    menuOverlay.setAttribute("aria-hidden", "true");
    menuOpenBtn?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
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
            ? "Thank you — your session request has been received. We'll confirm shortly."
            : "Thank you — your message has been sent. We'll get back to you soon.";
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
});
