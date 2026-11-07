/* =========================================================
   DERMAÉ — scene animations (the "film")

   How it works, simply:
   - One GSAP timeline holds every move in Scenes 1–5, like a strip of film.
   - ScrollTrigger pins the stage and links the timeline to the scroll bar:
     scroll down = play forward, scroll up = play backward.
   - Timeline numbers are "beats" (see T below). The whole film is
     stretched over SCREENS_PER_SCENE × 5 screen-heights of scrolling.
   - Text is split into lines (GSAP SplitText). Each line sits in its own
     invisible "mask" box and rises into view from behind its bottom edge;
     when a scene ends, the lines rise out through the top edge.
   - Crossfades fade the NEW scene in on top while the old one stays fully
     visible underneath, so there is never a blank frame.
   - A scene's text has left before the next scene starts to appear,
     so text from two scenes is never on screen together.
   ========================================================= */
window.DermaeScenes = (function () {
  "use strict";

  // Scroll length per scene, in screen-heights.
  var SCREENS_PER_SCENE = 1.5;

  // How far (in % of its own height) a line is pushed to be fully hidden by
  // its mask. More than 100%, because each mask has extra room for accents
  // and letter tails (g, y), and tight headings let those hang outside the line.
  var HIDE = 140;

  // Timings (beats) for each scene's text: when it starts to come in, and when it leaves.
  var T = {
    s1Out: 0.9,
    s2In: 1.95,  s2Out: 2.8,
    s3In: 3.6,   s3Out: 4.8,
    s4In: 5.55,  s4Out: 6.38,
    s5In: 7.35,  s5Out: 8.65
  };

  var root = document.documentElement;
  var intro = { lines: [], tween: null, tl: null };

  function q(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qa(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function flat(arrays) { return [].concat.apply([], arrays); }

  /* ---------- Splitting text into masked lines ----------
     Screen readers always get the complete, normal sentence:
     - Headings: the full text goes on the heading as an aria-label
       (SplitText's aria: "auto") and the line pieces are hidden.
     - Other text (paragraphs, list items): aria-label isn't reliably read
       there, so the full text is added in a visually hidden span and the
       line pieces are hidden instead.
     s.revert() restores the original HTML, which removes all of this. */
  function splitter(cleanups, allowed) {
    var ok = !!window.SplitText && allowed !== false;   // main.js waits for the web fonts first
    if (ok) {
      gsap.registerPlugin(SplitText);
      root.classList.add("has-split");
      cleanups.push(function () { root.classList.remove("has-split"); });
    }
    return function (el) {
      if (!ok || !el) return [];
      var heading = /^H[1-6]$/.test(el.tagName);
      var text = el.textContent.replace(/\s+/g, " ").trim();
      var s = new SplitText(el, { type: "lines", mask: "lines", linesClass: "line", aria: heading ? "auto" : "none" });
      if (!heading) {
        s.masks.forEach(function (mask) { mask.setAttribute("aria-hidden", "true"); });
        var sr = document.createElement("span");
        sr.className = "visually-hidden";
        sr.textContent = text;
        el.appendChild(sr);
      }
      cleanups.push(function () { s.revert(); });
      return s.lines;
    };
  }

  // Every text block in a scene, in reading order.
  function blocks(content) { return qa("h1, h2, h3, p, figcaption, .treatments__list li", content); }

  /* ---------- The film (desktop and mobile) ---------- */
  function buildFilm(opts) {
    intro.lines = []; intro.tl = null;       // forget the previous build's lines
    var m = opts.desktop ? 1 : 0.5;          // movement strength: less on small screens
    var drift = opts.desktop ? 1 : 0;        // text parallax only on desktop
    var split = splitter(opts.cleanups, opts.split);
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
    var hasSplit = !!window.SplitText && opts.split !== false;
    var fadeIn = hasSplit ? 0.15 : 0.35;     // without SplitText, the whole text block fades instead

    // "Invisible but painted": layers waiting their turn sit at 0.001 opacity
    // instead of 0. You can't see them, but the browser paints them up front,
    // so there is no hitch the first time a scene (or the blur) appears.
    var HIDDEN = 0.001;

    /* Split every scene's text into lines (Scene 1 first, in reading order) */
    var L = s.map(function (x) { return blocks(x.content).map(split); });

    /* Starting state (what you see at the very top of the page) */
    gsap.set(s.slice(1).map(function (x) { return x.el; }), { opacity: HIDDEN });
    gsap.set(blur, { opacity: HIDDEN });
    gsap.set(s.slice(1).map(function (x) { return x.wash; }), { opacity: 0 });
    gsap.set(s.slice(1).map(function (x) { return x.content; }), { opacity: 0, y: 30 * drift });
    var later = flat(flat(L.slice(1)));
    if (later.length) gsap.set(later, { yPercent: HIDE });
    gsap.set(s[0].media, { scale: 1 + 0.3 * m });                 // very close on the drop
    gsap.set(s[1].media, { scale: 1.04 });
    gsap.set(s[2].media, { scale: 1 + 0.1 * m, xPercent: 4 * m });
    gsap.set(s[3].media, { scale: 1.04 });
    gsap.set(s[4].media, { scale: 1 + 0.18 * m });

    // The tagline waits under the loading screen and rises in when it opens.
    var tagLines = flat(L[0].slice(1));
    intro.lines = tagLines;
    if (tagLines.length && !root.classList.contains("intro-done")) gsap.set(tagLines, { yPercent: HIDE });

    // Scene 3 hairlines draw in; Scene 5 step numbers and the quote rule fade/grow in.
    var c3 = s[2].content, c5 = s[4].content;
    var s3divider = q(".treatments__divider", c3), s3rule = q(".treatments__rule", c3);
    gsap.set(s3divider, { scaleY: 0, transformOrigin: "50% 0%" });
    gsap.set(s3rule, { scaleX: 0, transformOrigin: "0% 50%" });
    var steps = qa(".steps li", c5), quote = q(".quote", c5);
    gsap.set(steps, { "--num": 0 });
    gsap.set(quote, { "--rule": 0 });

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
    intro.tl = tl;

    /* Text helpers. Lines rise in one after another ("step" beats apart);
       on the way out they rise through the top of their masks. */
    function linesIn(lines, at, step) {
      if (!lines.length) return;
      tl.fromTo(lines, { yPercent: HIDE }, {
        yPercent: 0, duration: 0.32, ease: "power2.out", stagger: step || 0.07, immediateRender: false
      }, at);
    }
    function linesOut(lines, at) {
      if (!lines.length) return;
      tl.to(lines, { yPercent: -HIDE, duration: 0.2, ease: "power2.in", stagger: { amount: 0.1 } }, at);
    }
    function textIn(x, at) {
      tl.to(x.wash, { opacity: 1, duration: 0.35, ease: soft }, at - 0.1)
        .to(x.content, { opacity: 1, y: 0, duration: fadeIn, ease: "sine.out" }, at);
    }
    // Lines leave, then the block's last details fade and the wash lifts.
    function textOut(x, lines, at) {
      linesOut(lines, at);
      tl.to(x.content, { opacity: 0, y: -44 * drift, duration: 0.14, ease: "sine.in" }, at + 0.16)
        .to(x.wash, { opacity: 0, duration: 0.3, ease: soft }, at + 0.02);
    }
    // Slow drift of a text block while it is readable (desktop only).
    function hold(x, from, to) {
      if (drift) tl.to(x.content, { y: -24 * drift, duration: to - from }, from);
    }

    /* ---- Scene 1: Opening ----
       Starts very close on the drop and slowly pulls back. */
    tl.to(s[0].media, { scale: 1.04, duration: 1.6 }, 0)
      .to(s[0].light, { xPercent: -4 * m, yPercent: -8 * m, duration: 1.6 }, 0)
      .to(s[0].content, { y: -40 * drift, duration: 1.25 }, 0);
    if (hasSplit) tl.fromTo(flat(L[0]), { yPercent: 0 }, {
      yPercent: -HIDE, duration: 0.3, ease: "power2.in", stagger: 0.07, immediateRender: false
    }, T.s1Out);
    tl.to(s[0].content, { opacity: 0, duration: 0.15, ease: "sine.in" }, T.s1Out + 0.25)
      .to(s[0].wash, { opacity: 0, duration: 0.4, ease: soft }, T.s1Out + 0.05)
      // The drop softens into a blur…
      .to(blur, { opacity: 1, duration: 0.35, ease: soft }, 1.25)
      // …and the room appears through it.
      .to(s[1].el, { opacity: 1, duration: 0.5, ease: soft }, 1.45);

    /* ---- Scene 2: Treatment room ----
       Slow push forward; light and text drift at different speeds. */
    var l2 = flat(L[1]);
    tl.to(s[1].media, { scale: 1 + 0.1 * m + 0.04, duration: 1.6 }, 1.45)
      .to(s[1].light, { xPercent: 6 * m, yPercent: -4 * m, duration: 2.2 }, 1.45);
    textIn(s[1], T.s2In);
    linesIn(l2, T.s2In);
    hold(s[1], T.s2In + 0.35, T.s2Out);
    textOut(s[1], l2, T.s2Out);
    // The camera drifts right into a detail of the room.
    tl.to(s[1].media, { xPercent: -5 * m, scale: 1 + 0.16 * m + 0.04, duration: 0.6, ease: "sine.in" }, 3.05)
      .to(s[2].el, { opacity: 1, duration: 0.45, ease: soft }, 3.2);

    /* ---- Scene 3: Treatments ----
       Slow sideways glide; the heading, then both lists line by line
       side by side, the divider drawing down between them, then the note. */
    var b3 = blocks(c3), l3 = L[2];
    var pick = function (sel) { var els = qa(sel, c3); return flat(els.map(function (el) { return l3[b3.indexOf(el)]; })); };
    var head3 = pick("h2"), med = pick(".treatments__col--medical h3, .treatments__col--medical li"),
        aes = pick(".treatments__col--aesthetic h3, .treatments__col--aesthetic li"), note3 = pick(".note");
    tl.to(s[2].media, { xPercent: -4 * m, duration: 2.3 }, 3.2)
      .to(s[2].light, { xPercent: -8 * m, duration: 2.3 }, 3.2);
    textIn(s[2], T.s3In);
    linesIn(head3, T.s3In + 0.02, 0.08);
    linesIn(med, T.s3In + 0.18, 0.035);
    linesIn(aes, T.s3In + 0.18, 0.035);
    tl.to(s3divider, { scaleY: 1, duration: 0.45, ease: "sine.inOut" }, T.s3In + 0.2)
      .to(s3rule, { scaleX: 1, duration: 0.25, ease: "sine.out" }, T.s3In + 0.52);
    linesIn(note3, T.s3In + 0.56);
    hold(s[2], T.s3In + 0.35, T.s3Out);
    textOut(s[2], flat(l3), T.s3Out);
    // Soft crossfade into the doctor scene.
    tl.to(s[3].el, { opacity: 1, duration: 0.45, ease: soft }, 5.05);

    /* ---- Scene 4: Doctor ----
       Slow zoom toward the doctor. */
    var l4 = flat(L[3]);
    tl.to(s[3].media, { scale: 1.04 + 0.12 * m, duration: 1.45 }, 5.05)
      .to(s[3].light, { xPercent: -5 * m, yPercent: 4 * m, duration: 1.9 }, 5.05);
    textIn(s[3], T.s4In);
    linesIn(l4, T.s4In, 0.06);
    hold(s[3], T.s4In + 0.35, T.s4Out);
    textOut(s[3], l4, T.s4Out);
    // The camera moves into the window light and the screen brightens.
    tl.to(s[3].media, { xPercent: -3 * m, yPercent: 3 * m, scale: 1.04 + 0.2 * m, duration: 0.5, ease: "sine.in" }, 6.5)
      .to(glow, { opacity: 0.85, duration: 0.45, ease: "sine.in" }, 6.45)
      .to(s[4].el, { opacity: 1, duration: 0.3, ease: soft }, 6.7)
      .to(glow, { opacity: 0, duration: 0.45, ease: "sine.out" }, 7.0);

    /* ---- Scene 5: Your care journey ----
       Slow pull back; Consult, Plan and Care one at a time, then the quote. */
    var b5 = blocks(c5), l5 = L[4];
    var linesOf = function (el) { return flat(b5.filter(function (b) { return el === b || el.contains(b); }).map(function (b) { return l5[b5.indexOf(b)]; })); };
    tl.to(s[4].media, { scale: 1.03, duration: 2.0 }, 6.7)
      .to(s[4].light, { xPercent: 5 * m, yPercent: -5 * m, duration: 2.3 }, 6.7);
    textIn(s[4], T.s5In);
    linesIn(linesOf(q("h2", c5)), T.s5In + 0.02, 0.08);
    steps.forEach(function (li, i) {
      var at = T.s5In + 0.15 + i * 0.16;
      tl.to(li, { "--num": 1, duration: 0.3, ease: "sine.out" }, at);
      linesIn(linesOf(li), at + 0.03, 0.05);
    });
    var atQ = T.s5In + 0.15 + steps.length * 0.16;
    tl.to(quote, { "--rule": 1, duration: 0.35, ease: "sine.inOut" }, atQ);
    linesIn(linesOf(quote), atQ + 0.03, 0.06);
    hold(s[4], T.s5In + 0.35, T.s5Out);
    textOut(s[4], flat(l5), T.s5Out);
    // Fade into deep forest green, then a short hold before the pin releases.
    tl.to(green, { opacity: 1, duration: 0.5, ease: soft }, 8.85)
      .to({}, { duration: 0.15 }, 9.35);

    // Header links glide to these moments: each scene with its text fully shown.
    tl.addLabel("treatments", T.s3In + 0.95)
      .addLabel("doctor", T.s4In + 0.76)
      .addLabel("journey", T.s5In + 1.12);

    return tl;
  }

  /* ---------- The opening tagline (called by js/intro.js) ----------
     Time-based, not scroll-based: it plays once as the loading screen opens. */
  function playIntro() {
    var lines = intro.lines;
    if (!window.gsap || !lines.length) return;
    intro.tween = gsap.fromTo(lines, { yPercent: HIDE }, {
      yPercent: 0, duration: 1.3, ease: "power3.out", stagger: 0.12, delay: 0.35,
      onUpdate: function () {
        // If the visitor starts scrolling, hand the lines straight to the film.
        if (intro.tl && intro.tl.progress() > 0.01) this.progress(1).kill();
      }
    });
  }

  /* ---------- Scene 6: Booking (film mode) ----------
     The heading and intro rise in line by line, tied to the scroll.
     The texture drifts slightly, then stays still. The form and contact
     details fade in once (not scrubbed), so the form is never half-faded
     while someone is using it. */
  function buildBooking(opts) {
    var split = splitter(opts.cleanups, opts.split);
    var booking = q("#booking");
    var texture = q(".booking__texture", booking);
    var inner = q(".booking__inner", booking);
    var lines = flat([q("h2", inner), q(".booking__intro", inner)].map(split));
    var items = [q(".form", inner), q(".contact", inner), q(".footer p")];

    gsap.fromTo(texture, { y: 60 * (opts.desktop ? 1 : 0.5) }, {
      y: 0, ease: "none",
      scrollTrigger: { trigger: booking, start: "top bottom", end: "top top", scrub: true }
    });

    if (lines.length) {
      gsap.fromTo(lines, { yPercent: HIDE }, {
        yPercent: 0, ease: "power2.out", stagger: 0.12,
        scrollTrigger: { trigger: booking, start: "top 85%", end: "top 35%", scrub: 0.6 }
      });
    } else {
      items.unshift(q("h2", inner), q(".booking__intro", inner));
    }

    var reveal = gsap.fromTo(items, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "sine.out",
      scrollTrigger: { trigger: booking, start: "top 60%", toggleActions: "play none none reverse" }
    });

    // Keyboard safety: if anyone tabs into the form, show it immediately.
    var show = function () { reveal.progress(1); };
    booking.addEventListener("focusin", show);
    opts.cleanups.push(function () { booking.removeEventListener("focusin", show); });
  }

  /* ---------- Calm version (reduced motion, or the film can't fit) ----------
     No pinning, zooms or smooth scrolling.
     - Reduced motion: text simply fades in.
     - Otherwise (e.g. a phone held sideways): lines rise in, tied to scroll. */
  function buildCalm(opts) {
    intro.lines = []; intro.tl = null;
    var useLines = !opts.reduce && !!window.SplitText && opts.split !== false;
    var split = useLines ? splitter(opts.cleanups, true) : null;

    qa(".scene__content, .booking__inner").forEach(function (el) {
      if (useLines) {
        var isOpening = !!el.closest(".scene--opening");
        blocks(el).forEach(function (b) {
          if (b.closest(".form, .contact")) return;          // the form never moves
          var lines = split(b);
          if (isOpening) {                                    // above the fold: the intro handles it
            if (b.classList.contains("tagline")) {
              intro.lines = lines;
              if (!root.classList.contains("intro-done")) gsap.set(lines, { yPercent: HIDE });
            }
            return;
          }
          gsap.fromTo(lines, { yPercent: HIDE }, {
            yPercent: 0, ease: "power2.out", stagger: 0.1,
            scrollTrigger: { trigger: b, start: "top 94%", end: "top 70%", scrub: 0.6 }
          });
        });
        return;
      }
      var tween = gsap.fromTo(el, { opacity: 0 }, {
        opacity: 1, duration: 0.8, ease: "sine.out",
        scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none" }
      });
      var show = function () { tween.progress(1); };
      el.addEventListener("focusin", show);
      opts.cleanups.push(function () { el.removeEventListener("focusin", show); });
    });
  }

  return { buildFilm: buildFilm, buildBooking: buildBooking, buildCalm: buildCalm, playIntro: playIntro };
})();
