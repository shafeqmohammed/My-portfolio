// Site behaviour: filter chips, article search and the contact form.
// Edit these two values before you deploy.
const SITE_CONFIG = {
  // Where the contact form sends messages. Leave empty to open the visitor's
  // email app instead. Works with Formspree, Basin, Getform and similar
  // services that accept a POST of form fields (e.g. "https://formspree.io/f/abcd1234").
  formEndpoint: "",
  // Used for the email fallback above.
  contactEmail: "hello@example.com",
};

document.addEventListener("DOMContentLoaded", () => {
  setupFilters();
  setupContactForm();
});

function setupFilters() {
  const group = document.querySelector("[data-filters]");
  if (!group) return;
  const buttons = [...group.querySelectorAll("[data-filter]")];
  const items = [...document.querySelectorAll("[data-tags]")];
  const search = document.querySelector("[data-search]");
  let picked = "all";

  const apply = () => {
    const q = (search?.value || "").trim().toLowerCase();
    items.forEach((el) => {
      const tagOk = picked === "all" || el.dataset.tags.split(" ").includes(picked);
      const textOk = !q || el.textContent.toLowerCase().includes(q);
      el.hidden = !(tagOk && textOk);
    });
  };

  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      picked = btn.dataset.filter;
      buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      apply();
    })
  );
  search?.addEventListener("input", apply);
}

function setupContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;
  const status = form.querySelector("[data-form-status]");
  const say = (msg) => { if (status) status.textContent = msg; };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);

    if (!SITE_CONFIG.formEndpoint) {
      const subject = `${data.get("enquiry")} from ${data.get("name")}`;
      const body = `${data.get("message")}\n\n${data.get("name")}\n${data.get("organisation") || ""}\n${data.get("email")}`;
      window.location.href = `mailto:${SITE_CONFIG.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    say("Sending…");
    try {
      const res = await fetch(SITE_CONFIG.formEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(res.statusText);
      form.reset();
      say("Thanks, your message is on its way. I’ll reply soon.");
    } catch {
      say(`Sorry, that didn’t send. Please email ${SITE_CONFIG.contactEmail} instead.`);
    } finally {
      button.disabled = false;
    }
  });
}
