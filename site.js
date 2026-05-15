// ================================================================
//  site.js  —  Unified JavaScript for The Portfolio
//  Handles: nav active state, mobile menu, contact form,
//           scroll animations, book-spine nav (index),
//           project detail back/home buttons,
//           + minimalistic animation enhancements
// ================================================================

// ── Page map: filename → nav label text ──────────────────────────
const PAGE_NAV_MAP = {
  "index.html":          "Home",
  "":                    "Home",
  "about_me.html":       "About Me",
  "skills.html":         "Skills",
  "projects.html":       "Projects",
  "project_detail.html": "Projects",
  "resume.html":         "Resume",
  "contact.html":        "Contact",
};

// ── Nav icon fill override map ────────────────────────────────────
const NAV_ICONS = {
  "Home":     "home",
  "About Me": "person",
  "Skills":   "psychology",
  "Projects": "work",
  "Resume":   "description",
  "Contact":  "mail",
};

// ================================================================
//  DOMContentLoaded — bootstrap all features
// ================================================================
document.addEventListener("DOMContentLoaded", () => {
  injectScrollProgressBar();
  wireNavLinks();
  updateActiveNav();
  setupMobileMenu();
  setupContactForm();
  setupScrollAnimations();
  setupBookSpines();
  setupDynamicProjectNav();
  setupSmoothScroll();
  setupPageTransitions();
  setupProfileFloat();
});

// ================================================================
//  ANIMATION EXTRAS
// ================================================================

// ── Scroll progress bar ──────────────────────────────────────────
function injectScrollProgressBar() {
  const bar = document.createElement("div");
  bar.id = "scroll-progress";
  document.body.prepend(bar);

  window.addEventListener("scroll", () => {
    const scrollTop  = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollable = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress   = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;
    bar.style.width  = progress + "%";
  }, { passive: true });
}

// ── Smooth page-exit transition ──────────────────────────────────
function setupPageTransitions() {
  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");

    // Skip external links, anchors, and javascript: links
    if (!href || href.startsWith("#") || href.startsWith("http") ||
        href.startsWith("mailto") || href.startsWith("tel") ||
        href.startsWith("javascript")) return;

    link.addEventListener("click", (e) => {
      // Only intercept plain left-clicks with no modifier
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

      e.preventDefault();
      const target = link.getAttribute("href");

      document.body.classList.add("page-leaving");
      setTimeout(() => { window.location.href = target; }, 230);
    });
  });
}

// ── Float animation on main profile image ────────────────────────
function setupProfileFloat() {
  // Target the large hero profile image (first big rounded image in main)
  const heroImg = document.querySelector("main article img, main section img");
  if (heroImg) {
    heroImg.closest("div")?.classList.add("profile-float");
  }
}

// ================================================================
//  1. Wire up nav links (replace # hrefs with real paths)
// ================================================================
function wireNavLinks() {
  const hrefMap = {
    "Home":     "index.html",
    "About Me": "about_me.html",
    "Skills":   "skills.html",
    "Projects": "projects.html",
    "Resume":   "resume.html",
    "Contact":  "contact.html",
  };

  document.querySelectorAll("nav a, aside nav a").forEach((link) => {
    const label = link.querySelector(".font-label-md, [class*='label-md']")?.textContent?.trim();
    if (label && hrefMap[label] && (link.getAttribute("href") === "#" || !link.getAttribute("href"))) {
      link.setAttribute("href", hrefMap[label]);
    }
  });

  document.querySelectorAll("aside .bg-secondary a, nav .bg-secondary a").forEach((btn) => {
    if (btn.getAttribute("href") === "#") btn.setAttribute("href", "index.html");
  });
}

// ================================================================
//  2. Active nav highlight
// ================================================================
function updateActiveNav() {
  const currentFile = window.location.pathname.split("/").pop() || "";
  const activeLabel = PAGE_NAV_MAP[currentFile] || "Home";

  const activeClasses   = ["text-primary", "font-bold", "border-l-4", "border-primary",
                            "bg-surface-container-highest/50", "px-6", "py-3"];
  const inactiveClasses = ["text-on-surface-variant", "px-6", "py-3",
                            "hover:bg-surface-container-highest", "transition-colors"];

  document.querySelectorAll("nav a, aside nav a").forEach((link) => {
    const labelEl = link.querySelector(".font-label-md, [class*='label-md']");
    if (!labelEl) return;
    const label = labelEl.textContent.trim();
    const iconEl = link.querySelector(".material-symbols-outlined");

    if (label === activeLabel) {
      activeClasses.forEach((c) => link.classList.add(c));
      inactiveClasses.forEach((c) => link.classList.remove(c));
      link.classList.remove("text-on-surface-variant");
      if (iconEl) iconEl.style.fontVariationSettings = "'FILL' 1";
    } else {
      inactiveClasses.forEach((c) => link.classList.add(c));
      activeClasses.forEach((c) => link.classList.remove(c));
      link.classList.remove("text-primary", "font-bold");
      if (iconEl) iconEl.style.fontVariationSettings = "'FILL' 0";
    }
  });
}

// ================================================================
//  3. Mobile menu toggle
// ================================================================
function setupMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  if (!mobileMenu) return;

  document.querySelectorAll(
    "[data-mobile-toggle], .mobile-menu-btn, button[aria-label='Menu']"
  ).forEach((btn) => {
    btn.addEventListener("click", toggleMobileMenu);
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
}

function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  if (!mobileMenu) return;
  const isOpen = !mobileMenu.classList.contains("hidden");
  isOpen ? closeMobileMenu() : openMobileMenu();
}

function openMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  if (!mobileMenu) return;
  mobileMenu.classList.remove("hidden");
  mobileMenu.classList.add("flex");
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  if (!mobileMenu) return;
  mobileMenu.classList.add("hidden");
  mobileMenu.classList.remove("flex");
}

window.toggleMobileMenu = toggleMobileMenu;

// ================================================================
//  4. Contact form handler
// ================================================================
function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name    = document.getElementById("name")?.value.trim();
    const email   = document.getElementById("email")?.value.trim();
    const subject = document.getElementById("subject")?.value.trim();
    const message = document.getElementById("message")?.value.trim();
    const status  = document.getElementById("formStatus");

    if (!name || !email || !subject || !message) {
      showFormStatus("Please fill in all fields.", "error", status);
      return;
    }
    if (!isValidEmail(email)) {
      showFormStatus("Please enter a valid email address.", "error", status);
      return;
    }

    showFormStatus("Thank you for your message! I will get back to you soon.", "success", status);
    form.reset();
    setTimeout(() => { if (status) status.style.display = "none"; }, 5000);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormStatus(msg, type, el) {
  if (!el) return;
  el.textContent = msg;
  el.className = "form-status " + type;
  el.style.display = "block";

  if (type === "success") {
    el.style.cssText = "display:block;padding:12px 16px;border-radius:4px;margin-top:12px;background:#d4edda;color:#155724;border:1px solid #c3e6cb;";
  } else {
    el.style.cssText = "display:block;padding:12px 16px;border-radius:4px;margin-top:12px;background:#ffdad6;color:#93000a;border:1px solid #f5c6cb;";
  }
}

// ================================================================
//  5. Scroll-reveal animations (IntersectionObserver)
//     Enhanced: staggered delays for sibling elements
// ================================================================
function setupScrollAnimations() {
  const targets = document.querySelectorAll(
    ".project-card, .skill-item, .hobby-card, .link-card, .resume-item, " +
    "[class*='project-file'], article[class*='bg-surface']"
  );

  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
  );

  // Group siblings by parent and add stagger delays
  const staggerClasses = ["stagger-1", "stagger-2", "stagger-3", "stagger-4", "stagger-5"];
  const parentSeen = new Map();

  targets.forEach((el) => {
    const parent = el.parentElement;
    if (!parentSeen.has(parent)) parentSeen.set(parent, 0);
    const idx = parentSeen.get(parent);
    parentSeen.set(parent, idx + 1);

    // Apply stagger class
    const stagger = staggerClasses[idx % staggerClasses.length];
    el.classList.add(stagger);

    el.style.opacity = "0";
    el.style.transform = "translateY(18px)";
    el.style.transition = `opacity 0.55s ease, transform 0.55s ease`;
    observer.observe(el);
  });
}

// ================================================================
//  6. Book-spine navigation (index.html)
// ================================================================
function setupBookSpines() {
  const spineMap = {
    "ABOUT ME": "about_me.html",
    "SKILLS":   "skills.html",
    "RESUME":   "resume.html",
    "PROJECTS": "projects.html",
    "CONTACT":  "contact.html",
  };

  document.querySelectorAll("[class*='writing-vertical']").forEach((span) => {
    const label = span.textContent.trim().toUpperCase();
    const href  = spineMap[label];
    if (!href) return;

    const spine = span.closest("div[class*='cursor-pointer']") || span.parentElement;
    if (spine) {
      spine.style.cursor = "pointer";
      spine.setAttribute("role", "link");
      spine.setAttribute("aria-label", `Navigate to ${label}`);
      spine.addEventListener("click", () => { window.location.href = href; });
      spine.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") window.location.href = href;
      });
      spine.setAttribute("tabindex", "0");
    }
  });

  document.querySelectorAll("button").forEach((btn) => {
    if (btn.textContent.includes("View Complete") || btn.textContent.includes("Chronicle")) {
      btn.addEventListener("click", () => { window.location.href = "about_me.html"; });
    }
  });
}

// ================================================================
//  7. Dynamic Project Navigation (Prev/Next)
// ================================================================
const PROJECT_SEQUENCE = [
  "project1.html",
  "project2.html",
  "project3.html",
  "project4.html",
  "project5.html",
  "project6.html"
];

function setupDynamicProjectNav() {
  const currentFile = window.location.pathname.split("/").pop();
  const currentIndex = PROJECT_SEQUENCE.indexOf(currentFile);
  if (currentIndex === -1) return;

  const prevIndex = (currentIndex === 0) ? PROJECT_SEQUENCE.length - 1 : currentIndex - 1;
  const nextIndex = (currentIndex === PROJECT_SEQUENCE.length - 1) ? 0 : currentIndex + 1;

  const prevBtn = document.getElementById("btn-prev-project");
  const nextBtn = document.getElementById("btn-next-project");
  if (prevBtn) prevBtn.setAttribute("href", PROJECT_SEQUENCE[prevIndex]);
  if (nextBtn) nextBtn.setAttribute("href", PROJECT_SEQUENCE[nextIndex]);
}

// ================================================================
//  8. Smooth scrolling for in-page anchor links
// ================================================================
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}
