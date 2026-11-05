(() => {
  "use strict";
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const servicesMenu = document.querySelector("[data-services-menu]");
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
  function closeNav() {
    if (nav && toggle) { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); }
    if (servicesMenu) servicesMenu.open = false;
  }
  if (nav && toggle) {
    toggle.addEventListener("click", () => toggle.setAttribute("aria-expanded", String(nav.classList.toggle("is-open"))));
    nav.addEventListener("click", event => { if (event.target.closest("a")) closeNav(); });
    document.addEventListener("keydown", event => { if (event.key === "Escape") closeNav(); });
  }
  if (servicesMenu) {
    document.addEventListener("click", event => {
      if (!servicesMenu.contains(event.target)) servicesMenu.open = false;
    });
  }

  const mobileBar = document.querySelector(".mobile-call-bar");
  const heroButtons = [...document.querySelectorAll(".page-hero .call-first, .wet-hero .call-first")]
    .flatMap(group => [...group.querySelectorAll(".button-primary, .button-whatsapp")]);
  if (mobileBar && heroButtons.length === 2 && "IntersectionObserver" in window) {
    const visibleButtons = new Set();
    const headerHeight = document.querySelector(".site-header")?.offsetHeight || 0;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.intersectionRatio >= 0.99) visibleButtons.add(entry.target);
        else visibleButtons.delete(entry.target);
      }
      mobileBar.hidden = visibleButtons.size === heroButtons.length;
    }, { rootMargin: "-"+headerHeight+"px 0px 0px", threshold: 0.99 });
    heroButtons.forEach(button => observer.observe(button));
  }

  const consentKey = window.qsvConsentKey;
  const measurementId = window.qsvAnalyticsId;
  const panel = document.querySelector("[data-consent-panel]");
  let analyticsAllowed = false;
  let tagLoaded = false;
  let settingsTrigger = null;
  function safePageUrl(value) {
    try {
      const url = new URL(value);
      const allowed = new Set(["gclid", "gbraid", "wbraid", "gad_source", "gad_campaignid",
        "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]);
      // Keep attribution values as supplied, including their original URL encoding.
      // All other query parameters and the fragment remain excluded.
      const query = url.search.slice(1).split("&").filter(part =>
        allowed.has(new URLSearchParams(part).keys().next().value)).join("&");
      return url.origin + url.pathname + (query ? "?" + query : "");
    } catch (_) { return ""; }
  }
  function workshopCampaign() {
    // Retain only the fixed, non-personal labels used by our GBP post links.
    // Arbitrary query strings, registration numbers and messages remain excluded.
    const query = new URL(location.href).searchParams;
    const content = query.get("utm_content");
    if (query.get("utm_source") !== "google" || query.get("utm_medium") !== "organic" ||
        query.get("utm_campaign") !== "gbp_workshop" ||
        !["block_assessment", "vito_workshop", "top_end_inspection", "rebuild_quote"].includes(content)) return {};
    return {campaign_source: "google", campaign_medium: "organic", campaign_name: "gbp_workshop", campaign_content: content};
  }
  function clearAnalyticsCookies() {
    const hostname = location.hostname;
    const domains = ["", hostname, "." + hostname];
    if (hostname.endsWith("quickvs.com")) domains.push(".quickvs.com");
    document.cookie.split(";").forEach(cookie => {
      const name = cookie.split("=")[0].trim();
      if (!/^_ga(?:_|$)|^_gcl_/.test(name)) return;
      domains.forEach(domain => {
        document.cookie = name + "=; Max-Age=0; path=/; SameSite=Lax" + (domain ? "; domain=" + domain : "");
      });
    });
  }
  function applyChoice(allow) {
    analyticsAllowed = allow;
    if (!allow) clearAnalyticsCookies();
    if (!measurementId || typeof window.gtag !== "function") return;
    window["ga-disable-" + measurementId] = !allow;
    window.gtag("consent", "update", {
      analytics_storage: allow ? "granted" : "denied",
      ad_storage: allow ? "granted" : "denied",
      ad_user_data: allow ? "granted" : "denied", ad_personalization: "denied"
    });
    if (!allow) return;
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
      page_referrer: safePageUrl(document.referrer),
      ...workshopCampaign()
    });
  }
  function saveChoice(allow) {
    try { localStorage.setItem(consentKey, JSON.stringify({analytics: allow, expiresAt: Date.now() + 180 * 86400000})); } catch (_) {}
    applyChoice(allow);
    if (panel) panel.hidden = true;
    if (settingsTrigger) { settingsTrigger.focus(); settingsTrigger = null; }
  }
  const choice = window.qsvSavedConsent;
  if (choice) applyChoice(choice.analytics);
  else {
    clearAnalyticsCookies();
    if (panel) panel.hidden = false;
  }
  document.documentElement.removeAttribute("data-consent-pending");
  document.querySelectorAll("[data-consent]").forEach(button => button.addEventListener("click", () => saveChoice(button.dataset.consent === "accept")));
  document.querySelectorAll("[data-cookie-settings]").forEach(button => button.addEventListener("click", () => {
    settingsTrigger = button;
    if (panel) { panel.hidden = false; panel.querySelector("button").focus(); }
  }));

  document.addEventListener("qsv:quote-success", event => {
    if (!analyticsAllowed || !measurementId || typeof window.gtag !== "function") return;
    window.gtag("event", "generate_lead", {
      send_to: measurementId,
      job_type: event.detail,
      page_path: location.pathname
    });
  });

  document.addEventListener("click", event => {
    const anchor = event.target.closest("a[href]");
    if (!anchor || !analyticsAllowed || typeof window.gtag !== "function" || event.defaultPrevented) return;
    if (event.target.closest(".quote-trust")) return;
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
