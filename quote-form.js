(() => {
  "use strict";

  const accessKey = "5c9e3652-13ae-4dfc-9f71-24cdb76e02b8";
  const registrationPattern = /^(?:[A-Z]{2}\d{2}[A-Z]{3}|[A-Z]\d{1,3}[A-Z]{3}|[A-Z]{3}\d{1,3}[A-Z]|[A-Z]{1,3}\d{1,4}|\d{1,4}[A-Z]{1,3}|\d{3}[DX]\d{3})$/;
  const phonePattern = /^(?:0|\+44|0044)[1235789]\d{8,9}$/;

  document.querySelectorAll("[data-quote-form]").forEach(form => {
    const { registration, name, phone, job, mileage, message, botcheck } = form.elements;
    const button = form.querySelector('button[type="submit"]');
    const feedback = form.querySelector(".quote-feedback");
    const fields = [
      [registration, () => registrationPattern.test(registration.value.replace(/\s/g, "").toUpperCase()), "Enter a UK registration, for example AB12 CDE."],
      [name, () => Boolean(name.value.trim()), "Enter your name."],
      [phone, () => /^[+\d\s().-]+$/.test(phone.value) && phonePattern.test(phone.value.replace(/[\s().-]/g, "")), "Enter a UK phone number, including the area code for a landline."],
      [job, () => Boolean(job.value), "Choose the job you need."],
      [mileage, () => !mileage.value.trim() || /^\d+$/.test(mileage.value.replace(/,/g, "").trim()), "Enter the mileage in numbers, or leave it blank."],
      [message, () => message.value.length <= 500, "Keep the message to 500 characters or fewer."]
    ];

    function showError(field, messageText) {
      const error = document.getElementById(field.id + "-error");
      error.textContent = messageText;
      error.hidden = !messageText;
      if (messageText) {
        field.setAttribute("aria-invalid", "true");
        field.setAttribute("aria-describedby", error.id);
      } else {
        field.removeAttribute("aria-invalid");
        field.removeAttribute("aria-describedby");
      }
    }

    registration.addEventListener("input", () => {
      const { selectionStart, selectionEnd, value } = registration;
      const upper = value.toUpperCase();
      if (value !== upper) {
        registration.value = upper;
        registration.setSelectionRange(selectionStart, selectionEnd);
      }
    });
    fields.forEach(([field, valid]) => field.addEventListener("input", () => {
      if (field.hasAttribute("aria-invalid") && valid()) showError(field, "");
    }));

    form.addEventListener("submit", async event => {
      event.preventDefault();
      if (button.disabled) return;
      feedback.replaceChildren();
      let firstInvalid;
      fields.forEach(([field, valid, error]) => {
        const isValid = valid();
        showError(field, isValid ? "" : error);
        if (!isValid && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) { firstInvalid.focus(); return; }
      if (botcheck.checked) return;

      const registrationValue = registration.value.trim().replace(/\s+/g, " ").toUpperCase();
      const jobType = job.value;
      const jobLabel = job.selectedOptions[0].textContent;
      const payload = {
        access_key: accessKey,
        subject: `New quote request – ${jobLabel} – ${registrationValue}`,
        from_name: "QuickVS website",
        registration: registrationValue,
        name: name.value.trim(),
        phone: phone.value.trim(),
        job: jobLabel,
        mileage: mileage.value.trim(),
        message: message.value.trim(),
        page_url: document.querySelector('link[rel="canonical"]').href
      };
      button.disabled = true;
      button.textContent = "Sending…";
      feedback.textContent = "Sending your request…";
      const request = new AbortController();
      const timeout = setTimeout(() => request.abort(), 15000);
      try {
        const response = await fetch(form.action, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: request.signal
        });
        const result = await response.json();
        if (!response.ok || result.success !== true) throw new Error("Quote delivery failed");
        form.reset();
        feedback.replaceChildren(form.querySelector("[data-quote-success]").content.cloneNode(true));
        document.dispatchEvent(new CustomEvent("qsv:quote-success", { detail: jobType }));
      } catch (_) {
        feedback.replaceChildren(form.querySelector("[data-quote-failure]").content.cloneNode(true));
      } finally {
        clearTimeout(timeout);
        button.disabled = false;
        button.textContent = "Send quote request";
      }
    });
    button.disabled = false;
  });
})();
