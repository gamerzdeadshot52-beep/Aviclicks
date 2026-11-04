/* =========================================================
   AVI CLICKS — interactions
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Nav: solid background on scroll ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => {
    if (window.scrollY > 60) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });

  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) closeMenu();
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Lightbox ---------- */
  const items = Array.from(document.querySelectorAll(".gallery__item"));
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbCap = document.getElementById("lbCap");
  const lbClose = document.getElementById("lbClose");
  const lbPrev = document.getElementById("lbPrev");
  const lbNext = document.getElementById("lbNext");
  let index = 0;

  const show = (i) => {
    index = (i + items.length) % items.length;
    const item = items[index];
    const src = item.querySelector("img");
    lbImg.src = src.getAttribute("src");
    lbImg.alt = src.alt || "Portfolio image";
    lbCap.textContent = item.querySelector("figcaption span").textContent;
  };

  const open = (i) => {
    show(i);
    lightbox.hidden = false;
    requestAnimationFrame(() => lightbox.classList.add("is-open"));
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(() => (lightbox.hidden = true), 400);
  };

  items.forEach((item, i) => item.addEventListener("click", () => open(i)));
  lbClose.addEventListener("click", close);
  lbPrev.addEventListener("click", (e) => { e.stopPropagation(); show(index - 1); });
  lbNext.addEventListener("click", (e) => { e.stopPropagation(); show(index + 1); });
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  window.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
