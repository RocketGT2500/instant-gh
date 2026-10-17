const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('#main-menu');
menuButton?.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', String(menu.classList.toggle('open')));
});
document.querySelector('#year').textContent = new Date().getFullYear();

const heroActions = document.querySelector('.hero-actions');
if (heroActions && !heroActions.querySelector('a[href="#soutenir"]')) {
  const support = document.createElement('a');
  support.className = 'button ghost';
  support.href = '#soutenir';
  support.textContent = 'Me soutenir';
  heroActions.append(support);
}

const revealObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  }
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

// L'intersection tient compte du défilement vertical et des galeries horizontales.
// Aucun agrandissement n'est téléchargé avant l'ouverture de la visionneuse.
const imageObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    const img = entry.target;
    img.srcset = img.dataset.srcset;
    img.src = img.dataset.src;
    imageObserver.unobserve(img);
  }
}, { rootMargin: '240px 0px' });

const sourceSet = photo => `${photo.small.src} ${photo.small.width}w, ${photo.medium.src} ${photo.medium.width}w`;
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[character]));
const gallerySizes = '(max-width: 860px) 86vw, 360px';
const expandedSizes = '(max-width: 860px) calc(100vw - 80px), (max-width: 1100px) 30vw, 260px';

function buildGalleries(categories) {
  const list = document.getElementById('category-list');
  list.replaceChildren();
  categories.forEach(category => {
    const article = document.createElement('article');
    article.id = category.id;
    article.className = 'category-block reveal';
    article.innerHTML = `<div class="category-head"><div><h3>${escapeHtml(category.title)}</h3><p>${escapeHtml(category.text)}</p></div><div class="gallery-actions"><button class="scroll-gallery-button" type="button" aria-label="Faire défiler : ${escapeHtml(category.title)}">Faire défiler →</button><button class="toggle-gallery-button" type="button" aria-expanded="false" aria-controls="gallery-${category.id}">Tout afficher</button></div></div><div class="category-meta">${category.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}<span>${category.photos.length} photos</span></div><div id="gallery-${category.id}" class="category-gallery horizontal-gallery" role="group" aria-label="${escapeHtml(category.title)}"></div>`;
    const gallery = article.querySelector('.category-gallery');
    category.photos.forEach((photo, index) => {
      const link = document.createElement('a');
      link.className = 'gallery-photo';
      link.href = photo.full.src;
      link.setAttribute('aria-label', `Agrandir : ${photo.alt}`);
      const img = document.createElement('img');
      img.width = photo.small.width;
      img.height = photo.small.height;
      img.alt = photo.alt;
      img.decoding = 'async';
      img.sizes = gallerySizes;
      img.dataset.src = photo.small.src;
      img.dataset.srcset = sourceSet(photo);
      img.addEventListener('error', () => {
        link.classList.add('photo-unavailable');
        link.setAttribute('aria-label', `Ouvrir la photo : ${photo.alt}`);
      }, { once: true });
      link.append(img);
      link.addEventListener('click', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        openLightbox(category, index, link);
      });
      gallery.append(link);
      imageObserver.observe(img);
    });
    article.querySelector('.scroll-gallery-button').addEventListener('click', () => {
      setExpanded(false);
      gallery.scrollBy({ left: gallery.clientWidth * 0.85, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    });
    const toggle = article.querySelector('.toggle-gallery-button');
    function setExpanded(expanded) {
      gallery.classList.toggle('expanded-gallery', expanded);
      toggle.textContent = expanded ? 'Réduire' : 'Tout afficher';
      toggle.setAttribute('aria-expanded', String(expanded));
      gallery.querySelectorAll('img').forEach(img => { img.sizes = expanded ? expandedSizes : gallerySizes; });
    }
    toggle.addEventListener('click', () => setExpanded(!gallery.classList.contains('expanded-gallery')));
    list.append(article);
    revealObserver.observe(article);
  });
  // Conserve les anciennes adresses d'ancres de la série Défense.
  if (location.hash === '#defense-defiles') document.getElementById('aviation')?.scrollIntoView();
  else if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
}

const lightbox = document.createElement('dialog');
lightbox.className = 'lightbox';
lightbox.setAttribute('aria-label', 'Visionneuse de photographies');
lightbox.innerHTML = `<button class="lightbox-close" type="button" aria-label="Fermer l’image agrandie">×</button><button class="lightbox-nav lightbox-prev" type="button" aria-label="Photo précédente">‹</button><img class="lightbox-image" alt="" /><button class="lightbox-nav lightbox-next" type="button" aria-label="Photo suivante">›</button><p class="lightbox-caption" aria-live="polite"></p>`;
document.body.append(lightbox);
const lightboxImage = lightbox.querySelector('.lightbox-image');
const lightboxCaption = lightbox.querySelector('.lightbox-caption');
let activeCategory = null;
let activeIndex = 0;
let returnFocus = null;
let imageRequest = 0;

async function showPhoto(index) {
  const request = ++imageRequest;
  activeIndex = (index + activeCategory.photos.length) % activeCategory.photos.length;
  const photo = activeCategory.photos[activeIndex];
  lightboxCaption.textContent = `${activeIndex + 1} / ${activeCategory.photos.length} — ${activeCategory.title}`;
  lightboxImage.src = photo.medium.src;
  lightboxImage.alt = photo.alt;
  lightbox.setAttribute('aria-busy', 'true');
  const full = new Image();
  full.src = photo.full.src;
  try {
    await full.decode();
    if (request === imageRequest && lightbox.open) lightboxImage.src = photo.full.src;
  } catch {
    if (request === imageRequest) lightboxCaption.textContent += ' · Aperçu disponible';
  } finally {
    if (request === imageRequest) lightbox.removeAttribute('aria-busy');
  }
}

function openLightbox(category, index, link) {
  activeCategory = category;
  returnFocus = link;
  lightbox.showModal();
  document.body.classList.add('lightbox-open');
  showPhoto(index);
}

function closeLightbox() { lightbox.close(); }
lightbox.addEventListener('close', () => {
  imageRequest++;
  document.body.classList.remove('lightbox-open');
  lightboxImage.removeAttribute('src');
  lightbox.removeAttribute('aria-busy');
  returnFocus?.focus({ preventScroll: true });
});
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showPhoto(activeIndex - 1));
lightbox.querySelector('.lightbox-next').addEventListener('click', () => showPhoto(activeIndex + 1));
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
lightbox.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showPhoto(activeIndex + (event.key === 'ArrowLeft' ? -1 : 1));
  }
});
let touchStartX = null;
lightbox.addEventListener('touchstart', event => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend', event => {
  if (touchStartX !== null) {
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 50) showPhoto(activeIndex + (distance > 0 ? -1 : 1));
  }
  touchStartX = null;
}, { passive: true });

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function startHero(categories) {
  const hero = document.getElementById('hero-carousel-image');
  const title = document.getElementById('hero-carousel-title');
  const slides = categories.map(category => ({ photo: category.photos.find(p => p.rating === 5) || category.photos[0], title: category.title }));
  let index = slides.findIndex(slide => slide.photo.medium.src === hero.getAttribute('src'));
  if (index < 0) index = 0;
  let heroVisible = true;
  let busy = false;
  new IntersectionObserver(entries => { heroVisible = entries[0].isIntersecting; }).observe(hero);
  window.setInterval(async () => {
    if (!heroVisible || document.hidden || lightbox.open || reducedMotion.matches || navigator.connection?.saveData || busy) return;
    const nextIndex = (index + 1) % slides.length;
    const next = slides[nextIndex];
    const ready = new Image();
    ready.sizes = hero.sizes;
    ready.srcset = sourceSet(next.photo);
    ready.src = next.photo.medium.src;
    busy = true;
    try {
      await ready.decode();
      if (!heroVisible || document.hidden) return;
      hero.classList.add('is-changing');
      await new Promise(resolve => setTimeout(resolve, 300));
      hero.srcset = sourceSet(next.photo);
      hero.src = next.photo.medium.src;
      hero.alt = next.photo.alt;
      title.textContent = next.title;
      hero.classList.remove('is-changing');
      index = nextIndex;
    } catch { /* L'image courante reste affichée si le réseau est indisponible. */ }
    finally { busy = false; }
  }, 6500);
}

async function loadCatalogue() {
  const list = document.getElementById('category-list');
  try {
    const response = await fetch('catalogue.json?v=20261017');
    if (!response.ok) throw new Error('Catalogue indisponible');
    const catalogue = await response.json();
    buildGalleries(catalogue.categories);
    startHero(catalogue.categories);
  } catch {
    list.innerHTML = '<p>Les galeries n’ont pas pu être chargées. <button class="toggle-gallery-button" type="button">Réessayer</button> ou <a href="https://gallienc.myportfolio.com/">ouvrir le portfolio</a>.</p>';
    list.querySelector('button').addEventListener('click', loadCatalogue, { once: true });
  }
}
loadCatalogue();
