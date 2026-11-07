/* =========================================================
   DERMAÉ — booking form
   - Checks the fields and shows clear messages next to them.
   - While the Formspree address is still a placeholder, it never
     sends anything and never says a request was sent.
   - Once a real Formspree ID is in index.html, it sends the form
     in the background and shows the result on the page.
   Without JavaScript the form still works as a normal HTML form.
   ========================================================= */
(function () {
  "use strict";

  var form = document.getElementById("booking-form");
  if (!form) return;

  var statusEl = document.getElementById("form-status");
  var demoNote = form.querySelector("[data-demo-note]");
  var button = form.querySelector('button[type="submit"]');
  var dateInput = document.getElementById("date");

  // The form address lives in ONE place: the form's action in index.html
  // (marked "FORM ENDPOINT"). The placeholder there means "not connected yet".
  var isPlaceholder = /YOUR_FORM_ID/.test(form.getAttribute("action") || "");

  // Hide the "not connected" note once a real ID is in place.
  if (demoNote && !isPlaceholder) demoNote.hidden = true;

  // We show our own messages instead of the browser's pop-up bubbles.
  form.noValidate = true;

  // Don't allow dates in the past (uses the visitor's local date).
  if (dateInput) {
    var now = new Date();
    var pad = function (n) { return String(n).padStart(2, "0"); };
    dateInput.min = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());
  }

  var messages = {
    name: "Please enter your name.",
    email: {
      valueMissing: "Please enter your email address.",
      typeMismatch: "Please enter a full email address, like name@example.com."
    },
    "appointment-type": "Please choose an appointment type.",
    date: {
      valueMissing: "Please choose a preferred date.",
      rangeUnderflow: "Please choose a date from today onwards.",
      badInput: "Please enter a valid date."
    },
    time: { badInput: "Please enter a valid time." },
    phone: {}
  };

  function messageFor(field) {
    var v = field.validity;
    var m = messages[field.id];
    if (!m) return "Please check this field.";
    if (typeof m === "string") return m;
    for (var key in m) { if (v[key]) return m[key]; }
    return "Please check this field.";
  }

  function showError(field, text) {
    var err = document.getElementById(field.id + "-error");
    field.setAttribute("aria-invalid", "true");
    if (err) {
      err.textContent = text;
      err.hidden = false;
      field.setAttribute("aria-describedby", err.id);
    }
  }

  function clearError(field) {
    var err = document.getElementById(field.id + "-error");
    field.removeAttribute("aria-invalid");
    field.removeAttribute("aria-describedby");
    if (err) { err.textContent = ""; err.hidden = true; }
  }

  function setStatus(text, state) {
    statusEl.textContent = text;
    if (state) statusEl.setAttribute("data-state", state);
    else statusEl.removeAttribute("data-state");
  }

  var fields = Array.prototype.slice.call(form.querySelectorAll(".field input, .field select"));

  // Clear a field's error as soon as the visitor fixes it.
  fields.forEach(function (field) {
    var evt = field.tagName === "SELECT" ? "change" : "input";
    field.addEventListener(evt, function () {
      if (field.getAttribute("aria-invalid") === "true" && field.checkValidity()) clearError(field);
    });
  });

  function validate() {
    var firstInvalid = null;
    fields.forEach(function (field) {
      if (field.checkValidity()) {
        clearError(field);
      } else {
        showError(field, messageFor(field));
        if (!firstInvalid) firstInvalid = field;
      }
    });
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    setStatus("", null);

    if (!validate()) {
      setStatus("Some details need checking. Please see the highlighted fields.", "error");
      return;
    }

    // Not connected yet: be honest, send nothing.
    if (isPlaceholder) {
      setStatus("Thank you. This is a demo form, so nothing has been sent.", "error");
      return;
    }

    button.disabled = true;
    setStatus("Sending…", null);

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Request failed: " + response.status);
        form.reset();
        setStatus("Thank you. Your request has been sent, and our team will contact you to confirm the details.", "success");
      })
      .catch(function () {
        setStatus("Sorry, your request couldn't be sent. Please try again, or email hello@dermae.example.", "error");
      })
      .then(function () {
        button.disabled = false;
      });
  });
})();
