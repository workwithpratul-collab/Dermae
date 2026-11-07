/* =========================================================
   DERMAÉ — contact map (click to load)
   Nothing loads from OpenStreetMap until the visitor presses "Show map",
   so the map never slows the page down. The location is a neutral demo
   spot, set once on the map element (data-lat / data-lon in index.html).
   ========================================================= */
(function () {
  "use strict";

  var map = document.querySelector(".contact-map");
  if (!map) return;
  var button = map.querySelector(".contact-map__button");
  var frame = map.querySelector(".contact-map__frame");
  var lat = parseFloat(map.getAttribute("data-lat"));
  var lon = parseFloat(map.getAttribute("data-lon"));
  if (!button || !frame || isNaN(lat) || isNaN(lon)) return;

  button.hidden = false;     // the button only works with JavaScript

  button.addEventListener("click", function () {
    var d = 0.006;           // how much area around the spot to show
    var src = "https://www.openstreetmap.org/export/embed.html?bbox=" +
      [lon - d * 1.6, lat - d, lon + d * 1.6, lat + d].map(function (n) { return n.toFixed(4); }).join("%2C") +
      "&layer=mapnik&marker=" + lat.toFixed(4) + "%2C" + lon.toFixed(4);
    var iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.title = "Map of the demo location";
    iframe.referrerPolicy = "no-referrer";
    frame.innerHTML = "";
    frame.appendChild(iframe);
    // Keep the map clearly labelled as a demo once it has loaded.
    var badge = document.createElement("span");
    badge.className = "contact-map__badge";
    badge.textContent = "Demo location";
    frame.appendChild(badge);
    frame.classList.add("is-loaded");
    iframe.focus();
  });
})();
