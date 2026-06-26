document.querySelectorAll("[data-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.getElementById(button.dataset.modal);
    if (modal) modal.setAttribute("aria-hidden", "false");
  });
});

document.querySelectorAll("[data-mobile-nav-trigger]").forEach((trigger) => {
  const panel = document.querySelector("[data-mobile-nav]");
  if (!panel) return;

  const setOpen = (open) => {
    trigger.classList.toggle("is-open", open);
    panel.classList.toggle("is-open", open);
    trigger.setAttribute("aria-expanded", String(open));
    panel.setAttribute("aria-hidden", String(!open));
  };

  trigger.addEventListener("click", () => {
    setOpen(!panel.classList.contains("is-open"));
  });
});

document.querySelectorAll("[data-close], .ark-modal").forEach((node) => {
  node.addEventListener("click", (event) => {
    if (event.target !== node && !event.target.matches("[data-close]")) return;
    const modal = node.closest(".ark-modal") || node;
    modal.setAttribute("aria-hidden", "true");
  });
});

document.querySelectorAll("[data-dropdown]").forEach((dropdown) => {
  const trigger = dropdown.querySelector("[data-dropdown-trigger]");
  if (!trigger) return;

  const setOpen = (open) => {
    dropdown.classList.toggle("is-open", open);
    trigger.setAttribute("aria-expanded", String(open));
  };

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    const nextOpen = !dropdown.classList.contains("is-open");
    document.querySelectorAll("[data-dropdown].is-open").forEach((node) => {
      if (node !== dropdown) {
        node.classList.remove("is-open");
        node.querySelector("[data-dropdown-trigger]")?.setAttribute("aria-expanded", "false");
      }
    });
    setOpen(nextOpen);
  });

  trigger.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
});

document.addEventListener("click", (event) => {
  document.querySelectorAll("[data-dropdown].is-open").forEach((dropdown) => {
    if (dropdown.contains(event.target)) return;
    dropdown.classList.remove("is-open");
    dropdown.querySelector("[data-dropdown-trigger]")?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-login-role-select]").forEach((select) => {
  select.addEventListener("change", () => {
    if (select.value) window.location.href = select.value;
  });
});

const timer = document.querySelector(".ark-timer");
if (timer && timer.dataset.running === "true") {
  const target = document.getElementById("liveTimer");
  const startedAt = new Date(timer.dataset.checkIn).getTime();
  const tick = () => {
    const diff = Math.max(0, Date.now() - startedAt);
    const hours = Math.floor(diff / 3600000).toString().padStart(2, "0");
    const minutes = Math.floor((diff % 3600000) / 60000).toString().padStart(2, "0");
    const seconds = Math.floor((diff % 60000) / 1000).toString().padStart(2, "0");
    target.textContent = `${hours}:${minutes}:${seconds}`;
  };
  tick();
  setInterval(tick, 1000);
}
