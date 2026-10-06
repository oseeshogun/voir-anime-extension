# Contribuer

Merci de ton intérêt pour **Voir Anime - Historique** ! Les contributions (bugs, idées, code, documentation) sont les bienvenues.

## Signaler un bug ou proposer une idée

Ouvre une [issue](https://github.com/oseeshogun/voir-anime-extension/issues) en précisant :

- ton navigateur et sa version (Chrome, Edge, Brave...) ;
- l'URL de la page concernée sur voir-anime.to (si pertinent) ;
- les étapes pour reproduire le problème et ce que tu attendais ;
- les erreurs de la console (voir ci-dessous), le cas échéant.

## Environnement de développement

Il n'y a ni dépendances ni étape de build : c'est du JavaScript, HTML et CSS simples (Manifest V3).

1. Fork le dépôt puis clone-le :
   ```sh
   git clone https://github.com/<ton-compte>/voir-anime-extension.git
   ```
2. Ouvre `chrome://extensions`, active le **Mode développeur** et charge le dossier avec **Charger l'extension non empaquetée**.
3. Après chaque modification, clique sur l'icône ⟳ de l'extension dans `chrome://extensions`, puis recharge la page voir-anime.to.

### Déboguer

- **Content script** (`content.js`) : ouvre les outils de développement sur la page voir-anime.to.
- **Popup** (`popup.js`) : clic droit sur la popup → **Inspecter**.
- **Données stockées** : dans la console de la popup, `chrome.storage.local.get(console.log)`.

## Proposer une modification

1. Crée une branche à partir de `main` (`git checkout -b ma-modification`).
2. Fais des changements ciblés : une modification = une pull request.
3. Teste à la main sur voir-anime.to : enregistrement d'un épisode (VF et VOSTFR), popup (recherche, suppression, « Vider »), marqueurs « vu » et barre précédent / suivant.
4. Si la modification touche l'interface, mets à jour la capture `docs/popup.png` et le README si besoin.
5. Ouvre une pull request en décrivant le problème résolu et comment tu l'as testé.

## Conventions

- Garde le style du code existant (indentation à 2 espaces, guillemets doubles, point-virgule).
- N'ajoute pas de dépendances ni de permissions supplémentaires sans les justifier : l'extension ne demande que `storage` et l'accès à `voir-anime.to`.
- L'extension doit rester **100 % locale** : aucune donnée envoyée à un serveur tiers.
- Les textes de l'interface sont en français.
- Messages de commit courts, à l'impératif (ex. : « Corrige la détection des épisodes décimaux »).

## Licence

En contribuant, tu acceptes que ta contribution soit publiée sous la [licence MIT](LICENSE) du projet.
