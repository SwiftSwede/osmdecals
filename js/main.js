// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menu-icon");
const closeIcon = document.getElementById("close-icon");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  menuIcon.classList.toggle("hidden");
  closeIcon.classList.toggle("hidden");
});

document
  .querySelectorAll("#mobile-menu a, #mobile-menu button")
  .forEach((el) => {
    el.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
    });
  });

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const target = document.querySelector(targetId);
    if (target) {
      const navHeight = document.getElementById("navbar").offsetHeight;
      const targetPosition =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Active nav state on scroll
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

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

/* ===== Product Checkbox Expand/Collapse ===== */
document.querySelectorAll(".product-checkbox").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const targetId = checkbox.getAttribute("data-target");
    const details = document.getElementById(targetId);
    if (!details) return;
    details.classList.toggle("open", checkbox.checked);
  });
});

/* ===== Modal System ===== */

let activeModal = null;

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  activeModal = modal;
  document.body.classList.add("modal-open");

  const form = modal.querySelector(".modal-form");
  const success = modal.querySelector(".success-message");
  if (form) form.classList.remove("hidden");
  if (success) success.classList.add("hidden");

  modal.style.display = "flex";
  requestAnimationFrame(() => {
    modal.classList.add("active");
  });
}

function closeModal(id) {
  const modal = id ? document.getElementById(id) : activeModal;
  if (!modal) return;

  modal.classList.remove("active");
  setTimeout(() => {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
    activeModal = null;
  }, 300);
}

document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal(backdrop.id);
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && activeModal) {
    closeModal(activeModal.id);
  }
});

document.querySelectorAll(".modal-form").forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending\u2026";

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
      } else {
        throw new Error("Form submission failed");
      }
    } catch (err) {
      alert(
        "Something went wrong. Please try again or email us directly at sales@osmdecals.ca",
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
});
