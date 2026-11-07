/* =========================================================
   DERMAÉ — FAQ accordion
   Builds the FAQ section from js/faq-data.js, grouped by category.
   - Each question is a button (aria-expanded, aria-controls) that shows
     or hides its answer. Several answers can be open at once.
   - Opening is a soft fade and rise of the answer (transform and opacity
     only); with reduced motion it simply appears.
   - Answers that mention treatments link to them (js/treatments.js opens
     the treatment's detail view).
   - Each question has its own link, e.g. #faq-how-do-i-book-an-appointment.
   ========================================================= */
(function () {
  "use strict";

  var data = window.DermaeFAQ;
  var wrap = document.getElementById("faq-groups");
  if (!data || !wrap) return;

  var NOTE = "General information only, not medical advice. A dermatologist will assess your individual needs.";
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function film() { return window.DermaeFilm || {}; }
  function treatmentName(id) { return window.DermaeLibrary && window.DermaeLibrary.name(id); }

  // Group the questions by category, keeping the order of the data file.
  var groups = [];
  data.forEach(function (item) {
    var g = groups.filter(function (x) { return x.name === item.category; })[0];
    if (!g) { g = { name: item.category, items: [] }; groups.push(g); }
    g.items.push(item);
  });

  /* The answer as HTML (also used by js/assistant.js). */
  function answerHTML(item) {
    var html = item.answer.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    var links = (item.see || []).filter(treatmentName).map(function (id) {
      return '<a href="#treatment-' + id + '">' + esc(treatmentName(id)) + "</a>";
    });
    if (links.length) html += '<p class="faq__see"><span>See:</span> ' + links.join(", ") + "</p>";
    return html;
  }

  var byId = {};
  wrap.innerHTML = groups.map(function (g, gi) {
    var gid = "faq-group-" + gi;
    return '<div class="faq__group" data-reveal>' +
      '<h3 class="faq__category" id="' + gid + '">' + esc(g.name) + "</h3>" +
      '<div class="faq__list">' +
      g.items.map(function (item) {
        var qid = "faq-" + item.id, aid = qid + "-answer";
        return '<div class="faq__item" id="' + qid + '">' +
          '<h4 class="faq__q"><button type="button" class="faq__button" aria-expanded="false" aria-controls="' + aid + '">' +
          '<span class="faq__q-text">' + esc(item.question) + '</span><span class="faq__icon" aria-hidden="true"></span></button></h4>' +
          '<div class="faq__a" id="' + aid + '" hidden><div class="faq__a-inner">' + answerHTML(item) + "</div></div></div>";
      }).join("") +
      (g.name === "Treatments" ? '<p class="note--medical faq__note">' + NOTE + "</p>" : "") +
      "</div></div>";
  }).join("");

  data.forEach(function (item) {
    var el = document.getElementById("faq-" + item.id);
    byId[item.id] = { item: item, el: el, button: el.querySelector(".faq__button"), panel: el.querySelector(".faq__a") };
  });

  /* ---------- Opening and closing ---------- */
  var refreshTimer;
  function remeasure() {
    // The page got longer or shorter: let the scroll animations re-measure.
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(function () {
      if (film().lenis) film().lenis.resize();
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    }, 200);
  }

  function setOpen(entry, open) {
    entry.button.setAttribute("aria-expanded", String(open));
    entry.el.classList.toggle("is-open", open);
    if (open) {
      entry.panel.hidden = false;
      // Next frame, so the soft rise plays from its starting position.
      entry.panel.classList.remove("is-shown");
      requestAnimationFrame(function () { requestAnimationFrame(function () { entry.panel.classList.add("is-shown"); }); });
    } else {
      entry.panel.classList.remove("is-shown");
      entry.panel.hidden = true;
    }
    remeasure();
  }

  wrap.addEventListener("click", function (e) {
    var btn = e.target.closest ? e.target.closest(".faq__button") : null;
    if (!btn) return;
    var id = btn.closest(".faq__item").id.replace(/^faq-/, "");
    setOpen(byId[id], btn.getAttribute("aria-expanded") !== "true");
  });

  /* Open one question, bring it into view and focus it (used by the assistant). */
  function reveal(id) {
    var entry = byId[id];
    if (!entry) return;
    if (entry.button.getAttribute("aria-expanded") !== "true") setOpen(entry, true);
    var y = entry.el.getBoundingClientRect().top + window.pageYOffset - window.innerHeight * 0.25;
    var lenis = film().lenis;
    if (lenis) lenis.scrollTo(Math.max(0, y), { duration: 1.2 });
    else window.scrollTo({ top: Math.max(0, y), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    entry.button.focus({ preventScroll: true });
  }

  // A link to one question, e.g. #faq-can-i-use-health-insurance
  function fromHash() {
    var m = /^#faq-([a-z0-9-]+)$/.exec(location.hash || "");
    if (m && byId[m[1]]) setOpen(byId[m[1]], true);
  }
  fromHash();
  window.addEventListener("hashchange", fromHash);

  window.DermaeFAQPage = { reveal: reveal, answerHTML: answerHTML };
})();
