/* =========================================================
   DERMAÉ — FAQ assistant
   A small, free helper that answers ONLY from js/faq-data.js.
   No API, no external service, and nothing is stored: the conversation
   lives on the page and is cleared when the panel closes.

   How it answers a typed message:
   1. Safety first. If the message mentions symptoms, a diagnosis,
      medicines or anything urgent, it always gives the safety reply.
   2. Otherwise it scores every FAQ question by matching words: a word in
      the question's keywords counts most, then words in the question,
      then words in the answer. The best match is shown if it scores well
      enough; if not, the fallback reply with links to the FAQ and Booking.

   Accessibility: opens and closes with the keyboard, Escape closes it,
   Tab stays inside while open, focus returns to the button, and new
   replies are announced (the conversation is an aria-live "log").
   ========================================================= */
(function () {
  "use strict";

  var data = window.DermaeFAQ;
  var launcher = document.querySelector(".assistant-launcher");
  var panel = document.getElementById("assistant");
  if (!data || !launcher || !panel || !panel.showModal) return;

  var log = panel.querySelector(".assistant__log");
  var form = panel.querySelector(".assistant__form");
  var input = document.getElementById("assistant-input");
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Approved copy (CONTENT.md, "FAQ assistant") ---------- */
  var COPY = {
    welcome: "Hello. I can answer common questions about appointments, consultations, fees, privacy and treatments, using the answers in our FAQ. I’m an automated assistant, not a doctor, so I can’t give medical advice.",
    suggestions: [
      "How do I book an appointment?",
      "What should I bring to my first appointment?",
      "How much does a consultation cost?",
      "Will you take photographs of my skin?",
      "Is DERMAÉ a real clinic?"
    ],
    fromFaq: "From our FAQ:",
    readInFaq: "Read it in the FAQ",
    fallback: "Sorry, I couldn’t find an answer to that in our FAQ. You can browse all the questions, or request a consultation and the team will help.",
    safety: "I can’t give medical advice, or assess symptoms, diagnoses or medicines. A dermatologist can help at a consultation, so please consider booking one. If your symptoms are severe or spreading quickly, or you feel very unwell, seek urgent medical care now, or call your local emergency number.",
    browse: "Browse the FAQ",
    book: "Book a consultation",
    note: "General information only, not medical advice. A dermatologist will assess your individual needs."
  };

  function film() { return window.DermaeFilm || {}; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  /* ---------- Understanding a message ---------- */
  // Words that carry no meaning for matching.
  var STOP = {};
  ("a an the i im i'm me my mine we us our you your it its is are was were be been am do does did doing done can could " +
   "will would should shall may might must to of in on at for from by with about into and or but if so as than then this " +
   "that these those there here what how who whom whose why please hi hello hey thanks thank tell know want like get got " +
   "have has had any some just also really very one take").split(" ").forEach(function (w) { STOP[w] = true; });

  function words(text) {
    return String(text).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[’']/g, "").replace(/[^a-z0-9]+/g, " ").split(" ")
      .filter(function (w) { return w && !STOP[w]; })
      .map(function (w) { return w.length > 4 && /s$/.test(w) && !/ss$/.test(w) ? w.slice(0, -1) : w; });   // "sessions" → "session"
  }
  function set(list) { var s = {}; list.forEach(function (w) { s[w] = true; }); return s; }

  var index = data.map(function (item) {
    // The treatments an answer links to (e.g. "Laser treatments") count as weak answer words.
    var seeNames = (item.see || []).map(function (id) { return id.replace(/-/g, " "); }).join(" ");
    return { item: item, kw: set(words(item.keywords)), q: set(words(item.question)), a: set(words(item.answer.join(" ") + " " + seeNames)) };
  });

  // Rare words are better clues than common ones: "reschedule" appears in
  // one question, "appointment" in many. A word's weight grows the fewer
  // questions it appears in (its keywords or the question itself).
  var df = {};
  index.forEach(function (e) {
    var seen = {};
    Object.keys(e.kw).concat(Object.keys(e.q)).forEach(function (w) { if (!seen[w]) { seen[w] = true; df[w] = (df[w] || 0) + 1; } });
  });
  function weight(w) { return Math.log((index.length + 1) / ((df[w] || 0) + 0.5)); }

  // Symptoms, diagnosis, medicines or anything urgent → the safety reply.
  var SAFETY = new RegExp("\\b(" + [
    "symptoms?", "rash(es)?", "itch(y|ing|es)?", "bleed(s|ing)?", "bled", "blisters?", "blistering", "lumps?", "swollen",
    "spreading", "fever", "infect(ed|ion|ions)?", "diagnos\\w*", "cancer\\w*", "melanoma", "moles?", "burn(s|ing|ed)?",
    "medicines?", "medications?", "drugs?", "prescri\\w*", "doses?", "dosage", "tablets?", "pills?", "antibiotics?",
    "steroids?", "creams? for", "should i (use|take|apply)", "is (this|it) (normal|serious|cancer)", "do i have",
    "what is wrong", "urgent(ly)?", "emergency", "allerg\\w*", "anaphyla\\w*", "breath(e|ing)?", "can'?t breathe"
  ].join("|") + ")\\b", "i");

  function bestMatch(text) {
    // A suggested question (or the exact wording) always finds its own answer.
    var exact = data.filter(function (i) { return i.question.toLowerCase() === text.trim().toLowerCase(); })[0];
    if (exact) return exact;
    var q = words(text);
    if (!q.length) return null;
    var best = null, bestScore = 0, bestCover = 0;
    index.forEach(function (e) {
      var score = 0, found = 0;
      q.forEach(function (w) {
        var hit = (e.kw[w] ? 3 : 0) + (e.q[w] ? 2 : 0) + (e.a[w] ? 0.5 : 0);
        if (hit) { score += hit * weight(w); found++; }
      });
      if (score > bestScore) { best = e.item; bestScore = score; bestCover = found / q.length; }
    });
    // Only answer when the match is strong AND covers most of what was asked
    // (or half of it, when the matching word is a very distinctive one);
    // otherwise it's a guess, so use the fallback.
    return (bestScore >= 4 && bestCover > 0.5) || (bestScore >= 6 && bestCover >= 0.5) ? best : null;
  }

  /* ---------- Messages ---------- */
  function add(html, who) {
    var div = document.createElement("div");
    div.className = "assistant__msg assistant__msg--" + who;
    div.innerHTML = html;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
    return div;
  }
  var linkBook = '<a href="#booking" data-nav="booking">' + COPY.book + "</a>";
  var linkFaq = '<a href="#faq" data-nav="faq">' + COPY.browse + "</a>";

  function reply(text) {
    if (SAFETY.test(text)) {
      return add("<p>" + COPY.safety + '</p><p class="assistant__links">' + linkBook + "</p>", "bot");
    }
    var item = bestMatch(text);
    if (!item) {
      return add("<p>" + COPY.fallback + '</p><p class="assistant__links">' + linkFaq + " · " + linkBook + "</p>", "bot");
    }
    var answer = window.DermaeFAQPage ? window.DermaeFAQPage.answerHTML(item) : "<p>" + esc(item.answer.join(" ")) + "</p>";
    var note = item.category === "Treatments" ? '<p class="assistant__note">' + COPY.note + "</p>" : "";
    return add('<p class="assistant__from">' + COPY.fromFaq + '</p><p class="assistant__q">' + esc(item.question) + "</p>" +
      answer + note + '<p class="assistant__links"><a href="#faq-' + item.id + '" data-faq="' + item.id + '">' + COPY.readInFaq + "</a></p>", "bot");
  }

  function ask(text) {
    text = String(text).trim();
    if (!text) return;
    add("<p>" + esc(text) + "</p>", "user");
    // A short pause reads more naturally and lets screen readers announce the reply separately.
    setTimeout(function () { reply(text); }, reduce.matches ? 0 : 350);
  }

  function welcome() {
    add("<p>" + COPY.welcome + "</p>", "bot");
    var box = add("", "suggest");
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", "Suggested questions");
    COPY.suggestions.forEach(function (s) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "assistant__chip";
      b.textContent = s;
      box.appendChild(b);
    });
  }

  /* ---------- Opening and closing ---------- */
  function open() {
    log.innerHTML = "";
    welcome();
    panel.showModal();
    root.classList.add("assistant-is-open");
    if (film().lenis) film().lenis.stop();
    requestAnimationFrame(function () { panel.classList.add("is-open"); });
    input.focus();
  }
  function close(returnFocus) {
    if (!panel.open) return;
    panel.classList.remove("is-open");
    root.classList.remove("assistant-is-open");
    panel.close();
    log.innerHTML = "";                   // nothing is kept
    input.value = "";
    if (film().lenis) film().lenis.start();
    if (returnFocus !== false) launcher.focus();
  }

  launcher.hidden = false;
  launcher.addEventListener("click", open);
  panel.addEventListener("cancel", function (e) { e.preventDefault(); close(); });   // Escape
  form.addEventListener("submit", function (e) { e.preventDefault(); var t = input.value; input.value = ""; ask(t); input.focus(); });

  panel.addEventListener("click", function (e) {
    if (e.target === panel) { close(); return; }                     // click outside the panel box
    if (e.target.closest("[data-close]")) { close(); return; }
    var chip = e.target.closest(".assistant__chip");
    if (chip) { ask(chip.textContent); return; }
    var a = e.target.closest("a");
    if (!a) return;
    var href = a.getAttribute("href") || "";
    if (a.hasAttribute("data-faq")) {                                  // "Read it in the FAQ"
      e.preventDefault();
      var id = a.getAttribute("data-faq");
      close(false);
      if (window.DermaeFAQPage) window.DermaeFAQPage.reveal(id);
    } else if (/^#treatment-/.test(href) && window.DermaeLibrary) {     // a treatment: open its detail view
      e.preventDefault(); e.stopPropagation();
      close(false);
      window.DermaeLibrary.open(href.replace("#treatment-", ""), launcher);
    } else if (a.hasAttribute("data-nav")) {
      close(false);                                                    // js/nav.js then glides there
    }
  });

  // Keep Tab inside the panel while it is open.
  panel.addEventListener("keydown", function (e) {
    if (e.key !== "Tab") return;
    var items = Array.prototype.slice.call(panel.querySelectorAll("button, a[href], input"));
    var i = items.indexOf(document.activeElement);
    var next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : (i === -1 || i === items.length - 1 ? 0 : i + 1);
    e.preventDefault();
    items[next].focus();
  });

  window.DermaeAssistant = { open: open, close: close, match: bestMatch, isSafety: function (t) { return SAFETY.test(t); } };   // for testing
})();
