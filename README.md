# Instant.GH — Site photo

Site vitrine pour presenter l'activite photo Instant.GH : demarche, univers, projets, prestations et contact.

## Fichiers principaux

- `index.html` : structure du site
- `styles.css` : mise en forme
- `script.js` : menu mobile et animations
- `catalogue.json` : 217 photographies classées dans dix galeries, par note Bridge décroissante
- `assets/catalogue/` : copies WebP optimisées, sans métadonnées EXIF/XMP
- `catalogue.css` : présentation des galeries et de la visionneuse

## Catalogue photo — 17 octobre 2026

Le catalogue reprend les 71 photos à 5 étoiles, 86 à 4 étoiles, 43 à 3 étoiles,
14 à 2 étoiles et 3 à 1 étoile. Les 246 images sans note sont exclues.
Les originaux et leurs notes ne sont jamais modifiés par le site.

Chaque photo possède trois copies WebP : aperçu de 480 pixels de large au maximum
(60 Ko maximum), aperçu de 960 pixels de large au maximum (150 Ko maximum),
et agrandissement de 1920 pixels sur le côté long au maximum (350 Ko maximum).
Les proportions et l'orientation sont conservées ; les couleurs sont converties
en sRGB si nécessaire. Le catalogue complet représente environ 46,5 Mo pour
les trois variantes, qui ne sont jamais téléchargées toutes ensemble.

Le navigateur choisit l'aperçu adapté à l'écran. Seuls les aperçus proches de la
zone visible sont chargés, y compris dans les galeries horizontales. La grande
image est chargée à l'ouverture de la visionneuse. Le carrousel s'arrête hors de
l'écran, dans un onglet masqué et en mode économie de données ou réduction des
animations. Le formulaire externe est également chargé à la demande.

## Mise en ligne GitHub Pages

Dans le depot GitHub :

1. Aller dans **Settings**
2. Ouvrir **Pages**
3. Dans **Build and deployment**, choisir :
   - Source : `Deploy from a branch`
   - Branch : `main`
   - Folder : `/root`
4. Cliquer sur **Save**

Le site sera ensuite disponible via l'adresse GitHub Pages indiquee par GitHub.
