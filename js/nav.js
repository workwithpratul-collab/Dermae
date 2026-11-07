/* =========================================================
   DERMAÉ — header, menu and "Book consultation"
   - Links glide to the right moment in the scroll film (not a jump).
   - The header switches to ivory text over forest green, and shows a
     soft background only when something busy is behind it.
   - Mobile menu: aria-expanded, Escape closes it, Tab stays inside.
   - The "Book consultation" buttons hide while the booking section shows.
   Without JavaScript, all links are normal jump links.
   ========================================================= */
(function () {
  "use strict";

  var root = document.documentElement;
  var header = document.getElementById("site-header");
  if (!header) return;

  var nav = document.getElementById("site-nav");
  var toggle = header.querySelector(".menu-toggle");
  var toggleText = header.querySelector(".menu-toggle__text");
  var wordmark = header.querySelector(".wordmark");
  var booking = document.getElementById("booking");
  var green = document.querySelector(".film__green");
  var mobileMQ = window.matchMedia("(max-width: 1023.98px)");
  var reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");

  function film() { return window.DermaeFilm || {}; }

  /* ---------- Where each link should take you ---------- */
  function targetY(id) {
    if (id === "opening") return 0;
    var f = film(), tl = f.timeline, st = tl && tl.scrollTrigger;
    // Film scenes are stacked on one pinned stage, so the "place" of a scene
    // is a moment on the film's timeline, turned into a scroll position.
    if (f.mode === "film" && st && tl.labels[id] != null) {
      return st.start + (tl.labels[id] / tl.duration()) * (st.end - st.start);
    }
    var el = document.getElementById(id);
    return el ? el.getBoundingClientRect().top + window.pageYOffset : 0;
  }

  // Slow start, slow finish: like a camera dolly.
  function easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

  function goTo(id) {
    var y = Math.max(0, Math.round(targetY(id)));
    var target = document.getElementById(id);
    // Move keyboard/screen-reader focus to the scene too, without another jump.
    var arrive = function () { if (target) target.focus({ preventScroll: true }); };
    var lenis = film().lenis;

    if (lenis) {
      var screens = Math.abs(y - window.pageYOffset) / window.innerHeight;
      lenis.scrollTo(y, {
        duration: Math.min(3, Math.max(1, 0.8 + screens * 0.25)),
        easing: easeInOutCubic,
        onComplete: arrive
      });
    } else {
      window.scrollTo({ top: y, behavior: reduceMQ.matches ? "auto" : "smooth" });
      arrive();
    }
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a[data-nav]") : null;
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (isOpen()) closeMenu(false);
    goTo(a.getAttribute("data-nav"));
  });

  /* ---------- Mobile menu ---------- */
  var outside = [document.querySelector("main"), document.querySelector(".footer"),
                 document.querySelector(".book-bar"), document.querySelector(".skip-link"), wordmark];

  function isOpen() { return header.classList.contains("menu-open"); }
  function menuItems() {
    return Array.prototype.slice.call(nav.querySelectorAll("a")).concat(toggle);
  }

  function setOutsideInert(on) {
    outside.forEach(function (el) {
      if (!el) return;
      if (on) el.setAttribute("inert", ""); else el.removeAttribute("inert");
    });
  }

  function onKey(e) {
    if (e.key === "Escape") { e.preventDefault(); closeMenu(true); return; }
    if (e.key !== "Tab") return;
    // Keep focus inside the menu: links, then the Close button, round again.
    var items = menuItems();
    var i = items.indexOf(document.activeElement);
    var next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : (i === -1 || i === items.length - 1 ? 0 : i + 1);
    e.preventDefault();
    items[next].focus();
  }

  function openMenu() {
    header.classList.add("menu-open");
    root.classList.add("menu-is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggleText.textContent = "Close";
    setOutsideInert(true);
    if (film().lenis) film().lenis.stop(); else root.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    nav.querySelector("a").focus();
  }

  function closeMenu(returnFocus) {
    if (!isOpen()) return;
    header.classList.remove("menu-open");
    root.classList.remove("menu-is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggleText.textContent = "Menu";
    setOutsideInert(false);
    if (film().lenis) film().lenis.start(); else root.style.overflow = "";
    document.removeEventListener("keydown", onKey);
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener("click", function () { if (isOpen()) closeMenu(true); else openMenu(); });

  // Growing to desktop width closes the menu (the links are in the bar again).
  var onMQ = function () { if (!mobileMQ.matches) closeMenu(false); };
  if (mobileMQ.addEventListener) mobileMQ.addEventListener("change", onMQ);

  /* ---------- What's behind the header? ---------- */
  var last = {};
  function setState(key, value, apply) {
    if (last[key] === value) return;
    last[key] = value;
    apply(value);
  }

  function update() {
    var vh = window.innerHeight;
    var bTop = booking ? booking.getBoundingClientRect().top : Infinity;
    var headerH = header.offsetHeight;

    // Dark when forest green is behind the header: the booking section and
    // footer, or the film's fade to green at the end of Scene 5.
    var dark = bTop <= headerH * 0.5;
    if (!dark && root.classList.contains("film-on") && green && window.gsap) {
      dark = Number(window.gsap.getProperty(green, "opacity")) > 0.5;
    }
    // Soft background: always over the photos (some, like the opening's olive
    // corner, are too busy or dark for the links on their own), but over solid
    // forest green only once the booking content scrolls under the header.
    var scrim = dark ? bTop < -8 : true;

    setState("dark", dark, function (v) { if (v) header.setAttribute("data-theme", "dark"); else header.removeAttribute("data-theme"); });
    setState("scrim", scrim, function (v) { header.classList.toggle("has-scrim", v); });
    setState("booking", bTop < vh * 0.8, function (v) { root.classList.toggle("is-booking", v); });
  }

  // The film keeps easing for a moment after scrolling stops, so check every
  // frame while GSAP is running (one cheap measurement per frame).
  if (window.gsap) window.gsap.ticker.add(update);
  else {
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }
  update();

  // Opening the page with a scene address (e.g. …/#doctor): go to that moment.
  var start = (location.hash || "").slice(1);
  if (/^(treatments|doctor|journey)$/.test(start) && film().mode === "film") {
    var jump = function () {
      var lenis = film().lenis, y = Math.round(targetY(start));
      if (lenis) lenis.scrollTo(y, { immediate: true }); else window.scrollTo(0, y);
    };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { requestAnimationFrame(jump); });
    else jump();
  }
})();
