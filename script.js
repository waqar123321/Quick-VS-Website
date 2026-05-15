const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const year = document.querySelector("[data-year]");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (nav && navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

window.loadJotForm = () => {
  const placeholder = document.getElementById("jotform-placeholder");

  if (!placeholder) {
    return;
  }

  placeholder.innerHTML =
    '<iframe src="https://form.jotform.com/250505154565050" width="100%" height="560" style="border:1px solid #dde3ea;border-radius:8px;" loading="lazy" title="Quick Solution Vehicles booking form"></iframe>';
};
