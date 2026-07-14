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

function addHeroSupportButton() {
  const heroActions = document.querySelector(".hero-actions");
  if (!heroActions || heroActions.querySelector('a[href="#soutenir"]')) return;

  const supportButton = document.createElement("a");
  supportButton.className = "button ghost";
  supportButton.href = "#soutenir";
  supportButton.textContent = "Me soutenir";
  heroActions.appendChild(supportButton);
}

addHeroSupportButton();

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
  const file = getFileNameFromPath(src);
  const match = file.match(/(?:-|_)(\d+)\.jpe?g$/i);
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

const PHOTO_LIBRARY = (() => {
  const categoryData =
    typeof categories !== "undefined" && Array.isArray(categories) ? categories : [];

  return categoryData.flatMap((category) =>
    (Array.isArray(category.images) ? category.images : []).map((src, index) => {
      const withoutQuery = String(src || "").split("?")[0].split("#")[0];
      const decoded = decodeURIComponent(withoutQuery);
      const file = decoded.split(/[\\/]/).pop() || "";
      const match = file.match(/(?:-|_)(\d+)\.jpe?g$/i);
      const number = match ? Number(match[1]) : index + 1;
      const label = category.title || category.id || "Photographie";

      return {
        categoryId: category.id,
        src,
        file,
        number,
        alt: `${label} ${String(number).padStart(2, "0")} · Instant.GH`,
      };
    })
  );
})();

const CATEGORY_TEXT_FALLBACKS = {
  "animalier": "Regards, attitudes et instants naturels.",
  "aviation": "Puissance aérienne, précision et machines en mouvement.",
  "defense-defiles": "Défense, défilés, terrain et présence humaine.",
  "moto-mecanique": "Motos en action, portraits de motards et détails mécaniques.",
  "portrait": "Présence, regard et lumière maîtrisée.",
  "sport-collectifs": "Sport collectif, vitesse, contact et intensité.",
  "evenementiel": "Concerts, scènes vivantes, reconstitutions et ambiances fortes."
};

const CATEGORY_TEXTS = {
  ...CATEGORY_TEXT_FALLBACKS,
  ...(typeof categories !== "undefined" && Array.isArray(categories)
    ? Object.fromEntries(categories.map((category) => [category.id, category.text]))
    : {}),
};

const CATEGORY_ALIASES = {
  "animalier": ["animalier"],
  "aviation": ["aviation"],
  "defense-defiles": ["defense-defiles", "défense", "defense", "défilés", "defiles"],
  "moto-mecanique": ["moto-mecanique", "moto & mécanique", "moto mécanique", "moto mecanique", "moto_&_mécanique"],
  "portrait": ["portrait"],
  "sport-collectifs": ["sport-collectifs", "sport & collectifs", "sport collectifs", "sport_&_collectifs"],
  "evenementiel": ["evenementiel", "événementiel"]
};

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getFileNameFromPath(path) {
  const withoutQuery = String(path || "").split("?")[0].split("#")[0];
  const decoded = decodeURIComponent(withoutQuery);
  return decoded.split(/[\\/]/).pop() || "";
}

function getCategoryIdFromSrc(src) {
  const normalizedSrc = normalizeText(decodeURIComponent(String(src || "")));

  for (const [categoryId, aliases] of Object.entries(CATEGORY_ALIASES)) {
    if (aliases.some((alias) => normalizedSrc.includes(normalizeText(alias)))) {
      return categoryId;
    }
  }

  return "";
}

function getCategoryIdFromImage(img) {
  if (!img) return "";

  const categoryBlock = img.closest(
    "#animalier, #aviation, #defense-defiles, #moto-mecanique, #portrait, #sport-collectifs, #evenementiel"
  );

  if (categoryBlock && categoryBlock.id) {
    return categoryBlock.id;
  }

  return getCategoryIdFromSrc(img.getAttribute("src") || img.src || "");
}

const PHOTO_BY_FILE = new Map(
  PHOTO_LIBRARY.map((photo) => [photo.file.toLowerCase(), photo])
);

const PHOTO_BY_CATEGORY_NUMBER = new Map(
  PHOTO_LIBRARY.map((photo) => [`${photo.categoryId}:${photo.number}`, photo])
);

function findPhotoForImage(img) {
  if (!img) return null;

  const file = getFileNameFromPath(img.getAttribute("src") || img.src || "").toLowerCase();
  if (PHOTO_BY_FILE.has(file)) {
    return PHOTO_BY_FILE.get(file);
  }

  const number = getImageNumber(img);
  const categoryId = getCategoryIdFromImage(img);
  if (categoryId && Number.isFinite(number)) {
    return PHOTO_BY_CATEGORY_NUMBER.get(`${categoryId}:${number}`) || null;
  }

  return null;
}

function syncExistingImagePaths() {
  document.querySelectorAll("img").forEach((img) => {
    const photo = findPhotoForImage(img);
    if (!photo) return;

    if (img.getAttribute("src") !== photo.src) {
      img.setAttribute("src", photo.src);
    }

    if (!img.getAttribute("alt") || img.getAttribute("alt") === "Photographie Instant.GH") {
      img.setAttribute("alt", photo.alt);
    }

    if (!img.getAttribute("loading")) {
      img.setAttribute("loading", "lazy");
    }

    img.setAttribute("decoding", "async");
  });
}

