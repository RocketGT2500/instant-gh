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

const PHOTO_LIBRARY = [
  {
    "categoryId": "animalier",
    "src": "assets/photos/Animalier/Animalier-01.jpg",
    "file": "Animalier-01.jpg",
    "number": 1,
    "alt": "Animalier 01 · Instant.GH"
  },
  {
    "categoryId": "animalier",
    "src": "assets/photos/Animalier/Animalier-02.jpg",
    "file": "Animalier-02.jpg",
    "number": 2,
    "alt": "Animalier 02 · Instant.GH"
  },
  {
    "categoryId": "animalier",
    "src": "assets/photos/Animalier/Animalier-03.jpg",
    "file": "Animalier-03.jpg",
    "number": 3,
    "alt": "Animalier 03 · Instant.GH"
  },
  {
    "categoryId": "animalier",
    "src": "assets/photos/Animalier/Animalier-04.jpg",
    "file": "Animalier-04.jpg",
    "number": 4,
    "alt": "Animalier 04 · Instant.GH"
  },
  {
    "categoryId": "animalier",
    "src": "assets/photos/Animalier/Animalier-05.jpg",
    "file": "Animalier-05.jpg",
    "number": 5,
    "alt": "Animalier 05 · Instant.GH"
  },
  {
    "categoryId": "animalier",
    "src": "assets/photos/Animalier/Animalier-06.jpg",
    "file": "Animalier-06.jpg",
    "number": 6,
    "alt": "Animalier 06 · Instant.GH"
  },
  {
    "categoryId": "animalier",
    "src": "assets/photos/Animalier/Animalier-07.jpg",
    "file": "Animalier-07.jpg",
    "number": 7,
    "alt": "Animalier 07 · Instant.GH"
  },
  {
    "categoryId": "animalier",
    "src": "assets/photos/Animalier/Animalier-08.jpg",
    "file": "Animalier-08.jpg",
    "number": 8,
    "alt": "Animalier 08 · Instant.GH"
  },
  {
    "categoryId": "animalier",
    "src": "assets/photos/Animalier/Animalier-09.jpg",
    "file": "Animalier-09.jpg",
    "number": 9,
    "alt": "Animalier 09 · Instant.GH"
  },
  {
    "categoryId": "animalier",
    "src": "assets/photos/Animalier/Animalier-10.jpg",
    "file": "Animalier-10.jpg",
    "number": 10,
    "alt": "Animalier 10 · Instant.GH"
  },
  {
    "categoryId": "animalier",
    "src": "assets/photos/Animalier/Animalier-11.jpg",
    "file": "Animalier-11.jpg",
    "number": 11,
    "alt": "Animalier 11 · Instant.GH"
  },
  {
    "categoryId": "animalier",
    "src": "assets/photos/Animalier/Animalier-12.jpg",
    "file": "Animalier-12.jpg",
    "number": 12,
    "alt": "Animalier 12 · Instant.GH"
  },
  {
    "categoryId": "animalier",
    "src": "assets/photos/Animalier/Animalier-13.jpg",
    "file": "Animalier-13.jpg",
    "number": 13,
    "alt": "Animalier 13 · Instant.GH"
  },
  {
    "categoryId": "animalier",
    "src": "assets/photos/Animalier/Animalier-14.jpg",
    "file": "Animalier-14.jpg",
    "number": 14,
    "alt": "Animalier 14 · Instant.GH"
  },
  {
    "categoryId": "animalier",
    "src": "assets/photos/Animalier/Animalier-15.jpg",
    "file": "Animalier-15.jpg",
    "number": 15,
    "alt": "Animalier 15 · Instant.GH"
  },
  {
    "categoryId": "animalier",
    "src": "assets/photos/Animalier/Animalier-16.jpg",
    "file": "Animalier-16.jpg",
    "number": 16,
    "alt": "Animalier 16 · Instant.GH"
  },
  {
    "categoryId": "animalier",
    "src": "assets/photos/Animalier/Animalier-17.jpg",
    "file": "Animalier-17.jpg",
    "number": 17,
    "alt": "Animalier 17 · Instant.GH"
  },
  {
    "categoryId": "animalier",
    "src": "assets/photos/Animalier/Animalier-18.jpg",
    "file": "Animalier-18.jpg",
    "number": 18,
    "alt": "Animalier 18 · Instant.GH"
  },
  {
    "categoryId": "animalier",
    "src": "assets/photos/Animalier/Animalier-19.jpg",
    "file": "Animalier-19.jpg",
    "number": 19,
    "alt": "Animalier 19 · Instant.GH"
  },
  {
    "categoryId": "animalier",
    "src": "assets/photos/Animalier/Animalier-20.jpg",
    "file": "Animalier-20.jpg",
    "number": 20,
    "alt": "Animalier 20 · Instant.GH"
  },
  {
    "categoryId": "animalier",
    "src": "assets/photos/Animalier/Animalier-21.jpg",
    "file": "Animalier-21.jpg",
    "number": 21,
    "alt": "Animalier 21 · Instant.GH"
  },
  {
    "categoryId": "animalier",
    "src": "assets/photos/Animalier/Animalier-22.jpg",
    "file": "Animalier-22.jpg",
    "number": 22,
    "alt": "Animalier 22 · Instant.GH"
  },
  {
    "categoryId": "animalier",
    "src": "assets/photos/Animalier/Animalier-23.jpg",
    "file": "Animalier-23.jpg",
    "number": 23,
    "alt": "Animalier 23 · Instant.GH"
  },
  {
    "categoryId": "animalier",
    "src": "assets/photos/Animalier/Animalier-24.jpg",
    "file": "Animalier-24.jpg",
    "number": 24,
    "alt": "Animalier 24 · Instant.GH"
  },
  {
    "categoryId": "aviation",
    "src": "assets/photos/Aviation/aviation-01.jpg",
    "file": "aviation-01.jpg",
    "number": 1,
    "alt": "Aviation 01 · Instant.GH"
  },
  {
    "categoryId": "aviation",
    "src": "assets/photos/Aviation/aviation-02.jpg",
    "file": "aviation-02.jpg",
    "number": 2,
    "alt": "Aviation 02 · Instant.GH"
  },
  {
    "categoryId": "aviation",
    "src": "assets/photos/Aviation/aviation-3.jpg",
    "file": "aviation-3.jpg",
    "number": 3,
    "alt": "Aviation 03 · Instant.GH"
  },
  {
    "categoryId": "aviation",
    "src": "assets/photos/Aviation/aviation-04.jpg",
    "file": "aviation-04.jpg",
    "number": 4,
    "alt": "Aviation 04 · Instant.GH"
  },
  {
    "categoryId": "aviation",
    "src": "assets/photos/Aviation/aviation-05.jpg",
    "file": "aviation-05.jpg",
    "number": 5,
    "alt": "Aviation 05 · Instant.GH"
  },
  {
    "categoryId": "aviation",
    "src": "assets/photos/Aviation/aviation-06.jpg",
    "file": "aviation-06.jpg",
    "number": 6,
    "alt": "Aviation 06 · Instant.GH"
  },
  {
    "categoryId": "aviation",
    "src": "assets/photos/Aviation/aviation-07.jpg",
    "file": "aviation-07.jpg",
    "number": 7,
    "alt": "Aviation 07 · Instant.GH"
  },
  {
    "categoryId": "aviation",
    "src": "assets/photos/Aviation/aviation-08.jpg",
    "file": "aviation-08.jpg",
    "number": 8,
    "alt": "Aviation 08 · Instant.GH"
  },
  {
    "categoryId": "aviation",
    "src": "assets/photos/Aviation/aviation-09.jpg",
    "file": "aviation-09.jpg",
    "number": 9,
    "alt": "Aviation 09 · Instant.GH"
  },
  {
    "categoryId": "aviation",
    "src": "assets/photos/Aviation/aviation-10.jpg",
    "file": "aviation-10.jpg",
    "number": 10,
    "alt": "Aviation 10 · Instant.GH"
  },
  {
    "categoryId": "defense-defiles",
    "src": "assets/photos/Défense & défilés/defense-defiles-01.jpg",
    "file": "defense-defiles-01.jpg",
    "number": 1,
    "alt": "Défense & défilés 01 · Instant.GH"
  },
  {
    "categoryId": "defense-defiles",
    "src": "assets/photos/Défense & défilés/defense-defiles-02.jpg",
    "file": "defense-defiles-02.jpg",
    "number": 2,
    "alt": "Défense & défilés 02 · Instant.GH"
  },
  {
    "categoryId": "defense-defiles",
    "src": "assets/photos/Défense & défilés/defense-defiles-03.jpg",
    "file": "defense-defiles-03.jpg",
    "number": 3,
    "alt": "Défense & défilés 03 · Instant.GH"
  },
  {
    "categoryId": "defense-defiles",
    "src": "assets/photos/Défense & défilés/defense-defiles-04.jpg",
    "file": "defense-defiles-04.jpg",
    "number": 4,
    "alt": "Défense & défilés 04 · Instant.GH"
  },
  {
    "categoryId": "defense-defiles",
    "src": "assets/photos/Défense & défilés/defense-defiles-05.jpg",
    "file": "defense-defiles-05.jpg",
    "number": 5,
    "alt": "Défense & défilés 05 · Instant.GH"
  },
  {
    "categoryId": "defense-defiles",
    "src": "assets/photos/Défense & défilés/defense-defiles-06.jpg",
    "file": "defense-defiles-06.jpg",
    "number": 6,
    "alt": "Défense & défilés 06 · Instant.GH"
  },
  {
    "categoryId": "defense-defiles",
    "src": "assets/photos/Défense & défilés/defense-defiles-07.jpg",
    "file": "defense-defiles-07.jpg",
    "number": 7,
    "alt": "Défense & défilés 07 · Instant.GH"
  },
  {
    "categoryId": "defense-defiles",
    "src": "assets/photos/Défense & défilés/defense-defiles-08.jpg",
    "file": "defense-defiles-08.jpg",
    "number": 8,
    "alt": "Défense & défilés 08 · Instant.GH"
  },
  {
    "categoryId": "defense-defiles",
    "src": "assets/photos/Défense & défilés/defense-defiles-09.jpg",
    "file": "defense-defiles-09.jpg",
    "number": 9,
    "alt": "Défense & défilés 09 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_01.jpg",
    "file": "Moto_&_mécanique_01.jpg",
    "number": 1,
    "alt": "Moto & mécanique 01 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_02.jpg",
    "file": "Moto_&_mécanique_02.jpg",
    "number": 2,
    "alt": "Moto & mécanique 02 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_03.jpg",
    "file": "Moto_&_mécanique_03.jpg",
    "number": 3,
    "alt": "Moto & mécanique 03 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_04.jpg",
    "file": "Moto_&_mécanique_04.jpg",
    "number": 4,
    "alt": "Moto & mécanique 04 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_05.jpg",
    "file": "Moto_&_mécanique_05.jpg",
    "number": 5,
    "alt": "Moto & mécanique 05 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_06.jpg",
    "file": "Moto_&_mécanique_06.jpg",
    "number": 6,
    "alt": "Moto & mécanique 06 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_07.jpg",
    "file": "Moto_&_mécanique_07.jpg",
    "number": 7,
    "alt": "Moto & mécanique 07 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_08.jpg",
    "file": "Moto_&_mécanique_08.jpg",
    "number": 8,
    "alt": "Moto & mécanique 08 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_09.jpg",
    "file": "Moto_&_mécanique_09.jpg",
    "number": 9,
    "alt": "Moto & mécanique 09 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_10.jpg",
    "file": "Moto_&_mécanique_10.jpg",
    "number": 10,
    "alt": "Moto & mécanique 10 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_11.jpg",
    "file": "Moto_&_mécanique_11.jpg",
    "number": 11,
    "alt": "Moto & mécanique 11 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_12.jpg",
    "file": "Moto_&_mécanique_12.jpg",
    "number": 12,
    "alt": "Moto & mécanique 12 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_13.jpg",
    "file": "Moto_&_mécanique_13.jpg",
    "number": 13,
    "alt": "Moto & mécanique 13 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_14.jpg",
    "file": "Moto_&_mécanique_14.jpg",
    "number": 14,
    "alt": "Moto & mécanique 14 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_15.jpg",
    "file": "Moto_&_mécanique_15.jpg",
    "number": 15,
    "alt": "Moto & mécanique 15 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_16.jpg",
    "file": "Moto_&_mécanique_16.jpg",
    "number": 16,
    "alt": "Moto & mécanique 16 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_17.jpg",
    "file": "Moto_&_mécanique_17.jpg",
    "number": 17,
    "alt": "Moto & mécanique 17 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_18.jpg",
    "file": "Moto_&_mécanique_18.jpg",
    "number": 18,
    "alt": "Moto & mécanique 18 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_19.jpg",
    "file": "Moto_&_mécanique_19.jpg",
    "number": 19,
    "alt": "Moto & mécanique 19 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_20.jpg",
    "file": "Moto_&_mécanique_20.jpg",
    "number": 20,
    "alt": "Moto & mécanique 20 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_21.jpg",
    "file": "Moto_&_mécanique_21.jpg",
    "number": 21,
    "alt": "Moto & mécanique 21 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_22.jpg",
    "file": "Moto_&_mécanique_22.jpg",
    "number": 22,
    "alt": "Moto & mécanique 22 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_23.jpg",
    "file": "Moto_&_mécanique_23.jpg",
    "number": 23,
    "alt": "Moto & mécanique 23 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_24.jpg",
    "file": "Moto_&_mécanique_24.jpg",
    "number": 24,
    "alt": "Moto & mécanique 24 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_25.jpg",
    "file": "Moto_&_mécanique_25.jpg",
    "number": 25,
    "alt": "Moto & mécanique 25 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_26.jpg",
    "file": "Moto_&_mécanique_26.jpg",
    "number": 26,
    "alt": "Moto & mécanique 26 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_27.jpg",
    "file": "Moto_&_mécanique_27.jpg",
    "number": 27,
    "alt": "Moto & mécanique 27 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_28.jpg",
    "file": "Moto_&_mécanique_28.jpg",
    "number": 28,
    "alt": "Moto & mécanique 28 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_29.jpg",
    "file": "Moto_&_mécanique_29.jpg",
    "number": 29,
    "alt": "Moto & mécanique 29 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_30.jpg",
    "file": "Moto_&_mécanique_30.jpg",
    "number": 30,
    "alt": "Moto & mécanique 30 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_31.jpg",
    "file": "Moto_&_mécanique_31.jpg",
    "number": 31,
    "alt": "Moto & mécanique 31 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_32.jpg",
    "file": "Moto_&_mécanique_32.jpg",
    "number": 32,
    "alt": "Moto & mécanique 32 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_33.jpg",
    "file": "Moto_&_mécanique_33.jpg",
    "number": 33,
    "alt": "Moto & mécanique 33 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_34.jpg",
    "file": "Moto_&_mécanique_34.jpg",
    "number": 34,
    "alt": "Moto & mécanique 34 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_35.jpg",
    "file": "Moto_&_mécanique_35.jpg",
    "number": 35,
    "alt": "Moto & mécanique 35 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_36.jpg",
    "file": "Moto_&_mécanique_36.jpg",
    "number": 36,
    "alt": "Moto & mécanique 36 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_37.jpg",
    "file": "Moto_&_mécanique_37.jpg",
    "number": 37,
    "alt": "Moto & mécanique 37 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_38.jpg",
    "file": "Moto_&_mécanique_38.jpg",
    "number": 38,
    "alt": "Moto & mécanique 38 · Instant.GH"
  },
  {
    "categoryId": "moto-mecanique",
    "src": "assets/photos/Moto & mécanique/Moto_&_mécanique_40.jpg",
    "file": "Moto_&_mécanique_40.jpg",
    "number": 40,
    "alt": "Moto & mécanique 40 · Instant.GH"
  },
  {
    "categoryId": "portrait",
    "src": "assets/photos/Portrait/Portrait_01.jpg",
    "file": "Portrait_01.jpg",
    "number": 1,
    "alt": "Portrait 01 · Instant.GH"
  },
  {
    "categoryId": "portrait",
    "src": "assets/photos/Portrait/Portrait_02.jpg",
    "file": "Portrait_02.jpg",
    "number": 2,
    "alt": "Portrait 02 · Instant.GH"
  },
  {
    "categoryId": "portrait",
    "src": "assets/photos/Portrait/Portrait_03.jpg",
    "file": "Portrait_03.jpg",
    "number": 3,
    "alt": "Portrait 03 · Instant.GH"
  },
  {
    "categoryId": "portrait",
    "src": "assets/photos/Portrait/Portrait_04.jpg",
    "file": "Portrait_04.jpg",
    "number": 4,
    "alt": "Portrait 04 · Instant.GH"
  },
  {
    "categoryId": "portrait",
    "src": "assets/photos/Portrait/Portrait_05.jpg",
    "file": "Portrait_05.jpg",
    "number": 5,
    "alt": "Portrait 05 · Instant.GH"
  },
  {
    "categoryId": "portrait",
    "src": "assets/photos/Portrait/Portrait_06.jpg",
    "file": "Portrait_06.jpg",
    "number": 6,
    "alt": "Portrait 06 · Instant.GH"
  },
  {
    "categoryId": "portrait",
    "src": "assets/photos/Portrait/Portrait_07.jpg",
    "file": "Portrait_07.jpg",
    "number": 7,
    "alt": "Portrait 07 · Instant.GH"
  },
  {
    "categoryId": "portrait",
    "src": "assets/photos/Portrait/Portrait_08.jpg",
    "file": "Portrait_08.jpg",
    "number": 8,
    "alt": "Portrait 08 · Instant.GH"
  },
  {
    "categoryId": "portrait",
    "src": "assets/photos/Portrait/Portrait_09.jpg",
    "file": "Portrait_09.jpg",
    "number": 9,
    "alt": "Portrait 09 · Instant.GH"
  },
  {
    "categoryId": "portrait",
    "src": "assets/photos/Portrait/Portrait_10.jpg",
    "file": "Portrait_10.jpg",
    "number": 10,
    "alt": "Portrait 10 · Instant.GH"
  },
  {
    "categoryId": "portrait",
    "src": "assets/photos/Portrait/Portrait_11.jpg",
    "file": "Portrait_11.jpg",
    "number": 11,
    "alt": "Portrait 11 · Instant.GH"
  },
  {
    "categoryId": "portrait",
    "src": "assets/photos/Portrait/Portrait_12.jpg",
    "file": "Portrait_12.jpg",
    "number": 12,
    "alt": "Portrait 12 · Instant.GH"
  },
  {
    "categoryId": "portrait",
    "src": "assets/photos/Portrait/Portrait_13.jpg",
    "file": "Portrait_13.jpg",
    "number": 13,
    "alt": "Portrait 13 · Instant.GH"
  },
  {
    "categoryId": "portrait",
    "src": "assets/photos/Portrait/Portrait_14.jpg",
    "file": "Portrait_14.jpg",
    "number": 14,
    "alt": "Portrait 14 · Instant.GH"
  },
  {
    "categoryId": "portrait",
    "src": "assets/photos/Portrait/Portrait_15.jpg",
    "file": "Portrait_15.jpg",
    "number": 15,
    "alt": "Portrait 15 · Instant.GH"
  },
  {
    "categoryId": "portrait",
    "src": "assets/photos/Portrait/Portrait_16.jpg",
    "file": "Portrait_16.jpg",
    "number": 16,
    "alt": "Portrait 16 · Instant.GH"
  },
  {
    "categoryId": "sport-collectifs",
    "src": "assets/photos/Sport & collectifs/Sport_&_collectifs_01.jpg",
    "file": "Sport_&_collectifs_01.jpg",
    "number": 1,
    "alt": "Sport & collectifs 01 · Instant.GH"
  },
  {
    "categoryId": "sport-collectifs",
    "src": "assets/photos/Sport & collectifs/Sport_&_collectifs_02.jpg",
    "file": "Sport_&_collectifs_02.jpg",
    "number": 2,
    "alt": "Sport & collectifs 02 · Instant.GH"
  },
  {
    "categoryId": "sport-collectifs",
    "src": "assets/photos/Sport & collectifs/Sport_&_collectifs_03.jpg",
    "file": "Sport_&_collectifs_03.jpg",
    "number": 3,
    "alt": "Sport & collectifs 03 · Instant.GH"
  },
  {
    "categoryId": "sport-collectifs",
    "src": "assets/photos/Sport & collectifs/Sport_&_collectifs_04.jpg",
    "file": "Sport_&_collectifs_04.jpg",
    "number": 4,
    "alt": "Sport & collectifs 04 · Instant.GH"
  },
  {
    "categoryId": "sport-collectifs",
    "src": "assets/photos/Sport & collectifs/Sport_&_collectifs_05.jpg",
    "file": "Sport_&_collectifs_05.jpg",
    "number": 5,
    "alt": "Sport & collectifs 05 · Instant.GH"
  },
  {
    "categoryId": "sport-collectifs",
    "src": "assets/photos/Sport & collectifs/Sport_&_collectifs_06.jpg",
    "file": "Sport_&_collectifs_06.jpg",
    "number": 6,
    "alt": "Sport & collectifs 06 · Instant.GH"
  },
  {
    "categoryId": "sport-collectifs",
    "src": "assets/photos/Sport & collectifs/Sport_&_collectifs_07.jpg",
    "file": "Sport_&_collectifs_07.jpg",
    "number": 7,
    "alt": "Sport & collectifs 07 · Instant.GH"
  },
  {
    "categoryId": "sport-collectifs",
    "src": "assets/photos/Sport & collectifs/Sport_&_collectifs_08.jpg",
    "file": "Sport_&_collectifs_08.jpg",
    "number": 8,
    "alt": "Sport & collectifs 08 · Instant.GH"
  },
  {
    "categoryId": "sport-collectifs",
    "src": "assets/photos/Sport & collectifs/Sport_&_collectifs_09.jpg",
    "file": "Sport_&_collectifs_09.jpg",
    "number": 9,
    "alt": "Sport & collectifs 09 · Instant.GH"
  },
  {
    "categoryId": "sport-collectifs",
    "src": "assets/photos/Sport & collectifs/Sport_&_collectifs_10.jpg",
    "file": "Sport_&_collectifs_10.jpg",
    "number": 10,
    "alt": "Sport & collectifs 10 · Instant.GH"
  },
  {
    "categoryId": "sport-collectifs",
    "src": "assets/photos/Sport & collectifs/Sport_&_collectifs_11.jpg",
    "file": "Sport_&_collectifs_11.jpg",
    "number": 11,
    "alt": "Sport & collectifs 11 · Instant.GH"
  },
  {
    "categoryId": "sport-collectifs",
    "src": "assets/photos/Sport & collectifs/Sport_&_collectifs_12.jpg",
    "file": "Sport_&_collectifs_12.jpg",
    "number": 12,
    "alt": "Sport & collectifs 12 · Instant.GH"
  },
  {
    "categoryId": "sport-collectifs",
    "src": "assets/photos/Sport & collectifs/Sport_&_collectifs_13.jpg",
    "file": "Sport_&_collectifs_13.jpg",
    "number": 13,
    "alt": "Sport & collectifs 13 · Instant.GH"
  },
  {
    "categoryId": "sport-collectifs",
    "src": "assets/photos/Sport & collectifs/Sport_&_collectifs_14.jpg",
    "file": "Sport_&_collectifs_14.jpg",
    "number": 14,
    "alt": "Sport & collectifs 14 · Instant.GH"
  },
  {
    "categoryId": "evenementiel",
    "src": "assets/photos/Événementiel/evenementiel-01.jpg",
    "file": "evenementiel-01.jpg",
    "number": 1,
    "alt": "Événementiel 01 · Instant.GH"
  },
  {
    "categoryId": "evenementiel",
    "src": "assets/photos/Événementiel/evenementiel-02.jpg",
    "file": "evenementiel-02.jpg",
    "number": 2,
    "alt": "Événementiel 02 · Instant.GH"
  },
  {
    "categoryId": "evenementiel",
    "src": "assets/photos/Événementiel/evenementiel-03.jpg",
    "file": "evenementiel-03.jpg",
    "number": 3,
    "alt": "Événementiel 03 · Instant.GH"
  },
  {
    "categoryId": "evenementiel",
    "src": "assets/photos/Événementiel/evenementiel-04.jpg",
    "file": "evenementiel-04.jpg",
    "number": 4,
    "alt": "Événementiel 04 · Instant.GH"
  },
  {
    "categoryId": "evenementiel",
    "src": "assets/photos/Événementiel/evenementiel-05.jpg",
    "file": "evenementiel-05.jpg",
    "number": 5,
    "alt": "Événementiel 05 · Instant.GH"
  },
  {
    "categoryId": "evenementiel",
    "src": "assets/photos/Événementiel/evenementiel-06.jpg",
    "file": "evenementiel-06.jpg",
    "number": 6,
    "alt": "Événementiel 06 · Instant.GH"
  },
  {
    "categoryId": "evenementiel",
    "src": "assets/photos/Événementiel/evenementiel-07.jpg",
    "file": "evenementiel-07.jpg",
    "number": 7,
    "alt": "Événementiel 07 · Instant.GH"
  },
  {
    "categoryId": "evenementiel",
    "src": "assets/photos/Événementiel/evenementiel-08.jpg",
    "file": "evenementiel-08.jpg",
    "number": 8,
    "alt": "Événementiel 08 · Instant.GH"
  },
  {
    "categoryId": "evenementiel",
    "src": "assets/photos/Événementiel/evenementiel-09.jpg",
    "file": "evenementiel-09.jpg",
    "number": 9,
    "alt": "Événementiel 09 · Instant.GH"
  },
  {
    "categoryId": "evenementiel",
    "src": "assets/photos/Événementiel/evenementiel-10.jpg",
    "file": "evenementiel-10.jpg",
    "number": 10,
    "alt": "Événementiel 10 · Instant.GH"
  },
  {
    "categoryId": "evenementiel",
    "src": "assets/photos/Événementiel/evenementiel-11.jpg",
    "file": "evenementiel-11.jpg",
    "number": 11,
    "alt": "Événementiel 11 · Instant.GH"
  },
  {
    "categoryId": "evenementiel",
    "src": "assets/photos/Événementiel/evenementiel-12.jpg",
    "file": "evenementiel-12.jpg",
    "number": 12,
    "alt": "Événementiel 12 · Instant.GH"
  },
  {
    "categoryId": "evenementiel",
    "src": "assets/photos/Événementiel/evenementiel-13.jpg",
    "file": "evenementiel-13.jpg",
    "number": 13,
    "alt": "Événementiel 13 · Instant.GH"
  },
  {
    "categoryId": "evenementiel",
    "src": "assets/photos/Événementiel/evenementiel-14.jpg",
    "file": "evenementiel-14.jpg",
    "number": 14,
    "alt": "Événementiel 14 · Instant.GH"
  },
  {
    "categoryId": "evenementiel",
    "src": "assets/photos/Événementiel/evenementiel-15.jpg",
    "file": "evenementiel-15.jpg",
    "number": 15,
    "alt": "Événementiel 15 · Instant.GH"
  },
  {
    "categoryId": "evenementiel",
    "src": "assets/photos/Événementiel/evenementiel-16.jpg",
    "file": "evenementiel-16.jpg",
    "number": 16,
    "alt": "Événementiel 16 · Instant.GH"
  },
  {
    "categoryId": "evenementiel",
    "src": "assets/photos/Événementiel/evenementiel-17.jpg",
    "file": "evenementiel-17.jpg",
    "number": 17,
    "alt": "Événementiel 17 · Instant.GH"
  },
  {
    "categoryId": "evenementiel",
    "src": "assets/photos/Événementiel/evenementiel-18.jpg",
    "file": "evenementiel-18.jpg",
    "number": 18,
    "alt": "Événementiel 18 · Instant.GH"
  },
  {
    "categoryId": "evenementiel",
    "src": "assets/photos/Événementiel/evenementiel-19.jpg",
    "file": "evenementiel-19.jpg",
    "number": 19,
    "alt": "Événementiel 19 · Instant.GH"
  },
  {
    "categoryId": "evenementiel",
    "src": "assets/photos/Événementiel/evenementiel-20.jpg",
    "file": "evenementiel-20.jpg",
    "number": 20,
    "alt": "Événementiel 20 · Instant.GH"
  },
  {
    "categoryId": "evenementiel",
    "src": "assets/photos/Événementiel/evenementiel-21.jpg",
    "file": "evenementiel-21.jpg",
    "number": 21,
    "alt": "Événementiel 21 · Instant.GH"
  },
  {
    "categoryId": "evenementiel",
    "src": "assets/photos/Événementiel/evenementiel-22.jpg",
    "file": "evenementiel-22.jpg",
    "number": 22,
    "alt": "Événementiel 22 · Instant.GH"
  },
  {
    "categoryId": "evenementiel",
    "src": "assets/photos/Événementiel/evenementiel-23.jpg",
    "file": "evenementiel-23.jpg",
    "number": 23,
    "alt": "Événementiel 23 · Instant.GH"
  },
  {
    "categoryId": "evenementiel",
    "src": "assets/photos/Événementiel/evenementiel-24.jpg",
    "file": "evenementiel-24.jpg",
    "number": 24,
    "alt": "Événementiel 24 · Instant.GH"
  },
  {
    "categoryId": "evenementiel",
    "src": "assets/photos/Événementiel/evenementiel-25.jpg",
    "file": "evenementiel-25.jpg",
    "number": 25,
    "alt": "Événementiel 25 · Instant.GH"
  },
  {
    "categoryId": "evenementiel",
    "src": "assets/photos/Événementiel/evenementiel-26.jpg",
    "file": "evenementiel-26.jpg",
    "number": 26,
    "alt": "Événementiel 26 · Instant.GH"
  },
  {
    "categoryId": "evenementiel",
    "src": "assets/photos/Événementiel/evenementiel-27.jpg",
    "file": "evenementiel-27.jpg",
    "number": 27,
    "alt": "Événementiel 27 · Instant.GH"
  }
];

const CATEGORY_TEXTS = {
  "animalier": "Regards, attitudes et instants naturels.",
  "aviation": "Puissance aérienne, précision et machines en mouvement.",
  "defense-defiles": "Défense, défilés, terrain et présence humaine.",
  "moto-mecanique": "Motos en action, portraits de motards et détails mécaniques.",
  "portrait": "Présence, regard et lumière maîtrisée.",
  "sport-collectifs": "Sport collectif, vitesse, contact et intensité.",
  "evenementiel": "Concerts, scènes vivantes, reconstitutions et ambiances fortes."
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