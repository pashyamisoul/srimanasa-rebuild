/* ===================================================================
   Srimanasa: interactions
=================================================================== */
(function () {
  "use strict";

  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  /* ---- Theme switcher (compare palettes), only on the combined page ---- */
  const themeSwitch = document.getElementById("themeSwitch");
  if (themeSwitch) {
    const root = document.documentElement;
    const setTheme = (name) => {
      root.setAttribute("data-theme", name);
      themeSwitch.querySelectorAll(".ts-dot").forEach((d) => {
        d.classList.toggle("active", d.dataset.set === name);
      });
      try { localStorage.setItem("srimanasa-theme", name); } catch (e) {}
    };
    let saved = "navy";
    try { saved = localStorage.getItem("srimanasa-theme") || "navy"; } catch (e) {}
    setTheme(saved);
    themeSwitch.addEventListener("click", (e) => {
      const dot = e.target.closest(".ts-dot");
      if (dot) setTheme(dot.dataset.set);
    });
  }

  /* ---- Sticky nav background on scroll ---- */
  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 24);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") navLinks.classList.remove("open");
  });

  /* ---- Reveal on scroll ---- */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // small stagger for siblings entering together
          entry.target.style.transitionDelay = `${(i % 4) * 80}ms`;
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---- Animated stat counters ---- */
  const counters = document.querySelectorAll(".stat-num");
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || "";
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const countObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => countObserver.observe(el));

  /* ---- Active link highlighting ---- */
  const sections = document.querySelectorAll("section[id]");
  const linkMap = {};
  document.querySelectorAll(".nav-links a").forEach((a) => {
    linkMap[a.getAttribute("href").slice(1)] = a;
  });
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = linkMap[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          Object.values(linkMap).forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    { threshold: 0.5 }
  );
  sections.forEach((s) => spyObserver.observe(s));

  /* ---- Contact form → opens email client (static-site friendly) ---- */
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = `${data.get("fname") || ""} ${data.get("lname") || ""}`.trim();
      const subject = encodeURIComponent(data.get("subject") || "Website enquiry");
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${data.get("email")}\n\n${data.get("message")}`
      );
      note.textContent = "Opening your email app…";
      window.location.href = `mailto:contact@srimanasa.in?subject=${subject}&body=${body}`;
      setTimeout(() => {
        note.textContent = "Thank you! If your email app didn't open, write to us at contact@srimanasa.in";
        form.reset();
      }, 800);
    });
  }
})();
