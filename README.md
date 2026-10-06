# Voir Anime - Historique

Extension de navigateur qui garde l'historique des épisodes regardés sur [voir-anime.to](https://voir-anime.to).

Les données restent dans ton navigateur (`chrome.storage.local`) : rien n'est envoyé ailleurs, aucun compte requis.

## Fonctionnalités

- **Historique automatique** : chaque page d'épisode (VF ou VOSTFR) visitée est enregistrée.
- **Popup** : liste des animes regardés, regroupés par titre, avec le dernier épisode vu, le nombre d'épisodes vus et la date.
- **Recherche** dans l'historique et suppression d'un anime (✕) ou de tout l'historique (« Vider »).
- **Lien « Suivant → »** dans la popup pour passer à l'épisode suivant.
- **Marqueur « ✓ vu »** sur les liens d'épisodes déjà regardés (accueil, liste d'épisodes...).
- **Barre épisode précédent / suivant** en bas des pages d'épisode (affichée seulement si l'épisode existe).

## Installation (Chrome, Edge, Brave et autres navigateurs Chromium)

L'extension n'est pas publiée sur un store : elle s'installe en mode développeur.

1. Récupère le code :
   ```sh
   git clone https://github.com/oseeshogun/voir-anime-extension.git
   ```
   ou télécharge l'archive via **Code → Download ZIP** sur GitHub, puis décompresse-la.
2. Ouvre `chrome://extensions` (ou `edge://extensions`, `brave://extensions`).
3. Active le **Mode développeur** (en haut à droite).
4. Clique sur **Charger l'extension non empaquetée** et choisis le dossier du projet (celui qui contient `manifest.json`).
5. Ouvre un épisode sur voir-anime.to, puis clique sur l'icône de l'extension pour voir l'historique.

Astuce : épingle l'extension depuis le menu puzzle de la barre d'outils pour y accéder plus vite.

### Mise à jour

Récupère les derniers changements (`git pull` ou nouveau ZIP), puis clique sur l'icône ⟳ de l'extension dans `chrome://extensions`.

## Confidentialité et permissions

- `storage` : sauvegarder l'historique localement.
- Accès à `https://voir-anime.to/*` uniquement : lire l'URL des pages visitées et ajouter le marqueur « vu » et la barre de navigation.

L'extension ne contacte aucun autre serveur. Pour effacer tes données, utilise le bouton « Vider » ou désinstalle l'extension.

## Structure

| Fichier | Rôle |
| --- | --- |
| `manifest.json` | Déclaration de l'extension (Manifest V3) |
| `content.js` / `content.css` | Script injecté sur voir-anime.to : enregistrement, marqueurs, barre de navigation |
| `popup.html` / `popup.js` | Interface de l'historique |

## Licence

[MIT](LICENSE)
