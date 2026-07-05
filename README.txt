================================================================
 ENTRAÎNEMENT AUX TESTS COGNITIFS SHL — PRÉPARATION CONCOURS EPSO
================================================================

CONTEXTE (demande initiale)
---------------------------
« Dans le contexte du concours EPSO j'ai besoin de m'entraîner aux
  tests cognitifs SHL :
  https://www.shl.com/products/assessments/cognitive-assessments/
  Peux-tu me générer cela ? »

Cette application web est une plateforme d'entraînement, indépendante
et non affiliée à SHL ni à EPSO, qui reproduit les FORMATS des
évaluations cognitives de type SHL Verify utilisées dans les concours
de recrutement des institutions de l'Union européenne (EPSO).
Toutes les questions sont originales.


CE QUE FAIT L'APPLICATION
-------------------------
Trois familles de tests cognitifs, plus un test complet :

  • Raisonnement numérique (22 questions)
    Tableaux, graphiques, pourcentages, variations successives,
    moyennes (dont moyenne harmonique), ratios, taux, indices,
    règle de trois, taux de change, TVA, balance commerciale, taux
    d'exécution. Contexte européen (budgets, agences, énergie,
    démographie, concours, marchés).

  • Raisonnement verbal (24 questions)
    Format « Vrai / Faux / On ne peut pas savoir ». On juge
    UNIQUEMENT d'après le passage fourni, jamais avec des
    connaissances extérieures. Pièges classiques : information
    absente, corrélation ≠ causalité, quantificateurs (« seuls »,
    « aucun », « plus de », « au moins »), bornes strictes/inclusives.

  • Raisonnement abstrait / inductif (18 questions)
    Séries logiques, intrus, figures géométriques générées en SVG :
    rotation horaire/anti-horaire, incrémentation/décrémentation,
    déplacements, doubles règles, relations côtés/points.

  Soit 64 questions au total (test complet).

Fonctionnalités clés :
  • Bilingue anglais / français, ANGLAIS PAR DÉFAUT, bascule EN/FR
    à tout moment (préférence mémorisée). Interface ET contenu des
    44 questions traduits.
  • Deux modes :
      - Mode examen        : correction et score affichés à la fin.
      - Mode apprentissage : correction immédiate après chaque réponse.
  • Chronomètre optionnel (budget-temps réaliste par section).
  • Correction commentée : chaque question est expliquée pas à pas,
    les pièges sont signalés, dans un langage accessible à tous.
  • Statistiques : score, sous-score « On ne peut pas savoir »,
    performance PAR TYPE DE QUESTION, temps par question, et courbe
    d'évolution du score par section (tableau de bord).
  • Ordre des options randomisé (numérique/abstrait) pour entraîner
    le raisonnement plutôt que la mémorisation de position.
  • Navigation libre : boutons Précédent/Suivant, étoiles de
    progression cliquables, ou clavier (touches A–E, flèches ← →).
  • Garde-fou avant de terminer si des questions restent sans réponse.
  • Persistance locale (localStorage) : reprise automatique d'une
    session interrompue + historique des scores + tableau de bord de
    progression, avec bouton de réinitialisation (Reset).
  • Entièrement fonctionnelle sur mobile (cibles tactiles, responsive).


PILE TECHNIQUE
--------------
  • React 19 + TypeScript
  • Vite 6 (build & serveur de développement)
  • Aucune dépendance UI externe ; figures SVG générées en code.
  • Déploiement : GitHub Pages.


STRUCTURE DU PROJET
-------------------
  index.html                 Point d'entrée HTML (polices, montage React)
  vite.config.ts             Config Vite (base = /cognitive-tests/)
  tsconfig.json              Config TypeScript
  package.json               Dépendances et scripts npm
  public/.nojekyll           Désactive Jekyll sur GitHub Pages

  src/
    main.tsx                 Montage React (dans LangProvider)
    App.tsx                  Machine à états + chrono + persistance
    i18n.tsx                 Internationalisation EN/FR (contexte + chaînes)
    styles.css               Feuille de styles (design system complet)
    types.ts                 Types partagés
    lib/
      figures.ts             Générateurs de figures SVG + libellés a11y
      questions.ts           Assemblage de la banque (par langue) + normalisation
      storage.ts             Hook useLocalStorage
    data/                    « Base de données » de questions
      numeric.ts             16 questions numériques (FR)
      verbal.ts              16 questions verbales (FR)
      abstract.ts            12 questions abstraites (FigSpec, partagées)
      en/numeric.ts          16 questions numériques (EN)
      en/verbal.ts           16 questions verbales (EN)
      en/abstract.ts         12 questions abstraites (EN, réutilise les figures)
      extra.ts               Chargeur du contenu additionnel bilingue
      extra/numeric.json     +6 questions numériques (FR+EN)
      extra/verbal.json      +8 questions verbales (FR+EN)
      extra/abstract.json    +6 questions abstraites (FR+EN)
    components/
      Emblem.tsx             Emblème (anneau d'étoiles)
      LangToggle.tsx         Sélecteur de langue EN/FR
      Sparkline.tsx          Mini-courbe d'évolution des scores
      Intro.tsx              Écran d'accueil + tableau de bord
      Exam.tsx               Écran d'examen (question, chrono, clavier)
      Results.tsx            Écran de résultats + revue commentée

  scripts/
    build.ps1                Build de production
    deploy.ps1               Build + déploiement gh-pages
  .github/workflows/
    deploy.yml               Déploiement automatique sur push (main)


DÉVELOPPEMENT LOCAL
-------------------
  npm install
  npm run dev        → http://localhost:5173/cognitive-tests/
  npm run build      → génère dist/
  npm run preview    → prévisualise le build de production


DÉPLOIEMENT SUR GITHUB PAGES (via GitHub Actions)
-------------------------------------------------
Le déploiement est AUTOMATIQUE : chaque « git push » sur la branche
main déclenche le workflow .github/workflows/deploy.yml, qui build
l'application et publie dist/ sur GitHub Pages.

Prérequis — UNE SEULE FOIS, dans le dépôt GitHub :
  Settings > Pages > Build and deployment > Source = « GitHub Actions ».

Ensuite, pour publier une mise à jour :
  git push origin main        (ou : pwsh ./scripts/deploy.ps1)

URL du site publié :
  https://gobeline-dev.github.io/cognitive-tests/


AJOUTER OU MODIFIER DES QUESTIONS
---------------------------------
Éditez les fichiers de données dans src/data/ (FR) et src/data/en/ (EN) :
  • numeric.ts  — objets { tag, stem (HTML), options[5], correct, explain }
  • verbal.ts   — objets { tag, passage, statement, correct, explain }
  • abstract.ts — objets { tag, prompt, series, options, correct, explain }
                  où chaque figure est un descripteur [générateur, ...args].
IMPORTANT : garder FR et EN alignés (même nombre de questions, même
ordre, même ordre des options et même index `correct`). Les fichiers
en/*.ts doivent refléter les mêmes questions traduites. Pour l'abstrait,
en/abstract.ts réutilise les figures FR et ne traduit que le texte.
Les compteurs et budgets-temps s'ajustent automatiquement.


MENTIONS
--------
Outil d'entraînement indépendant, non affilié à SHL ni à EPSO.
Ressource officielle de référence :
  https://www.shl.com/products/assessments/cognitive-assessments/

----------------------------------------------------------------
Ce fichier est maintenu à jour au fil de l'évolution du projet.
Dernière mise à jour : voir l'historique git.
----------------------------------------------------------------