function buildGalleryFromPhotoLibrary(categoryId) {
  const block = document.getElementById(categoryId);
  if (!block) return;

  const gallery = block.querySelector(".category-gallery");
  if (!gallery) return;

  const photos = PHOTO_LIBRARY
    .filter((photo) => photo.categoryId === categoryId)
    .sort((a, b) => a.number - b.number || a.file.localeCompare(b.file, "fr"));

  if (!photos.length) return;

  gallery.innerHTML = "";

  for (const photo of photos) {
    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.alt;
    img.loading = "lazy";
    img.decoding = "async";
    img.addEventListener("error", () => img.remove(), { once: true });
    gallery.appendChild(img);
  }

  const paragraph = block.querySelector(".category-head p");
  if (paragraph && CATEGORY_TEXTS[categoryId]) {
    paragraph.textContent = CATEGORY_TEXTS[categoryId];
  }
}

function buildGalleriesFromPhotoLibrary() {
  [
    "animalier",
    "aviation",
    "defense-defiles",
    "moto-mecanique",
    "portrait",
    "sport-collectifs",
    "evenementiel"
  ].forEach(buildGalleryFromPhotoLibrary);

  syncExistingImagePaths();
}

buildGalleriesFromPhotoLibrary();

function safeHeroCaption(src) {
  const categoryId = getCategoryIdFromSrc(src);

  if (categoryId === "moto-mecanique") return "Moto & mécanique · Instant.GH";
  if (categoryId === "aviation") return "Aviation · précision · ciel";
  if (categoryId === "animalier") return "Animalier · regard · instinct";
  if (categoryId === "defense-defiles") return "Défense · terrain · mouvement";
  if (categoryId === "sport-collectifs") return "Sport · collectif · intensité";
  if (categoryId === "evenementiel") return "Événementiel · lumière · ambiance";
  if (categoryId === "portrait") return "Portrait · présence · instant";

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
  <button class="lightbox-nav lightbox-prev" type="button" aria-label="Photo précédente">‹</button>
  <img class="lightbox-image" src="" alt="" />
  <button class="lightbox-nav lightbox-next" type="button" aria-label="Photo suivante">›</button>
  <p class="lightbox-caption"></p>
`;
document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector(".lightbox-image");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");
const lightboxClose = lightbox.querySelector(".lightbox-close");
const lightboxPrev = lightbox.querySelector(".lightbox-prev");
const lightboxNext = lightbox.querySelector(".lightbox-next");
let activeGalleryImages = [];
let activeLightboxIndex = 0;

function setLightboxImage(index) {
  if (!activeGalleryImages.length || !lightboxImage || !lightboxCaption) return;

  activeLightboxIndex = (index + activeGalleryImages.length) % activeGalleryImages.length;
  const img = activeGalleryImages[activeLightboxIndex];

  lightboxImage.classList.add("is-changing");
  window.setTimeout(() => {
    lightboxImage.src = img.currentSrc || img.src;
    lightboxImage.alt = img.alt || "Photographie Instant.GH";
    lightboxCaption.textContent = `${activeLightboxIndex + 1} / ${activeGalleryImages.length} — ${img.alt || "Photographie Instant.GH"}`;
    lightboxImage.classList.remove("is-changing");
  }, 120);
}

function openLightbox(img) {
  if (!img || !lightboxImage || !lightboxCaption) return;

  const gallery = img.closest(".category-gallery");
  activeGalleryImages = gallery ? Array.from(gallery.querySelectorAll("img")) : [img];
  activeLightboxIndex = Math.max(0, activeGalleryImages.indexOf(img));

  setLightboxImage(activeLightboxIndex);
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
  if (lightboxImage) lightboxImage.src = "";
  activeGalleryImages = [];
  activeLightboxIndex = 0;
}

function showPreviousPhoto() {
  if (!lightbox.classList.contains("open")) return;
  setLightboxImage(activeLightboxIndex - 1);
}

function showNextPhoto() {
  if (!lightbox.classList.contains("open")) return;
  setLightboxImage(activeLightboxIndex + 1);
}

document.addEventListener("click", (event) => {
  const galleryImage = event.target.closest(".category-gallery img");
  if (galleryImage) {
    openLightbox(galleryImage);
    return;
  }

  if (event.target === lightboxPrev) {
    showPreviousPhoto();
    return;
  }

  if (event.target === lightboxNext) {
    showNextPhoto();
    return;
  }

  if (event.target === lightbox || event.target === lightboxClose) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showPreviousPhoto();
  if (event.key === "ArrowRight") showNextPhoto();
});

let touchStartX = null;
lightbox.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
});
lightbox.addEventListener("touchend", (event) => {
  if (touchStartX === null) return;
  const distance = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(distance) > 50) {
    distance > 0 ? showPreviousPhoto() : showNextPhoto();
  }
  touchStartX = null;
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