/* =========================================================
   DERMAÉ — treatment library
   - Builds one card per treatment from js/treatments-data.js.
   - Filters (All / Medical / Aesthetic) and a search box narrow the list
     instantly; nothing reloads.
   - "Read more" opens the treatment in a detail view (a modal dialog):
     Escape or the Close button closes it, Tab stays inside it while open,
     and focus returns to the card afterwards.
   - Each treatment has its own link, e.g. #treatment-acne, so it can be
     shared; opening that link opens the treatment.
   ========================================================= */
(function () {
  "use strict";

  var data = window.DermaeTreatments;
  var grid = document.getElementById("library-grid");
  var dialog = document.getElementById("treatment-dialog");
  if (!data || !grid || !dialog) return;

  var root = document.documentElement;
  var tools = document.querySelector(".library__tools");
  var filters = Array.prototype.slice.call(document.querySelectorAll(".library__filters .filter"));
  var search = document.getElementById("treatment-search");
  var status = document.getElementById("library-status");
  var empty = document.querySelector(".library__empty");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var LABEL = { medical: "Medical", aesthetic: "Aesthetic" };

  function film() { return window.DermaeFilm || {}; }

  /* Text helpers: escape everything, then allow **bold** from the data file. */
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function rich(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"); }
  // Lower-case and without accents, so "eczéma" still finds "Eczema".
  function plain(s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\*\*/g, ""); }

  /* ---------- Cards ---------- */
  var cards = data.map(function (t) {
    var li = document.createElement("li");
    li.className = "t-card";
    li.id = "treatment-" + t.id;
    li.setAttribute("data-category", t.category);
    li.innerHTML =
      '<p class="t-card__tag">' + LABEL[t.category] + "</p>" +
      '<h3 class="t-card__title">' + esc(t.name) + "</h3>" +
      '<p class="t-card__summary">' + rich(t.summary) + "</p>" +
      '<a class="t-card__link" href="#treatment-' + t.id + '">Read more<span class="visually-hidden"> about ' + esc(t.name) + "</span></a>";
    grid.appendChild(li);

    // Everything searchable for this treatment, in one plain string.
    var words = [t.name, LABEL[t.category], t.summary];
    t.sections.forEach(function (s) { words.push(s.title); ["text", "list", "after"].forEach(function (k) { if (s[k]) words = words.concat(s[k]); }); });
    return { t: t, el: li, link: li.querySelector(".t-card__link"), haystack: plain(words.join(" ")) };
  });
  var byId = {};
  cards.forEach(function (c) { byId[c.t.id] = c; });

  /* ---------- Filters and search ---------- */
  var state = { category: "all", query: "" };
  if (tools) tools.hidden = false;      // the controls only work with JavaScript

  var refreshTimer;
  function apply() {
    var terms = plain(state.query).split(/\s+/).filter(Boolean);
    var shown = 0;
    cards.forEach(function (c) {
      var okCat = state.category === "all" || c.t.category === state.category;
      var okText = terms.every(function (w) { return c.haystack.indexOf(w) !== -1; });
      c.el.hidden = !(okCat && okText);
      if (!c.el.hidden) shown++;
    });
    empty.hidden = shown !== 0;
    status.textContent = "Showing " + shown + (shown === 1 ? " treatment" : " treatments");
    // The page got shorter or longer: let the scroll animations re-measure.
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(function () {
      if (film().lenis) film().lenis.resize();
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    }, 150);
  }

  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      state.category = btn.getAttribute("data-filter");
      filters.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      apply();
    });
  });
  if (search) {
    search.addEventListener("input", function () { state.query = search.value; apply(); });
  }
  if (tools) tools.addEventListener("submit", function (e) { e.preventDefault(); });   // Enter never reloads
  var reset = document.querySelector("[data-reset]");
  if (reset) reset.addEventListener("click", function () {
    state.category = "all"; state.query = "";
    if (search) search.value = "";
    filters.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-filter") === "all")); });
    apply();
    if (search) search.focus();
  });

  /* ---------- Detail view ---------- */
  var tag = dialog.querySelector(".t-dialog__tag");
  var title = dialog.querySelector(".t-dialog__title");
  var summary = dialog.querySelector(".t-dialog__summary");
  var body = dialog.querySelector(".t-dialog__body");
  var panel = dialog.querySelector(".t-dialog__panel");
  var openCard = null, opener = null, closing = null;   // opener: the link that opened it

  function fill(t) {
    tag.textContent = LABEL[t.category];
    title.textContent = t.name;
    summary.innerHTML = rich(t.summary);
    body.innerHTML = t.sections.map(function (s) {
      var html = '<section class="t-dialog__section"><h3>' + esc(s.title) + "</h3>";
      (s.text || []).forEach(function (p) { html += "<p>" + rich(p) + "</p>"; });
      if (s.list) html += "<ul>" + s.list.map(function (li) { return "<li>" + rich(li) + "</li>"; }).join("") + "</ul>";
      (s.after || []).forEach(function (p) { html += "<p>" + rich(p) + "</p>"; });
      return html + "</section>";
    }).join("");
  }

  function setHash(hash) {
    // replaceState: change the address without jumping or adding history entries.
    try { history.replaceState(null, "", hash ? "#" + hash : location.pathname + location.search); } catch (e) {}
  }

  function focusables() {
    return Array.prototype.slice.call(dialog.querySelectorAll("a[href], button, [tabindex='-1']"))
      .filter(function (el) { return el.offsetParent !== null || el === title; });
  }

  function open(id, trigger) {
    var c = byId[id];
    if (!c) return;
    if (closing) { clearTimeout(closing); closing = null; dialog.close(); }
    openCard = c;
    opener = trigger || c.link;
    fill(c.t);
    panel.scrollTop = 0;
    if (!dialog.open) dialog.showModal();
    root.classList.add("dialog-is-open");
    if (film().lenis) film().lenis.stop();      // the page behind stays still
    requestAnimationFrame(function () { dialog.classList.add("is-open"); });
    title.focus();
    setHash("treatment-" + id);
  }

  // returnFocus: put focus back on the card's link (not when leaving for the booking form).
  function close(returnFocus) {
    if (!dialog.open || closing) return;
    dialog.classList.remove("is-open");
    root.classList.remove("dialog-is-open");
    if (film().lenis) film().lenis.start();
    setHash(null);
    var back = opener;
    var done = function () {
      closing = null;
      dialog.close();
      if (returnFocus !== false && back) back.focus({ preventScroll: true });
    };
    // Let the panel slide away first. With reduced motion there is no slide,
    // so close at once (the page behind can only take focus once it's closed).
    if (reduce.matches) done(); else closing = setTimeout(done, 420);
  }

  // Any link to a treatment (a card, or e.g. an FAQ answer) opens its detail
  // view right where you are, instead of jumping to the card. Closing it
  // returns focus to the link you clicked.
  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#treatment-"]') : null;
    if (!a || dialog.contains(a) || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var id = a.getAttribute("href").replace("#treatment-", "");
    if (!byId[id]) return;
    e.preventDefault();
    open(id, a);
  });

  dialog.addEventListener("cancel", function (e) { e.preventDefault(); close(); });   // Escape
  dialog.addEventListener("click", function (e) {
    if (e.target.closest("[data-close]")) { close(); return; }
    if (e.target.closest(".t-dialog__book")) { close(false); return; }   // js/nav.js then glides to booking
    if (e.target === dialog) close();      // a click on the dimmed backdrop
  });
  // Keep Tab inside the detail view while it is open.
  dialog.addEventListener("keydown", function (e) {
    if (e.key !== "Tab") return;
    var items = focusables();
    var i = items.indexOf(document.activeElement);
    var next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : (i === -1 || i === items.length - 1 ? 0 : i + 1);
    e.preventDefault();
    items[next].focus();
  });

  /* ---------- Shareable links: #treatment-acne ---------- */
  function idFromHash() {
    var m = /^#treatment-([a-z0-9-]+)$/.exec(location.hash || "");
    return m && byId[m[1]] ? m[1] : null;
  }
  window.addEventListener("hashchange", function () {
    var id = idFromHash();
    if (id) open(id);
  });
  // Opening the page with a treatment link: wait for the loading screen,
  // then open it (js/nav.js has already scrolled to the card).
  var startId = idFromHash();
  if (startId) {
    var whenReady = function () {
      if (root.classList.contains("intro-done")) { setTimeout(function () { open(startId); }, 600); return; }
      setTimeout(whenReady, 100);
    };
    whenReady();
  }

  apply();
  // Used by js/faq.js and js/assistant.js to name treatments; handy for testing too.
  window.DermaeLibrary = { open: open, close: close, name: function (id) { return byId[id] ? byId[id].t.name : null; } };
})();
