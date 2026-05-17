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

function getImageNumber(img) {
  const src = img.getAttribute("src") || "";
  const match = src.match(/-(\d+)\.jpg$/i);
  return match ? Number(match[1]) : 9999;
}

function applyGalleryOrder(categoryId, preferredOrder, newText) {
  const block = document.getElementById(categoryId);
  if (!block) return;

  const gallery = block.querySelector(".category-gallery");
  if (!gallery) return;

  if (newText) {
    const paragraph = block.querySelector(".category-head p");
    if (paragraph) paragraph.textContent = newText;
  }

  const images = Array.from(gallery.querySelectorAll("img"));
  const orderIndex = new Map(preferredOrder.map((number, index) => [number, index]));

  images
    .sort((a, b) => {
      const aNumber = getImageNumber(a);
      const bNumber = getImageNumber(b);
      const aIndex = orderIndex.has(aNumber) ? orderIndex.get(aNumber) : 999 + aNumber;
      const bIndex = orderIndex.has(bNumber) ? orderIndex.get(bNumber) : 999 + bNumber;
      return aIndex - bIndex;
    })
    .forEach((img) => gallery.appendChild(img));
}

applyGalleryOrder(
  "moto-mecanique",
  [
    // Bloc 1 — motos en mouvement et portraits motards
    1, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20,
    // Bloc 2 — détails moto / mécanique
    21, 22, 23, 24, 25, 26, 27, 28,
    // Bloc 3 — détails auto et voitures de caractère
    2, 6, 7, 8, 4, 5, 14
  ],
  "Motos en action et portraits de motards, puis détails mécaniques et voitures de caractère."
);

applyGalleryOrder(
  "evenementiel",
  [
    // Bloc 1 — concerts et scène
    24, 5, 7, 17, 18, 19, 20, 21, 22, 23, 1,
    // Bloc 2 — Hellfest / festival / décors
    12, 13, 14, 15, 16, 3, 4, 11,
    // Bloc 3 — reconstitution / médiéval
    6, 8, 10,
    // Bloc 4 — ambiance isolée / paysage
    2
  ],
  "Concerts et scènes vivantes, puis festival, reconstitution et ambiances fortes."
);

function safeHeroCaption(src) {
  const file = (src || "").split("/").pop() || "";

  if (file.startsWith("moto-mecanique")) return "Moto & mécanique · Instant.GH";
  if (file.startsWith("aviation")) return "Aviation · précision · ciel";
  if (file.startsWith("animalier")) return "Animalier · regard · instinct";
  if (file.startsWith("defense-defiles")) return "Défense · terrain · mouvement";
  if (file.startsWith("sport-collectifs")) return "Sport · collectif · intensité";
  if (file.startsWith("evenementiel")) return "Événementiel · lumière · ambiance";
  if (file.startsWith("portrait")) return "Portrait · présence · instant";

  return "Lumière · mouvement · instant";
}

function keepHeroCaptionSafe() {
  const heroImg = document.getElementById("hero-carousel-image");
  const heroTitle = document.getElementById("hero-carousel-title");
  if (!heroImg || !heroTitle) return;
  heroTitle.textContent = safeHeroCaption(heroImg.getAttribute("src"));
}

keepHeroCaptionSafe();
setInterval(keepHeroCaptionSafe, 250);

const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.setAttribute("aria-hidden", "true");
lightbox.innerHTML = `
  <button class="lightbox-close" type="button" aria-label="Fermer l’image agrandie">×</button>
  <img class="lightbox-image" src="" alt="" />
  <p class="lightbox-caption"></p>
`;
document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector(".lightbox-image");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");
const lightboxClose = lightbox.querySelector(".lightbox-close");

function openLightbox(img) {
  if (!img || !lightboxImage || !lightboxCaption) return;
  lightboxImage.src = img.currentSrc || img.src;
  lightboxImage.alt = img.alt || "Photographie Instant.GH";
  lightboxCaption.textContent = img.alt || "Photographie Instant.GH";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
  if (lightboxImage) lightboxImage.src = "";
}

document.addEventListener("click", (event) => {
  const galleryImage = event.target.closest(".category-gallery img");
  if (galleryImage) {
    openLightbox(galleryImage);
    return;
  }

  if (event.target === lightbox || event.target === lightboxClose) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

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
