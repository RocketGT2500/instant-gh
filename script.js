const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector("#main-menu");

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    }
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  const messageBox = document.createElement("p");
  messageBox.className = "form-status";
  messageBox.setAttribute("aria-live", "polite");
  contactForm.appendChild(messageBox);

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector(".form-submit");
    const originalText = submitButton ? submitButton.textContent : "";
    const formData = new FormData(contactForm);

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Envoi en cours...";
    }

    messageBox.textContent = "";
    messageBox.classList.remove("ok", "error");

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("Service de formulaire indisponible");
      }

      contactForm.reset();
      messageBox.textContent = "Message envoyé. Merci, je reviendrai vers vous dès que possible.";
      messageBox.classList.add("ok");
    } catch (error) {
      messageBox.innerHTML = "Le service d'envoi du formulaire semble indisponible pour le moment. Vous pouvez réessayer plus tard ou me contacter via <a href=\"https://www.instagram.com/instant.gh\" target=\"_blank\" rel=\"noreferrer\">Instagram</a>.";
      messageBox.classList.add("error");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    }
  });
}
