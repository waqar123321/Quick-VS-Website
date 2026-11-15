(() => {
  const sections = [...document.querySelectorAll('details.mobile-explanation')];
  const phone = window.matchMedia('(max-width: 767px)');
  function reveal(hash) {
    if (!hash) return;
    let id;
    try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    const section = target?.closest('details.mobile-explanation');
    if (section) section.open = true;
  }
  const revealHash = () => reveal(window.location.hash);
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
  if (sections.length) {
    phone.addEventListener('change', setViewport);
    window.addEventListener('hashchange', revealHash);
    // Open the section before the browser scrolls, including repeated clicks.
    document.addEventListener('click', event => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest('a[href^="#"]');
      if (link) reveal(link.hash);
    });
    setViewport();
  }

  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    const update = () => {
      const hidden = window.scrollY < 320;
      if (backToTop.hidden !== hidden) backToTop.hidden = hidden;
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }
})();
