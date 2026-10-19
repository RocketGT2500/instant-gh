# Instant.GH — Site photo

Site vitrine statique de Gallien Humez, publié sur https://instant-gh.fr/ avec GitHub Pages.

## Fichiers principaux

- index.html : accueil, accès aux dix thèmes, projets, présentation et contact.
- script.js : menu mobile, galeries, visionneuse, pause du diaporama et chargement du formulaire.
- catalogue.json : 221 photos, titres, descriptions visuelles et variantes WebP, avec couvertures choisies puis classement par note Bridge décroissante.
- styles.css : mise en page commune et navigation.
- catalogue.css : couvertures, galeries et visionneuse.
- contact-form.css : contact et intégration Tally.
- mentions.html : informations sur l’éditeur, les photographies et les données personnelles.
- merci.html : page de remerciement conservée pour les liens et éventuelles redirections existants.
- favicon.svg, robots.txt, sitemap.xml : icône et informations de découverte du site.
- assets/catalogue/ : copies WebP optimisées, sans métadonnées EXIF/XMP.

## Galeries et accessibilité

Chaque galerie présente d’abord au maximum huit photos. Le bouton « Voir les … photos »
donne accès à la collection complète ; aucune photographie n’a été retirée.
Chaque photo possède un titre court (`title`), affiché dans la visionneuse,
et une description visuelle (`alt`) destinée à l’accessibilité. Le nom de l’espèce
ou du modèle est précisé uniquement lorsque l’identification est fiable.
Si le titre manque, la visionneuse utilise la description comme texte de secours.
La photo choisie dans coverPhotoId est placée en tête et sert aussi au diaporama.
Les autres images gardent leur ordre relatif. Les couvertures statiques dans index.html
doivent être actualisées avec le catalogue.
La visionneuse permet de parcourir toute la catégorie avec les flèches, le clavier
ou un geste horizontal. Échap ferme la visionneuse et le focus revient à la photo ouverte.
Sans JavaScript, les couvertures et le lien de secours donnent accès à Adobe Portfolio.

Les images des galeries ne sont chargées qu’à proximité de la zone visible.
Les agrandissements ne sont chargés qu’à l’ouverture de la visionneuse.
Le diaporama peut être mis en pause ; il est suspendu hors écran, dans un onglet masqué
ou pendant l’utilisation de la visionneuse. Il démarre en pause si la réduction des
animations ou l’économie de données est activée.

Les 217 photos initiales conservent leurs variantes et leurs notes : 71 photos à cinq étoiles,
86 à quatre, 43 à trois, 14 à deux et trois à une étoile. Quatre photographies automobiles
sans note (4D0A3142, 4D0A3219, 4D0A3804 et 4D0A3840), ajoutées à la demande du photographe,
portent le total à 221 photos et la galerie Automobiles et circuit à 20 photos.
Chaque image possède un aperçu de 480 pixels de large au maximum, un aperçu de 960 pixels
et un agrandissement de 1920 pixels sur le côté long au maximum.
Les trois variantes représentent environ 47,6 Mo et ne sont pas chargées toutes ensemble.

## Formulaire Tally

Le formulaire 816pel est intégré avec data-tally-src et dynamicHeight=1.
Le script officiel https://tally.so/widgets/embed.js est chargé à l’approche de la section
Contact, puis Tally.loadEmbeds() initialise le formulaire et sa hauteur automatique.
Un lien direct vers Tally et une adresse email restent disponibles si l’intégration échoue.
Les données personnelles sont décrites dans mentions.html et rappelées à côté du formulaire.
Les réglages du formulaire, ses destinataires, sa conservation et ses notifications se
gèrent dans le compte Tally ; ils ne sont pas modifiés par le code de ce dépôt.

## Vérifications locales

Aucune compilation ni installation de dépendances n’est nécessaire.
Depuis ce dossier, lancer un serveur statique, par exemple avec Python :

    python -m http.server 8000 --bind 127.0.0.1

Ouvrir ensuite http://127.0.0.1:8000/ et vérifier :

- les galeries, le mode complet, les liens vers les thèmes et la visionneuse ;
- la pause du diaporama et la fermeture du menu mobile ;
- la hauteur du formulaire et ses liens de secours, sans soumettre de demande de test ;
- les pages mentions.html et merci.html, notamment leur navigation sur petit écran.

## Publication

GitHub Pages utilise la branche main et le dossier racine.
Le fichier CNAME conserve le domaine instant-gh.fr.
