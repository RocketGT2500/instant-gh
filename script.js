document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('#main-menu');
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

if (menuButton && menu) {
  const closeMenu = () => {
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  };
  menuButton.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', String(menu.classList.toggle('open')));
  });
  menu.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('open')) {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.nav')) closeMenu();
  });
  window.matchMedia('(min-width: 861px)').addEventListener('change', closeMenu);
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));
const sourceSet = photo => `${photo.small.src} ${photo.small.width}w, ${photo.medium.src} ${photo.medium.width}w`;
const gallerySizes = '(max-width: 600px) 80vw, 340px';
const expandedSizes = '(max-width: 600px) calc(100vw - 64px), (max-width: 1100px) 30vw, 260px';

// Le script est partagé avec les pages d’informations et de remerciement.
if (document.getElementById('category-list')) initPhotoSite();

async function initPhotoSite() {
  const list = document.getElementById('category-list');
  const loadImage = img => {
    if (!img.dataset.src) return;
    img.srcset = img.dataset.srcset;
    img.src = img.dataset.src;
    delete img.dataset.src;
    delete img.dataset.srcset;
  };
  const imageObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      loadImage(entry.target);
      imageObserver.unobserve(entry.target);
    }
  }, { rootMargin: '240px 0px' }) : null;
  const observeImage = img => imageObserver ? imageObserver.observe(img) : loadImage(img);

  const lightbox = document.createElement('dialog');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('aria-label', 'Visionneuse de photographies');
  lightbox.innerHTML = '<button class="lightbox-close" type="button" aria-label="Fermer l’image agrandie">×</button><button class="lightbox-nav lightbox-prev" type="button" aria-label="Photo précédente">‹</button><img class="lightbox-image" alt="" /><button class="lightbox-nav lightbox-next" type="button" aria-label="Photo suivante">›</button><p class="lightbox-caption" aria-live="polite"></p>';
  document.body.append(lightbox);
  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  let activeCategory;
  let activeIndex = 0;
  let returnFocus;
  let imageRequest = 0;

  async function showPhoto(index) {
    const request = ++imageRequest;
    activeIndex = (index + activeCategory.photos.length) % activeCategory.photos.length;
    const photo = activeCategory.photos[activeIndex];
    lightboxCaption.textContent = `${activeIndex + 1} / ${activeCategory.photos.length} — ${photo.alt}`;
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

  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showPhoto(activeIndex - 1));
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => showPhoto(activeIndex + 1));
  lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
  lightbox.addEventListener('close', () => {
    imageRequest++;
    document.body.classList.remove('lightbox-open');
    lightboxImage.removeAttribute('src');
    lightbox.removeAttribute('aria-busy');
    returnFocus?.focus({ preventScroll: true });
  });
  lightbox.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(activeIndex + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  let touchStart = null;
  lightbox.addEventListener('touchstart', event => {
    touchStart = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
  }, { passive: true });
  lightbox.addEventListener('touchend', event => {
    if (touchStart) {
      const dx = event.changedTouches[0].clientX - touchStart.x;
      const dy = event.changedTouches[0].clientY - touchStart.y;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) showPhoto(activeIndex + (dx > 0 ? -1 : 1));
    }
    touchStart = null;
  }, { passive: true });
  lightbox.addEventListener('touchcancel', () => { touchStart = null; }, { passive: true });

  function buildGalleries(categories) {
    list.replaceChildren();
    categories.forEach(category => {
      const previewCount = Math.min(8, category.photos.length);
      const article = document.createElement('article');
      article.id = category.id;
      article.className = 'category-block';
      article.innerHTML = `<div class="category-head"><div><h3>${escapeHtml(category.title)}</h3><p>${escapeHtml(category.text)}</p></div><div class="gallery-actions"><button class="scroll-gallery-button" type="button" aria-label="Faire défiler : ${escapeHtml(category.title)}">Faire défiler →</button><button class="toggle-gallery-button" type="button" aria-expanded="false" aria-controls="gallery-${category.id}">Voir les ${category.photos.length} photos</button></div></div><div class="category-meta">${category.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}<span class="gallery-count">${previewCount} sur ${category.photos.length} photos</span></div><div id="gallery-${category.id}" class="category-gallery" role="group" aria-label="${escapeHtml(category.title)}"></div><p class="gallery-bottom"><a href="#series">Choisir une autre galerie ↑</a></p>`;
      const gallery = article.querySelector('.category-gallery');
      const toggle = article.querySelector('.toggle-gallery-button');
      const scrollButton = article.querySelector('.scroll-gallery-button');
      const count = article.querySelector('.gallery-count');
      if (category.photos.length <= previewCount) toggle.hidden = true;
      category.photos.forEach((photo, index) => {
        const link = document.createElement('a');
        link.className = 'gallery-photo';
        link.href = photo.full.src;
        link.hidden = index >= previewCount;
        link.setAttribute('aria-label', `Agrandir : ${photo.alt}`);
        const img = document.createElement('img');
        img.width = photo.small.width;
        img.height = photo.small.height;
        img.alt = photo.alt;
        img.decoding = 'async';
        img.sizes = gallerySizes;
        img.dataset.src = photo.small.src;
        img.dataset.srcset = sourceSet(photo);
        img.addEventListener('error', () => link.classList.add('photo-unavailable'), { once: true });
        link.append(img);
        link.addEventListener('click', event => {
          if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || typeof lightbox.showModal !== 'function') return;
          event.preventDefault();
          activeCategory = category;
          returnFocus = link;
          lightbox.showModal();
          document.body.classList.add('lightbox-open');
          showPhoto(index);
        });
        gallery.append(link);
        if (!link.hidden) observeImage(img);
      });
      function setExpanded(expanded) {
        gallery.classList.toggle('expanded-gallery', expanded);
        toggle.textContent = expanded ? 'Revenir à la sélection' : `Voir les ${category.photos.length} photos`;
        toggle.setAttribute('aria-expanded', String(expanded));
        count.textContent = expanded ? `${category.photos.length} photos` : `${previewCount} sur ${category.photos.length} photos`;
        scrollButton.hidden = expanded;
        gallery.querySelectorAll('.gallery-photo').forEach((link, index) => {
          link.hidden = !expanded && index >= previewCount;
          const img = link.querySelector('img');
          img.sizes = expanded ? expandedSizes : gallerySizes;
          if (!link.hidden && img.dataset.src) observeImage(img);
          else if (link.hidden) imageObserver?.unobserve(img);
        });
      }
      toggle.addEventListener('click', () => setExpanded(!gallery.classList.contains('expanded-gallery')));
      scrollButton.addEventListener('click', () => {
        const end = gallery.scrollWidth - gallery.clientWidth;
        const left = gallery.scrollLeft >= end - 4 ? 0 : gallery.scrollLeft + gallery.clientWidth * .85;
        gallery.scrollTo({ left, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
      });
      list.append(article);
    });
    document.querySelectorAll('[data-gallery-target]').forEach(link => {
      if (document.getElementById(link.dataset.galleryTarget)) link.href = `#${link.dataset.galleryTarget}`;
    });
    followGalleryHash();
  }

  // Seules les ancres des galeries nécessitent d’attendre le catalogue.
  function followGalleryHash() {
    const id = location.hash.slice(1);
    const target = id === 'defense-defiles' ? document.getElementById('aviation') : document.getElementById(id);
    if (target?.classList.contains('category-block')) target.scrollIntoView({ behavior: 'instant' });
  }
  window.addEventListener('hashchange', followGalleryHash);

  function startHero(categories) {
    const hero = document.getElementById('hero-carousel-image');
    const title = document.getElementById('hero-carousel-title');
    const pause = document.getElementById('hero-pause');
    if (!hero || !title || !pause) return;
    const slides = categories.map(category => ({
      photo: category.photos.find(p => p.medium.src === hero.getAttribute('src'))
        || category.photos.find(p => p.rating >= 4 && p.medium.width / p.medium.height >= 1.2)
        || category.photos[0],
      title: category.title
    }));
    let index = slides.findIndex(slide => slide.photo.medium.src === hero.getAttribute('src'));
    if (index < 0) index = 0;
    let visible = true;
    let busy = false;
    let paused = reducedMotion.matches || Boolean(navigator.connection?.saveData);
    const updatePause = () => { pause.textContent = paused ? 'Reprendre le diaporama' : 'Mettre le diaporama en pause'; };
    pause.hidden = false;
    updatePause();
    pause.addEventListener('click', () => { paused = !paused; updatePause(); });
    reducedMotion.addEventListener('change', event => {
      if (event.matches) { paused = true; updatePause(); }
    });
    navigator.connection?.addEventListener('change', () => {
      if (navigator.connection.saveData) { paused = true; updatePause(); }
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }).observe(hero);
    }
    window.setInterval(async () => {
      if (paused || !visible || document.hidden || lightbox.open || busy) return;
      const nextIndex = (index + 1) % slides.length;
      const next = slides[nextIndex];
      const ready = new Image();
      ready.sizes = hero.sizes;
      ready.srcset = sourceSet(next.photo);
      ready.src = next.photo.medium.src;
      busy = true;
      try {
        await ready.decode();
        if (paused || !visible || document.hidden || lightbox.open) return;
        hero.classList.add('is-changing');
        if (!reducedMotion.matches) await new Promise(resolve => setTimeout(resolve, 250));
        if (paused || !visible || document.hidden || lightbox.open) return;
        hero.srcset = sourceSet(next.photo);
        hero.src = next.photo.medium.src;
        hero.alt = next.photo.alt;
        hero.width = next.photo.medium.width;
        hero.height = next.photo.medium.height;
        title.textContent = next.title;
        index = nextIndex;
      } catch { /* L’image courante reste visible si le réseau est indisponible. */ }
      finally { hero.classList.remove('is-changing'); busy = false; }
    }, 6500);
  }

  async function loadCatalogue() {
    try {
      const response = await fetch('catalogue.json?v=20261017-2');
      if (!response.ok) throw new Error('Catalogue indisponible');
      const catalogue = await response.json();
      if (!Array.isArray(catalogue.categories) || !catalogue.categories.length
        || catalogue.categories.some(category => !Array.isArray(category.photos) || !category.photos.length)) {
        throw new Error('Catalogue incomplet');
      }
      buildGalleries(catalogue.categories);
      startHero(catalogue.categories);
    } catch {
      list.innerHTML = '<p>Les galeries n’ont pas pu être chargées. <button class="toggle-gallery-button" type="button">Réessayer</button> ou <a href="https://gallienc.myportfolio.com/">ouvrir les collections Adobe Portfolio</a>.</p>';
      list.querySelector('button').addEventListener('click', loadCatalogue, { once: true });
    }
  }
  await loadCatalogue();
}

const tallyCard = document.querySelector('.tally-embed-card');
if (tallyCard) {
  const loadForm = () => {
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    script.addEventListener('load', () => {
      if (window.Tally?.loadEmbeds) window.Tally.loadEmbeds();
      else showFormError();
    }, { once: true });
    script.addEventListener('error', showFormError, { once: true });
    document.head.append(script);
  };
  const showFormError = () => {
    document.getElementById('form-status').textContent = 'Le formulaire intégré est indisponible. Utilisez le lien ci-dessous ou écrivez-moi par email.';
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer.disconnect();
        loadForm();
      }
    }, { rootMargin: '500px 0px' });
    observer.observe(tallyCard);
  } else loadForm();
}
