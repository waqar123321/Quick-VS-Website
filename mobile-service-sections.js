(() => {
  const sections = [...document.querySelectorAll('details.mobile-explanation')];
  if (!sections.length) return;
  const phone = window.matchMedia('(max-width: 767px)');
  function revealHash() {
    if (!window.location.hash) return;
    let id;
    try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    const section = target?.closest('details.mobile-explanation');
    if (section) section.open = true;
  }
  function setViewport() {
    sections.forEach(section => {
      section.open = !phone.matches;
      const summary = section.querySelector(':scope > summary');
      if (phone.matches) summary.removeAttribute('tabindex');
      else summary.setAttribute('tabindex', '-1');
    });
    revealHash();
  }
  sections.forEach(section => section.addEventListener('click', event => {
    if (!phone.matches && event.target.closest('summary')?.parentElement === section) event.preventDefault();
  }));
  phone.addEventListener('change', setViewport);
  window.addEventListener('hashchange', revealHash);
  // Clicking an already-current fragment should also reopen its section.
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (link && link.getAttribute('href') === window.location.hash) revealHash();
  });
  setViewport();
})();
