const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menu-icon");
const closeIcon = document.getElementById("close-icon");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function setMenuOpen(open) {
  mobileMenu.classList.toggle("hidden", !open);
  menuIcon.classList.toggle("hidden", open);
  closeIcon.classList.toggle("hidden", !open);
  mobileMenuBtn.setAttribute("aria-expanded", open ? "true" : "false");
}

mobileMenuBtn.addEventListener("click", () => {
  setMenuOpen(mobileMenu.classList.contains("hidden"));
});

document.querySelectorAll("#mobile-menu a, #mobile-menu button").forEach((el) => {
  el.addEventListener("click", () => setMenuOpen(false));
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const navHeight = document.getElementById("navbar").offsetHeight;
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset - navHeight;
    window.scrollTo({
      top: targetPosition,
      behavior: reduceMotion.matches ? "auto" : "smooth",
    });
  });
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {
  const scrollPosition = window.scrollY + 100;
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");
    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

document.querySelectorAll(".product-checkbox").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const details = document.getElementById(checkbox.getAttribute("data-target"));
    if (!details) return;
    details.classList.toggle("open", checkbox.checked);
  });
});

let activeModal = null;
let lastFocus = null;
let modalToken = 0;
const pageRegions = ["navbar", "main", "site-footer"];
const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusable(root) {
  return [...root.querySelectorAll(focusableSelector)].filter(
    (el) => el.getClientRects().length > 0,
  );
}

function setPageInert(inert) {
  pageRegions.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.inert = inert;
    if (inert) el.setAttribute("aria-hidden", "true");
    else el.removeAttribute("aria-hidden");
  });
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  const token = ++modalToken;
  if (modal._closeTimer) {
    clearTimeout(modal._closeTimer);
    modal._closeTimer = null;
  }
  lastFocus = document.activeElement;
  activeModal = modal;
  document.body.classList.add("modal-open");

  const form = modal.querySelector(".modal-form");
  const success = modal.querySelector(".success-message");
  const error = modal.querySelector(".form-error");
  if (form) form.classList.remove("hidden");
  if (success) success.classList.add("hidden");
  if (error) error.hidden = true;

  modal.style.display = "flex";
  setPageInert(true);
  requestAnimationFrame(() => {
    if (token !== modalToken) return;
    modal.classList.add("active");
    const focusable = getFocusable(modal);
    const field = focusable.find((el) => el.matches("input, select, textarea"));
    (field || modal).focus();
  });
}

function closeModal(id) {
  const modal = id ? document.getElementById(id) : activeModal;
  if (!modal) return;
  modalToken += 1;
  modal.classList.remove("active");
  const finish = () => {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
    setPageInert(false);
    if (activeModal === modal) activeModal = null;
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    lastFocus = null;
  };
  if (reduceMotion.matches) finish();
  else modal._closeTimer = setTimeout(finish, 300);
}

document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
  if (!backdrop.hasAttribute("tabindex")) backdrop.setAttribute("tabindex", "-1");
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal(backdrop.id);
  });
});

document.addEventListener("keydown", (e) => {
  if (!activeModal || activeModal.style.display === "none") return;
  if (e.key === "Escape") {
    closeModal(activeModal.id);
    return;
  }
  if (e.key !== "Tab") return;
  const nodes = getFocusable(activeModal);
  if (!nodes.length) return;
  const first = nodes[0];
  const last = nodes[nodes.length - 1];
  if (!activeModal.contains(document.activeElement)) {
    e.preventDefault();
    (e.shiftKey ? last : first).focus();
    return;
  }
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});

document.querySelectorAll(".modal-form").forEach((form) => {
  const error = document.createElement("p");
  error.className = "form-error";
  error.setAttribute("role", "alert");
  error.hidden = true;
  form.appendChild(error);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    error.hidden = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        form.classList.add("hidden");
        form
          .closest(".modal-panel")
          .querySelector(".success-message")
          .classList.remove("hidden");
        form.reset();
        document.querySelectorAll(".product-details.open").forEach((details) => {
          if (form.contains(details)) details.classList.remove("open");
        });
      } else {
        throw new Error("Form submission failed");
      }
    } catch (err) {
      error.textContent =
        "The quote did not send. Try again, or email sales@osmdecals.ca.";
      error.hidden = false;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
});

document.querySelectorAll(".choice-apply").forEach((btn) => {
  btn.addEventListener("click", () => {
    const select = document.getElementById("quote-choice");
    const value = btn.getAttribute("data-choice");
    if (select && value) select.value = value;
    const quote = document.getElementById("quote");
    if (!quote) return;
    const navHeight = document.getElementById("navbar")?.offsetHeight || 0;
    const top = quote.getBoundingClientRect().top + window.pageYOffset - navHeight;
    window.scrollTo({
      top,
      behavior: reduceMotion.matches ? "auto" : "smooth",
    });
    if (select) select.focus();
  });
});

document.querySelectorAll(".product-quote-form").forEach((form) => {
  const error = document.createElement("p");
  error.className = "form-error";
  error.setAttribute("role", "alert");
  error.hidden = true;
  form.appendChild(error);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    error.hidden = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Form submission failed");
      form.classList.add("hidden");
      const success = form.parentElement.querySelector(".success-message");
      if (success) success.classList.remove("hidden");
      form.reset();
    } catch (err) {
      error.textContent =
        "The quote did not send. Try again, or email sales@osmdecals.ca.";
      error.hidden = false;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
});
