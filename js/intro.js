/* =========================================================
   DERMAÉ — opening moment
   1. Ivory loading screen. Once the heading font is ready, "DERMAÉ"
      rises letter by letter, placed exactly over Scene 1's heading.
   2. As soon as the letters are done AND the scene images have loaded
      (or failed: the site opens anyway), the ivory fades away and the
      photo appears around the name. Never waits more than MAX_WAIT.
   3. A "Scroll to begin" hint appears, and fades on the first scroll.
   Reduced motion: no letter animation, one short fade.
   ========================================================= */
(function () {
  "use strict";

  var root = document.documentElement;
  var loader = document.getElementById("loader");
  var hint = document.querySelector(".scroll-hint");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var MAX_WAIT = 5000;          // ms: open the site even if images are still loading
  var FONT_WAIT = 1200;         // ms: don't wait longer than this for the heading font

  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function film() { return window.DermaeFilm || {}; }

  // Time since the page started loading. Limits count from then, so a slow
  // connection never adds the full wait on top of slow script downloads.
  var now = function () { return window.performance && performance.now ? performance.now() : 0; };

  // Script arrived very late (slow connection): skip the intro and open now.
  if (!loader || !window.Promise || now() > MAX_WAIT - 1000) {
    root.classList.remove("is-loading");
    root.classList.add("intro-done");
    if (loader) loader.hidden = true;
    return;
  }
  loader.classList.add("is-running");     // switch off the CSS safety net

  var word = loader.querySelector(".loader__word");
  var mask = loader.querySelector(".loader__mask");
  var heading = document.getElementById("opening-title");

  // Wrap each letter so it can rise on its own.
  var text = mask.textContent;
  mask.textContent = "";
  Array.prototype.forEach.call(text, function (ch, i) {
    var s = document.createElement("span");
    s.className = "loader__letter";
    s.style.setProperty("--i", i);
    s.textContent = ch;
    mask.appendChild(s);
  });

  // No scrolling the film while the loader covers it.
  if (film().lenis) film().lenis.stop();

  /* Put the loader's word exactly where the real heading is. */
  function place() {
    if (!heading || window.pageYOffset > 2) return;
    var r = heading.getBoundingClientRect();
    if (!r.width) return;
    var cs = getComputedStyle(heading);
    word.style.left = r.left + "px";
    word.style.top = r.top + "px";
    word.style.width = r.width + "px";
    word.style.fontSize = cs.fontSize;
    word.style.letterSpacing = cs.letterSpacing;
    word.style.lineHeight = cs.lineHeight;
    word.style.textAlign = cs.textAlign;
    word.classList.add("is-placed");
  }
  window.addEventListener("resize", place);

  /* Promise: the scene images are ready (loaded or failed). */
  function imagesReady() {
    // In the film every scene image is loaded up front; otherwise only the first.
    var imgs = Array.prototype.slice.call(document.querySelectorAll("#film .scene__media > picture > img"));
    if (film().mode !== "film") imgs = imgs.slice(0, 1);
    return Promise.all(imgs.map(function (img) {
      if (img.complete) return true;      // includes images that already failed
      return new Promise(function (res) {
        img.addEventListener("load", res, { once: true });
        img.addEventListener("error", res, { once: true });   // a broken image never blocks the site
      });
    }));
  }

  function fontReady() {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    return Promise.race([
      document.fonts.load('500 1em "Cormorant Garamond"').catch(function () {}),
      wait(FONT_WAIT)
    ]);
  }

  var images = Promise.race([imagesReady(), wait(Math.max(0, MAX_WAIT - now()))]);

  fontReady().then(function () {
    place();
    var letters;
    if (reduce) {
      loader.classList.add("is-static");
      letters = Promise.resolve();
    } else {
      // Next frame, so the starting position is painted before the rise.
      requestAnimationFrame(function () { requestAnimationFrame(function () { loader.classList.add("is-revealing"); }); });
      letters = wait(1050 + 85 * (text.length - 1) + 250);   // last letter lands, then a short breath
    }
    return Promise.all([letters, images]);
  }).then(open, open);

  var opened = false;
  function open() {
    if (opened) return;
    opened = true;
    window.removeEventListener("resize", place);
    var leave = reduce ? 350 : 1100;
    loader.style.setProperty("--leave", leave + "ms");
    root.classList.add("intro-done");     // the real heading shows under the loader's word
    root.classList.remove("is-loading");
    loader.classList.add("is-leaving");
    if (film().lenis) film().lenis.start();
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    setTimeout(function () { loader.hidden = true; }, leave + 100);
    showHint(reduce ? 300 : 1400);
  }

  // Safety: whatever happens above, open the site.
  setTimeout(open, Math.max(0, MAX_WAIT - now()) + FONT_WAIT + 2000);

  /* ---------- "Scroll to begin" ---------- */
  function showHint(delay) {
    if (!hint) return;
    if (window.pageYOffset > 4) return;      // already scrolled (e.g. opened at #doctor)
    var gone = false;
    var hide = function () {
      if (gone) return;
      gone = true;
      hint.classList.add("is-gone");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", hide);
      window.removeEventListener("touchmove", hide);
      setTimeout(function () { hint.hidden = true; }, 800);
    };
    var onScroll = function () { if (window.pageYOffset > 4) hide(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", hide, { passive: true });
    window.addEventListener("touchmove", hide, { passive: true });
    setTimeout(function () { if (!gone) hint.classList.add("is-visible"); }, delay);
  }
})();
