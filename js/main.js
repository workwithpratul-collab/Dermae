/* =========================================================
   DERMAÉ — setup ("the director")
   Chooses which version of the page to run:
   1. Film:  pinned scroll film + Lenis smooth scrolling (default).
   2. Calm:  no pin, zoom or smooth scrolling; gentle fades only.
             Used for reduced-motion visitors, or if a scene's text
             wouldn't fit on the screen (e.g. a phone held sideways).
   3. Plain: if GSAP/ScrollTrigger didn't load, nothing here runs and
             the normal page from index.html + styles.css stays.
   ========================================================= */
(function () {
  "use strict";

  if (!window.gsap || !window.ScrollTrigger || !window.DermaeScenes) return; // plain page

  gsap.registerPlugin(ScrollTrigger);
  // Phones resize the screen when the address bar hides; don't rebuild for that.
  ScrollTrigger.config({ ignoreMobileResize: true });

  var root = document.documentElement;
  var reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  var desktopMQ = window.matchMedia("(min-width: 1024px)");
  var portraitMQ = window.matchMedia("(orientation: portrait)"); // portrait vs landscape images and layout

  var ctx = null, lenis = null, tick = null, cleanups = [];
  var state = { mode: null, timeline: null, lenis: null };
  window.DermaeFilm = state; // read-only peek for testing in the browser console

  function qa(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  /* Load every film image now (not lazily) and decode it, so no scene flickers in. */
  function preloadImages() {
    qa("#film img").forEach(function (img) {
      // Scene 1 is already loading at high priority; the rest follow quietly
      // in the background so they don't compete with it.
      if (!img.closest(".scene--opening")) img.fetchPriority = "low";
      img.loading = "eager";
      if (img.decode) img.decode().catch(function () {});
    });
  }

  /* Does every scene's text fit on the visible screen in film layout,
     below the fixed header? (.film-on must be set) */
  function filmFits() {
    var visible = window.innerHeight;
    return qa("#film .scene").every(function (scene) {
      var c = scene.querySelector(".scene__content");
      var top = parseFloat(getComputedStyle(scene).paddingTop) || 0; // header space
      return c.offsetTop >= top - 2 && c.offsetTop + c.offsetHeight <= visible + 2;
    });
  }

  function startLenis() {
    if (!window.Lenis) return; // native scrolling still works fine
    lenis = new window.Lenis({ lerp: 0.08, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    state.lenis = lenis; // used by js/nav.js to glide to a scene
    if (root.classList.contains("is-loading")) lenis.stop(); // js/intro.js starts it when the loader opens
    tick = function (time) { lenis.raf(time * 1000); };
    gsap.ticker.add(tick);
    // GSAP's default "lag smoothing" stays ON: if the browser briefly pauses,
    // the film eases on instead of leaping forward to catch up.
  }

  function stop() {
    if (ctx) { ctx.revert(); ctx = null; }       // undoes every animation, pin and inline style
    cleanups.forEach(function (fn) { fn(); });
    cleanups = [];
    if (lenis) { gsap.ticker.remove(tick); lenis.destroy(); lenis = null; state.lenis = null; }
    root.classList.remove("film-on");
    state.mode = null;
    state.timeline = null;
  }

  function start() {
    // Where the visitor was (as a fraction of the page), so a rebuild doesn't
    // jump them to the top. Remembered on normal scrolls (see below), because
    // by the time a rotation reaches this code, the browser may already have
    // clamped the scroll position.
    var fraction = place.fraction;
    var rebuilding = state.mode !== null;

    freeze();
    stop();

    // Split text into lines only once the web fonts are in: line breaks depend on
    // them. Until then (behind the loading screen) text simply fades.
    void document.body.offsetHeight;   // lay the page out first, so the browser requests its fonts
    var split = !document.fonts || document.fonts.status === "loaded";

    var useFilm = false;
    if (!reduceMQ.matches) {
      root.classList.add("film-on");
      useFilm = filmFits();
      if (!useFilm) root.classList.remove("film-on");
    }

    ctx = gsap.context(function () {
      if (useFilm) {
        preloadImages();
        state.timeline = DermaeScenes.buildFilm({ desktop: desktopMQ.matches, cleanups: cleanups, split: split });
        DermaeScenes.buildBooking({ desktop: desktopMQ.matches, cleanups: cleanups, split: split });
      } else {
        DermaeScenes.buildCalm({ cleanups: cleanups, reduce: reduceMQ.matches, split: split });
      }
      DermaeScenes.buildSections({ cleanups: cleanups, reduce: reduceMQ.matches, split: split });
      DermaeScenes.buildProgress({ reduce: reduceMQ.matches });
    });
    state.mode = useFilm ? "film" : "calm";

    if (!reduceMQ.matches) startLenis();
    ScrollTrigger.refresh();

    // Opened from a shared link (e.g. #treatments or #treatment-acne): land on
    // that element after every rebuild, until the visitor scrolls themselves.
    var target = state.pendingTarget && document.getElementById(state.pendingTarget);
    if (target) {
      var ty = Math.round(target.getBoundingClientRect().top + window.pageYOffset);
      if (lenis) { lenis.resize(); lenis.scrollTo(ty, { immediate: true, force: true }); }
      else window.scrollTo(0, ty);
    } else if (rebuilding && fraction > 0) {
      var y = fraction * Math.max(1, root.scrollHeight - window.innerHeight);
      // While rebuilding, the page was briefly shorter. Lenis must re-measure
      // the full height first, or it won't scroll back down to the old place.
      if (lenis) { lenis.resize(); lenis.scrollTo(y, { immediate: true, force: true }); }
      else window.scrollTo(0, y);
    }
  }

  /* Rebuild when it matters: desktop <-> mobile, portrait <-> landscape,
     reduced-motion setting changes, or a resize changes whether the film fits. */
  /* Remember the visitor's place on every normal scroll. During a resize or
     rotation (and the rebuild after it) scroll events are ignored, because
     the page is briefly re-measured and the position can jump. */
  var place = { fraction: 0, frozen: false, timer: null };
  function freeze() {
    place.frozen = true;
    clearTimeout(place.timer);
    place.timer = setTimeout(function () { place.frozen = false; }, 800);
  }
  window.addEventListener("scroll", function () {
    if (place.frozen) return;
    var max = root.scrollHeight - window.innerHeight;
    place.fraction = max > 0 ? window.scrollY / max : 0;
  }, { passive: true });
  window.addEventListener("resize", freeze, true);

  var lastW = window.innerWidth, lastH = window.innerHeight, resizeTimer;

  function onChange() { lastW = window.innerWidth; lastH = window.innerHeight; start(); }
  if (reduceMQ.addEventListener) {
    reduceMQ.addEventListener("change", onChange);
    desktopMQ.addEventListener("change", onChange);
    portraitMQ.addEventListener("change", onChange);
  }

  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var w = window.innerWidth, h = window.innerHeight;
      // Ignore small height changes (a phone's address bar showing/hiding).
      if (w === lastW && Math.abs(h - lastH) < 150) return;
      var widthChanged = w !== lastW;
      lastW = w; lastH = h;
      if (reduceMQ.matches) return;
      // A new width moves the line breaks, so the text must be split again.
      if (widthChanged) { start(); return; }
      var wasFilm = state.mode === "film";
      root.classList.add("film-on");
      var fits = filmFits();
      if (!wasFilm) root.classList.remove("film-on");
      if (fits !== wasFilm) start();
    }, 250);
  });

  start();

  // When web fonts finish loading, text widths change: rebuild once so the
  // lines are split with the real fonts (this also re-checks the fit).
  if (document.fonts && document.fonts.addEventListener) {
    var fontTimer;
    var onFonts = function () {
      clearTimeout(fontTimer);
      fontTimer = setTimeout(function () { if (document.fonts.status === "loaded") start(); }, 60);
    };
    document.fonts.addEventListener("loadingdone", onFonts);
    document.fonts.addEventListener("loadingerror", onFonts);   // fonts blocked: split with the fallback fonts
  }
})();
