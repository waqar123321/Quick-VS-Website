(() => {
  "use strict";
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
  function closeNav() { if (nav && toggle) { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); } }
  if (nav && toggle) {
    toggle.addEventListener("click", () => toggle.setAttribute("aria-expanded", String(nav.classList.toggle("is-open"))));
    nav.addEventListener("click", event => { if (event.target.closest("a")) closeNav(); });
    document.addEventListener("keydown", event => { if (event.key === "Escape") closeNav(); });
  }

  const consentKey = "qsv-analytics-consent-v1";
  const measurementId = window.qsvAnalyticsId;
  const panel = document.querySelector("[data-consent-panel]");
  let analyticsAllowed = false;
  let tagLoaded = false;
  let settingsTrigger = null;
  function readChoice() {
    try {
      const choice = JSON.parse(localStorage.getItem(consentKey));
      return choice && typeof choice.analytics === "boolean" && choice.expiresAt > Date.now() ? choice : null;
    } catch (_) { return null; }
  }
  function safePageUrl(value) {
    try { const url = new URL(value); return url.origin + url.pathname; } catch (_) { return ""; }
  }
  function clearAnalyticsCookies() {
    const hostname = location.hostname;
    const domains = ["", hostname, "." + hostname];
    if (hostname.endsWith("quickvs.com")) domains.push(".quickvs.com");
    document.cookie.split(";").forEach(cookie => {
      const name = cookie.split("=")[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) return;
      domains.forEach(domain => {
        document.cookie = name + "=; Max-Age=0; path=/; SameSite=Lax" + (domain ? "; domain=" + domain : "");
      });
    });
  }
  function applyChoice(allow) {
    analyticsAllowed = allow;
    if (!measurementId || typeof window.gtag !== "function") return;
    window["ga-disable-" + measurementId] = !allow;
    window.gtag("consent", "update", {
      analytics_storage: allow ? "granted" : "denied",
      ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied"
    });
    if (!allow) { clearAnalyticsCookies(); return; }
    if (tagLoaded) return;
    tagLoaded = true;
    const tag = document.createElement("script");
    tag.async = true;
    tag.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
    document.head.appendChild(tag);
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: safePageUrl(location.href),
      page_referrer: safePageUrl(document.referrer)
    });
  }
  function saveChoice(allow) {
    try { localStorage.setItem(consentKey, JSON.stringify({analytics: allow, expiresAt: Date.now() + 180 * 86400000})); } catch (_) {}
    applyChoice(allow);
    if (panel) panel.hidden = true;
    if (settingsTrigger) { settingsTrigger.focus(); settingsTrigger = null; }
  }
  const choice = readChoice();
  if (choice) applyChoice(choice.analytics);
  else if (panel) panel.hidden = false;
  document.querySelectorAll("[data-consent]").forEach(button => button.addEventListener("click", () => saveChoice(button.dataset.consent === "accept")));
  document.querySelectorAll("[data-cookie-settings]").forEach(button => button.addEventListener("click", () => {
    settingsTrigger = button;
    if (panel) { panel.hidden = false; panel.querySelector("button").focus(); }
  }));

  document.addEventListener("click", event => {
    const anchor = event.target.closest("a[href]");
    if (!anchor || !analyticsAllowed || typeof window.gtag !== "function" || event.defaultPrevented) return;
    let url;
    try { url = new URL(anchor.getAttribute("href"), location.href); } catch (_) { return; }
    let name;
    if (url.protocol === "tel:" && url.pathname.replace(/\D/g, "") === "447522179040") name = "phone_call_click";
    else if (url.protocol === "https:" && url.hostname === "wa.me" && url.pathname === "/447522179040") name = "whatsapp_click";
    else if (url.protocol === "mailto:" && url.pathname.toLowerCase() === "info@quickvs.com") name = "email_click";
    else if (url.protocol === "https:" && url.hostname === "maps.google.com" && url.searchParams.get("cid") === "2157141621358514254") name = "directions_click";
    if (!name) return;
    // Track the channel and page only; never the customer's registration or message.
    window.gtag("event", name, {
      send_to: measurementId,
      contact_location: anchor.dataset.contactLocation || "content",
      page_path: location.pathname,
      transport_type: "beacon"
    });
  });
})();
