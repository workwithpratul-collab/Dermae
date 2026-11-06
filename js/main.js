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
  var state = { mode: null, timeline: null };
  window.DermaeFilm = state; // read-only peek for testing in the browser console

  function qa(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  /* Load every film image now (not lazily) and decode it, so no scene flickers in. */
  function preloadImages() {
    qa("#film img").forEach(function (img) {
      img.loading = "eager";
      if (img.decode) img.decode().catch(function () {});
    });
  }

  /* Does every scene's text fit on the visible screen in film layout? (.film-on must be set) */
  function filmFits() {
    var visible = window.innerHeight;
    return qa("#film .scene").every(function (scene) {
      var c = scene.querySelector(".scene__content");
      return c.offsetTop >= -2 && c.offsetTop + c.offsetHeight <= visible + 2;
    });
  }

  function startLenis() {
    if (!window.Lenis) return; // native scrolling still works fine
    lenis = new window.Lenis({ lerp: 0.08, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    tick = function (time) { lenis.raf(time * 1000); };
    gsap.ticker.add(tick);
    // GSAP's default "lag smoothing" stays ON: if the browser briefly pauses,
    // the film eases on instead of leaping forward to catch up.
  }

  function stop() {
    if (ctx) { ctx.revert(); ctx = null; }       // undoes every animation, pin and inline style
    cleanups.forEach(function (fn) { fn(); });
    cleanups = [];
    if (lenis) { gsap.ticker.remove(tick); lenis.destroy(); lenis = null; }
    root.classList.remove("film-on");
    state.mode = null;
    state.timeline = null;
  }

  function start() {
    // Remember roughly where the visitor was, so a rebuild doesn't jump them to the top.
    var max = Math.max(1, root.scrollHeight - window.innerHeight);
    var fraction = window.scrollY / max;
    var rebuilding = state.mode !== null;

    stop();

    var useFilm = false;
    if (!reduceMQ.matches) {
      root.classList.add("film-on");
      useFilm = filmFits();
      if (!useFilm) root.classList.remove("film-on");
    }

    ctx = gsap.context(function () {
      if (useFilm) {
        preloadImages();
        state.timeline = DermaeScenes.buildFilm({ desktop: desktopMQ.matches });
        DermaeScenes.buildBooking({ desktop: desktopMQ.matches, cleanups: cleanups });
      } else {
        DermaeScenes.buildCalm({ cleanups: cleanups });
      }
    });
    state.mode = useFilm ? "film" : "calm";

    if (!reduceMQ.matches) startLenis();
    ScrollTrigger.refresh();

    if (rebuilding && fraction > 0) {
      var y = fraction * Math.max(1, root.scrollHeight - window.innerHeight);
      if (lenis) lenis.scrollTo(y, { immediate: true }); else window.scrollTo(0, y);
    }
  }

  /* Rebuild when it matters: desktop <-> mobile, portrait <-> landscape,
     reduced-motion setting changes, or a resize changes whether the film fits. */
  function onChange() { start(); }
  if (reduceMQ.addEventListener) {
    reduceMQ.addEventListener("change", onChange);
    desktopMQ.addEventListener("change", onChange);
    portraitMQ.addEventListener("change", onChange);
  }

  var lastW = window.innerWidth, lastH = window.innerHeight, resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var w = window.innerWidth, h = window.innerHeight;
      // Ignore small height changes (a phone's address bar showing/hiding).
      if (w === lastW && Math.abs(h - lastH) < 150) return;
      lastW = w; lastH = h;
      if (reduceMQ.matches) return;
      var wasFilm = state.mode === "film";
      root.classList.add("film-on");
      var fits = filmFits();
      if (!wasFilm) root.classList.remove("film-on");
      if (fits !== wasFilm) start();
    }, 250);
  });

  start();

  // Web fonts change text heights slightly: re-check the fit and re-measure once they load.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      if (state.mode === "film" && !filmFits()) start();
      else ScrollTrigger.refresh();
    });
  }
})();
