/* =========================================================
   DERMAÉ — scene animations (the "film")

   How it works, simply:
   - One GSAP timeline holds every move in Scenes 1–5, like a strip of film.
   - ScrollTrigger pins the stage and links the timeline to the scroll bar:
     scroll down = play forward, scroll up = play backward.
   - Timeline numbers below are "beats". The whole film is stretched over
     SCREENS_PER_SCENE × 5 screen-heights of scrolling.
   - Crossfades always fade the NEW scene in on top while the old one stays
     fully visible underneath, so there is never a blank frame.
   - Each scene's text fades out before the next scene starts to appear,
     so text from two scenes is never on screen together.
   ========================================================= */
window.DermaeScenes = (function () {
  "use strict";

  // Scroll length per scene, in screen-heights. Started at 1.0, raised so
  // each scene's text has time to be read before it fades.
  var SCREENS_PER_SCENE = 1.5;

  function q(sel, root) { return (root || document).querySelector(sel); }
  function qa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---------- The film (desktop and mobile) ---------- */
  function buildFilm(opts) {
    var m = opts.desktop ? 1 : 0.5;          // movement strength: less on small screens
    var drift = opts.desktop ? 1 : 0;        // text parallax only on desktop
    var film = q("#film");
    var s = qa(".scene", film).map(function (el) {
      return {
        el: el,
        media: q(".scene__media", el),
        light: q(".scene__light", el),
        wash: q(".scene__wash", el),
        content: q(".scene__content", el)
      };
    });
    var blur = q(".scene__blur", s[0].el);
    var glow = q(".film__glow", film);
    var green = q(".film__green", film);

    var soft = "sine.inOut";

    // "Invisible but painted": layers waiting their turn sit at 0.001 opacity
    // instead of 0. You can't see them, but the browser paints them up front,
    // so there is no hitch the first time a scene (or the blur) appears.
    var HIDDEN = 0.001;

    /* Starting state (what you see at the very top of the page) */
    gsap.set(s.slice(1).map(function (x) { return x.el; }), { opacity: HIDDEN });
    gsap.set(blur, { opacity: HIDDEN });
    gsap.set(s.slice(1).map(function (x) { return x.wash; }), { opacity: 0 });
    gsap.set(s.slice(1).map(function (x) { return x.content; }), { opacity: 0, y: 30 * drift });
    gsap.set(s[0].media, { scale: 1 + 0.3 * m });                 // very close on the drop
    gsap.set(s[1].media, { scale: 1.04 });
    gsap.set(s[2].media, { scale: 1 + 0.1 * m, xPercent: 4 * m });
    gsap.set(s[3].media, { scale: 1.04 });
    gsap.set(s[4].media, { scale: 1 + 0.18 * m });

    // Scene 3 reveals: heading → Medical column → hairline + Aesthetic column → short rule + closing line
    var c3 = s[2].content;
    var s3parts = [q("h2", c3), q(".treatments__col--medical", c3), q(".treatments__col--aesthetic", c3), q(".note", c3)];
    var s3divider = q(".treatments__divider", c3), s3rule = q(".treatments__rule", c3);
    gsap.set(s3divider, { scaleY: 0, transformOrigin: "50% 0%" });
    gsap.set(s3rule, { scaleX: 0, transformOrigin: "0% 50%" });
    // Scene 5 reveals its parts one at a time
    var s5parts = [q("h2", s[4].content)].concat(qa(".steps li", s[4].content), [q(".quote", s[4].content)]);
    gsap.set(s3parts.concat(s5parts), { opacity: 0, y: 16 });

    var tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: film,
        start: "top top",
        end: function () { return "+=" + Math.round(SCREENS_PER_SCENE * 5 * window.innerHeight); },
        pin: true,
        scrub: 0.6,               // a gentle catch-up, on top of Lenis smoothing
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    /* Helper: bring text in, let it drift slowly while it's readable, then fade it out */
    function textBeat(x, tIn, tOut) {
      tl.to(x.wash, { opacity: 1, duration: 0.35, ease: soft }, tIn - 0.1)
        .to(x.content, { opacity: 1, y: 0, duration: 0.35, ease: "sine.out" }, tIn)
        .to(x.content, { y: -24 * drift, duration: tOut - tIn - 0.35 }, tIn + 0.35)
        .to(x.content, { opacity: 0, y: -44 * drift, duration: 0.28, ease: "sine.in" }, tOut)
        .to(x.wash, { opacity: 0, duration: 0.3, ease: soft }, tOut + 0.02);
    }
    function parts(list, start, gap) {
      list.forEach(function (el, i) {
        tl.to(el, { opacity: 1, y: 0, duration: 0.25, ease: "sine.out" }, start + i * gap);
      });
    }

    /* ---- Scene 1: Opening (0 → 1.95) ----
       Starts very close on the drop and slowly pulls back. */
    tl.to(s[0].media, { scale: 1.04, duration: 1.6 }, 0)
      .to(s[0].light, { xPercent: -4 * m, yPercent: -8 * m, duration: 1.6 }, 0)
      .to(s[0].content, { y: -40 * drift, duration: 1.25 }, 0)
      .to(s[0].content, { opacity: 0, duration: 0.3, ease: "sine.in" }, 0.95)
      .to(s[0].wash, { opacity: 0, duration: 0.4, ease: soft }, 0.95)
      // The drop softens into a blur…
      .to(blur, { opacity: 1, duration: 0.35, ease: soft }, 1.25)
      // …and the room appears through it.
      .to(s[1].el, { opacity: 1, duration: 0.5, ease: soft }, 1.45);

    /* ---- Scene 2: Treatment room (1.45 → 3.65) ----
       Slow push forward; light and text drift at different speeds. */
    tl.to(s[1].media, { scale: 1 + 0.1 * m + 0.04, duration: 1.6 }, 1.45)
      .to(s[1].light, { xPercent: 6 * m, yPercent: -4 * m, duration: 2.2 }, 1.45);
    textBeat(s[1], 1.95, 2.8);
    // The camera drifts right into a detail of the room.
    tl.to(s[1].media, { xPercent: -5 * m, scale: 1 + 0.16 * m + 0.04, duration: 0.6, ease: "sine.in" }, 3.05)
      .to(s[2].el, { opacity: 1, duration: 0.45, ease: soft }, 3.2);

    /* ---- Scene 3: Treatments (3.2 → 5.5) ----
       Slow sideways glide; heading, then each card, then the note. */
    tl.to(s[2].media, { xPercent: -4 * m, duration: 2.3 }, 3.2)
      .to(s[2].light, { xPercent: -8 * m, duration: 2.3 }, 3.2)
      .to(s[2].wash, { opacity: 1, duration: 0.35, ease: soft }, 3.55)
      .to(s[2].content, { opacity: 1, y: 0, duration: 0.3, ease: "sine.out" }, 3.65)
      .to(s[2].content, { y: -20 * drift, duration: 1.15 }, 3.95);
    parts(s3parts, 3.66, 0.17);
    // The hairlines "draw" in: the divider grows downward with the second column,
    // the short rule grows sideways just before the closing sentence.
    tl.to(s3divider, { scaleY: 1, duration: 0.35, ease: "sine.inOut" }, 3.95)
      .to(s3rule, { scaleX: 1, duration: 0.25, ease: "sine.out" }, 4.12);
    tl.to(s[2].content, { opacity: 0, y: -36 * drift, duration: 0.28, ease: "sine.in" }, 4.8)
      .to(s[2].wash, { opacity: 0, duration: 0.3, ease: soft }, 4.82)
      // Soft crossfade into the doctor scene.
      .to(s[3].el, { opacity: 1, duration: 0.45, ease: soft }, 5.05);

    /* ---- Scene 4: Doctor (5.05 → 7.0) ----
       Slow zoom toward the doctor. */
    tl.to(s[3].media, { scale: 1.04 + 0.12 * m, duration: 1.45 }, 5.05)
      .to(s[3].light, { xPercent: -5 * m, yPercent: 4 * m, duration: 1.9 }, 5.05);
    textBeat(s[3], 5.55, 6.3);
    // The camera moves into the window light and the screen brightens.
    tl.to(s[3].media, { xPercent: -3 * m, yPercent: 3 * m, scale: 1.04 + 0.2 * m, duration: 0.5, ease: "sine.in" }, 6.5)
      .to(glow, { opacity: 0.85, duration: 0.45, ease: "sine.in" }, 6.45)
      .to(s[4].el, { opacity: 1, duration: 0.3, ease: soft }, 6.7)
      .to(glow, { opacity: 0, duration: 0.45, ease: "sine.out" }, 7.0);

    /* ---- Scene 5: Your care journey (6.7 → 9.0) ----
       Slow pull back; Consult, Plan, Care one at a time, then the quote. */
    tl.to(s[4].media, { scale: 1.03, duration: 2.0 }, 6.7)
      .to(s[4].light, { xPercent: 5 * m, yPercent: -5 * m, duration: 2.3 }, 6.7)
      .to(s[4].wash, { opacity: 1, duration: 0.35, ease: soft }, 7.25)
      .to(s[4].content, { opacity: 1, y: 0, duration: 0.3, ease: "sine.out" }, 7.35)
      .to(s[4].content, { y: -20 * drift, duration: 1.0 }, 7.65);
    parts(s5parts, 7.38, 0.22);
    tl.to(s[4].content, { opacity: 0, y: -36 * drift, duration: 0.28, ease: "sine.in" }, 8.65)
      .to(s[4].wash, { opacity: 0, duration: 0.3, ease: soft }, 8.67)
      // Fade into deep forest green, then a short hold before the pin releases.
      .to(green, { opacity: 1, duration: 0.5, ease: soft }, 8.85)
      .to({}, { duration: 0.15 }, 9.35);

    return tl;
  }

  /* ---------- Scene 6: Booking (film mode) ----------
     Very slight drift of the background texture, then stillness.
     Text fades in once (not scroll-scrubbed), so the form is never
     half-faded while someone is using it. */
  function buildBooking(opts) {
    var booking = q("#booking");
    var texture = q(".booking__texture", booking);
    var inner = q(".booking__inner", booking);
    var items = [q("h2", inner), q(".booking__intro", inner), q(".form", inner), q(".contact", inner), q(".footer p")];

    gsap.fromTo(texture, { y: 60 * (opts.desktop ? 1 : 0.5) }, {
      y: 0, ease: "none",
      scrollTrigger: { trigger: booking, start: "top bottom", end: "top top", scrub: true }
    });

    var reveal = gsap.fromTo(items, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "sine.out",
      scrollTrigger: { trigger: booking, start: "top 70%", toggleActions: "play none none reverse" }
    });

    // Keyboard safety: if anyone tabs into the form, show it immediately.
    var show = function () { reveal.progress(1); };
    booking.addEventListener("focusin", show);
    opts.cleanups.push(function () { booking.removeEventListener("focusin", show); });
  }

  /* ---------- Calm version (reduced motion, or the film can't fit) ----------
     No pinning, zooms or smooth scrolling. Text simply fades in. */
  function buildCalm(opts) {
    qa(".scene__content, .booking__inner").forEach(function (el) {
      var tween = gsap.fromTo(el, { opacity: 0 }, {
        opacity: 1, duration: 0.8, ease: "sine.out",
        scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none" }
      });
      var show = function () { tween.progress(1); };
      el.addEventListener("focusin", show);
      opts.cleanups.push(function () { el.removeEventListener("focusin", show); });
    });
  }

  return { buildFilm: buildFilm, buildBooking: buildBooking, buildCalm: buildCalm };
})();
