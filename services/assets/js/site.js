(function () {
  "use strict";

  /* Opening hours come from assets/js/config.js (London time, index 0 = Sunday, minutes since midnight). */
  var HOURS = window.SITE_HOURS;
  var DAY = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  var DAY_NAME = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  function fmt(min) {
    var h = Math.floor(min / 60), m = min % 60, ap = h >= 12 ? "pm" : "am";
    h = h % 12 || 12;
    return h + ":" + (m < 10 ? "0" : "") + m + " " + ap;
  }

  function londonNow() {
    var parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23"
    }).formatToParts(new Date());
    var o = {};
    parts.forEach(function (p) { o[p.type] = p.value; });
    return { day: DAY[o.weekday], min: parseInt(o.hour, 10) * 60 + parseInt(o.minute, 10) };
  }

  function statusText(now) {
    var today = HOURS[now.day];
    if (now.min >= today[0] && now.min < today[1]) {
      return { state: "open", text: "Open today until " + fmt(today[1]) };
    }
    if (now.min < today[0]) {
      return { state: "closed", text: "Closed. Opens today at " + fmt(today[0]) };
    }
    var next = (now.day + 1) % 7;
    return { state: "closed", text: "Closed. Opens " + (next === 0 ? "Sunday" : DAY_NAME[next]) + " at " + fmt(HOURS[next][0]) };
  }

  try {
    var now = londonNow();
    var s = statusText(now);
    document.querySelectorAll("[data-open-status]").forEach(function (el) {
      el.textContent = s.text;
      el.setAttribute("data-state", s.state);
    });
    document.querySelectorAll("[data-hours] tr[data-day]").forEach(function (row) {
      if (parseInt(row.getAttribute("data-day"), 10) === now.day) { row.classList.add("is-today"); }
    });
  } catch (e) { /* status stays as server-rendered fallback */ }

  /* Full-screen mobile menu */
  var drawer = document.getElementById("drawer");
  var burger = document.querySelector("[data-open-drawer]");
  var closeBtn = document.querySelector("[data-close-drawer]");
  function setDrawer(open) {
    if (!drawer) { return; }
    drawer.hidden = !open;
    if (burger) { burger.setAttribute("aria-expanded", String(open)); }
    document.body.style.overflow = open ? "hidden" : "";
    if (open && closeBtn) { closeBtn.focus(); }
    if (!open && burger) { burger.focus(); }
  }
  if (burger) { burger.addEventListener("click", function () { setDrawer(true); }); }
  if (closeBtn) { closeBtn.addEventListener("click", function () { setDrawer(false); }); }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && drawer && !drawer.hidden) { setDrawer(false); }
  });
  if (drawer) {
    drawer.addEventListener("click", function (e) {
      if (e.target.closest("a")) { setDrawer(false); }
    });
  }

  /* Gallery filters */
  var chips = document.querySelectorAll("[data-filter]");
  if (chips.length) {
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var f = chip.getAttribute("data-filter");
        chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
        document.querySelectorAll("[data-tags]").forEach(function (tile) {
          var tags = tile.getAttribute("data-tags").split(" ");
          tile.hidden = !(f === "all" || tags.indexOf(f) !== -1);
        });
      });
    });
  }

  /* Review carousel */
  var carousel = document.querySelector("[data-carousel]");
  document.querySelectorAll("[data-carousel-dir]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!carousel) { return; }
      var dir = parseInt(btn.getAttribute("data-carousel-dir"), 10);
      carousel.scrollBy({ left: dir * (carousel.clientWidth * 0.8), behavior: "smooth" });
    });
  });

  /* Demo-only form handling */
  var toast = document.querySelector(".toast");
  function showToast(msg) {
    if (!toast) { return; }
    toast.textContent = msg;
    toast.classList.add("show");
    window.setTimeout(function () { toast.classList.remove("show"); }, 3200);
  }
  document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll(".field").forEach(function (field) {
        var input = field.querySelector("input, select, textarea");
        var bad = input && input.hasAttribute("required") && !input.value.trim();
        field.classList.toggle("is-invalid", !!bad);
        if (input) { input.setAttribute("aria-invalid", bad ? "true" : "false"); }
        if (bad) { ok = false; }
      });
      var consent = form.querySelector("input[type=checkbox][required]");
      if (consent && !consent.checked) { ok = false; }
      if (ok) { showToast("Demo form. Nothing was sent."); form.reset(); }
      else { showToast("Please complete the highlighted fields."); }
    });
  });
})();
