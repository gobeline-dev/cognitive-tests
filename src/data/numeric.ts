// Banque de questions — Raisonnement numérique (format SHL Verify / EPSO).
// Généré et vérifié par un concepteur expert ; arithmétique contrôlée.
import type { TextQuestion } from '../types'

const T = (kind: 'text', q: Omit<TextQuestion, 'kind' | 'sec'>): TextQuestion => ({
  kind,
  sec: 'num',
  ...q,
})

export const numeric: TextQuestion[] = [
  T('text', {
    tag: 'Variation',
    stem: '<table class="data"><caption>Budget annuel du Fonds social européen+ (milliards €)</caption><thead><tr><th>Année</th><th>2020</th><th>2021</th><th>2022</th><th>2023</th><th>2024</th></tr></thead><tbody><tr><td>Budget</td><td>12,0</td><td>13,5</td><td>15,0</td><td>16,5</td><td>18,0</td></tr></tbody></table><p>De combien, en pourcentage, le budget a-t-il augmenté entre <b>2020 et 2024</b> ?</p>',
    options: ['40 %', '45 %', '50 %', '55 %', '60 %'],
    correct: 2,
    explain: "Variation = (18 − 12) / 12 = 6 / 12 = <b>0,50 = 50 %</b>. On rapporte toujours l'écart à la valeur de départ (2020).",
  }),
  T('text', {
    tag: 'Moyenne',
    stem: '<table class="data"><caption>Budget annuel du Fonds social européen+ (milliards €)</caption><thead><tr><th>Année</th><th>2020</th><th>2021</th><th>2022</th><th>2023</th><th>2024</th></tr></thead><tbody><tr><td>Budget</td><td>12,0</td><td>13,5</td><td>15,0</td><td>16,5</td><td>18,0</td></tr></tbody></table><p>Quel est le budget <b>moyen annuel</b> sur la période 2020-2024 ?</p>',
    options: ['13,5 Md€', '14,4 Md€', '15,0 Md€', '15,6 Md€', '16,5 Md€'],
    correct: 2,
    explain: 'Somme = 12 + 13,5 + 15 + 16,5 + 18 = <b>75</b>. Moyenne = 75 / 5 = <b>15,0 Md€</b>.',
  }),
  T('text', {
    tag: 'Pourcentage',
    stem: '<table class="data"><caption>Effectifs de quatre agences de l\'UE (2024)</caption><thead><tr><th>Agence</th><th>Titulaires</th><th>Contractuels</th></tr></thead><tbody><tr><td>EMA</td><td>620</td><td>280</td></tr><tr><td>Frontex</td><td>1 200</td><td>800</td></tr><tr><td>ECHA</td><td>350</td><td>150</td></tr><tr><td>EFSA</td><td>380</td><td>120</td></tr></tbody></table><p>Quel <b>pourcentage</b> de l\'effectif total des quatre agences est constitué de <b>contractuels</b> ?</p>',
    options: ['30,8 %', '34,6 %', '38,5 %', '41,2 %', '46,2 %'],
    correct: 1,
    explain: 'Contractuels = 280 + 800 + 150 + 120 = <b>1 350</b>. Effectif total = 2 550 + 1 350 = <b>3 900</b>. Proportion = 1 350 / 3 900 = <b>34,6 %</b>.',
  }),
  T('text', {
    tag: 'Proportion',
    stem: '<table class="data"><caption>Effectifs de quatre agences de l\'UE (2024)</caption><thead><tr><th>Agence</th><th>Titulaires</th><th>Contractuels</th></tr></thead><tbody><tr><td>EMA</td><td>620</td><td>280</td></tr><tr><td>Frontex</td><td>1 200</td><td>800</td></tr><tr><td>ECHA</td><td>350</td><td>150</td></tr><tr><td>EFSA</td><td>380</td><td>120</td></tr></tbody></table><p>Quelle <b>part de l\'effectif total</b> (titulaires + contractuels) représente l\'agence <b>Frontex</b> ?</p>',
    options: ['46,2 %', '48,7 %', '50,0 %', '51,3 %', '53,8 %'],
    correct: 3,
    explain: 'Frontex = 1 200 + 800 = <b>2 000</b>. Total des agences = <b>3 900</b>. Part = 2 000 / 3 900 = <b>51,3 %</b>. Piège : Frontex dépasse tout juste la moitié du total.',
  }),
  T('text', {
    tag: 'Variation',
    stem: '<table class="data"><caption>Production d\'électricité renouvelable dans l\'UE (TWh)</caption><thead><tr><th>Source</th><th>2022</th><th>2023</th></tr></thead><tbody><tr><td>Éolien</td><td>420</td><td>475</td></tr><tr><td>Solaire</td><td>205</td><td>260</td></tr><tr><td>Hydraulique</td><td>340</td><td>325</td></tr><tr><td>Biomasse</td><td>165</td><td>180</td></tr></tbody></table><p>Quelle a été la <b>hausse en pourcentage</b> de la production <b>solaire</b> entre 2022 et 2023 ?</p>',
    options: ['21,2 %', '24,5 %', '26,8 %', '28,0 %', '30,4 %'],
    correct: 2,
    explain: "Variation = (260 − 205) / 205 = 55 / 205 = <b>26,8 %</b>. On divise l'écart par la valeur de 2022, pas par celle de 2023.",
  }),
  T('text', {
    tag: 'Lecture graphique',
    stem: '<table class="data"><caption>Production d\'électricité renouvelable dans l\'UE (TWh)</caption><thead><tr><th>Source</th><th>2022</th><th>2023</th></tr></thead><tbody><tr><td>Éolien</td><td>420</td><td>475</td></tr><tr><td>Solaire</td><td>205</td><td>260</td></tr><tr><td>Hydraulique</td><td>340</td><td>325</td></tr><tr><td>Biomasse</td><td>165</td><td>180</td></tr></tbody></table><p>En <b>2023</b>, quelle <b>part</b> de la production renouvelable totale provient de l\'<b>éolien</b> ?</p>',
    options: ['34,7 %', '36,5 %', '38,3 %', '40,1 %', '42,0 %'],
    correct: 2,
    explain: 'Total 2023 = 475 + 260 + 325 + 180 = <b>1 240 TWh</b>. Part éolien = 475 / 1 240 = <b>38,3 %</b>.',
  }),
  T('text', {
    tag: 'Taux en cascade',
    stem: '<table class="data"><caption>Résultats d\'un concours EPSO d\'administrateurs</caption><thead><tr><th>Étape</th><th>Candidats</th><th>Admis</th></tr></thead><tbody><tr><td>Présélection (QCM)</td><td>42 000</td><td>6 300</td></tr><tr><td>Épreuves écrites</td><td>6 300</td><td>1 260</td></tr><tr><td>Centre d\'évaluation</td><td>1 260</td><td>315</td></tr></tbody></table><p>Quel est le <b>taux de réussite global</b>, des inscrits initiaux jusqu\'aux lauréats finaux ?</p>',
    options: ['0,50 %', '0,75 %', '1,25 %', '1,50 %', '2,00 %'],
    correct: 1,
    explain: 'On rapporte les lauréats finaux aux inscrits de départ : 315 / 42 000 = <b>0,0075 = 0,75 %</b>. Piège : il ne faut pas moyenner les taux de chaque étape (15 %, 20 %, 25 %) mais les multiplier : 0,15 × 0,20 × 0,25 = <b>0,0075</b>.',
  }),
  T('text', {
    tag: 'Croissance relative',
    stem: '<table class="data"><caption>Population de quatre États membres (millions d\'habitants)</caption><thead><tr><th>Pays</th><th>2019</th><th>2024</th></tr></thead><tbody><tr><td>Allemagne</td><td>83,0</td><td>84,7</td></tr><tr><td>France</td><td>67,0</td><td>68,3</td></tr><tr><td>Espagne</td><td>47,0</td><td>48,6</td></tr><tr><td>Pologne</td><td>38,0</td><td>36,9</td></tr></tbody></table><p>Quel pays a connu la <b>plus forte croissance démographique en pourcentage</b> entre 2019 et 2024 ?</p>',
    options: ['Allemagne', 'France', 'Espagne', 'Pologne', 'Croissances égales'],
    correct: 2,
    explain: "Allemagne : 1,7/83 = 2,0 %. France : 1,3/67 = 1,9 %. Espagne : 1,6/47 = <b>3,4 %</b>. Pologne : −1,1/38 = −2,9 %. Piège : l'Allemagne gagne le plus d'habitants en valeur absolue (+1,7 M), mais l'<b>Espagne</b> a la plus forte hausse relative.",
  }),
  T('text', {
    tag: 'Variations successives',
    stem: '<p>Une subvention de <b>80 000 €</b> augmente de <b>25 %</b> la première année, puis diminue de <b>20 %</b> la deuxième année.<br>Quel est son montant final ?</p>',
    options: ['76 800 €', '80 000 €', '84 000 €', '85 000 €', '100 000 €'],
    correct: 1,
    explain: "Année 1 : 80 000 × 1,25 = 100 000. Année 2 : 100 000 × 0,80 = <b>80 000 €</b>. Piège classique : +25 % puis −20 % ramène exactement à la valeur de départ, car 1,25 × 0,80 = 1,00. Les pourcentages successifs ne s'additionnent pas.",
  }),
  T('text', {
    tag: 'Vitesse',
    stem: '<p>Un train doit parcourir <b>480 km</b>. Il roule d\'abord <b>2 h</b> à <b>150 km/h</b>, puis doit couvrir le reste du trajet en <b>3 h</b>.<br>À quelle vitesse moyenne doit-il rouler sur cette dernière partie ?</p>',
    options: ['55 km/h', '60 km/h', '66 km/h', '72 km/h', '90 km/h'],
    correct: 1,
    explain: 'Distance déjà faite = 2 × 150 = 300 km. Reste = 480 − 300 = <b>180 km</b> à parcourir en 3 h. Vitesse = 180 / 3 = <b>60 km/h</b>.',
  }),
  T('text', {
    tag: 'Moyenne harmonique',
    stem: '<p>Un agent effectue l\'aller d\'une mission à <b>90 km/h</b> et le retour, par le même trajet, à <b>60 km/h</b>.<br>Quelle est sa <b>vitesse moyenne</b> sur l\'ensemble aller-retour ?</p>',
    options: ['70 km/h', '72 km/h', '74 km/h', '75 km/h', '76 km/h'],
    correct: 1,
    explain: 'Piège majeur : la moyenne n\'est PAS (90 + 60)/2 = 75. La distance étant identique, on utilise la moyenne harmonique : v = 2 × 90 × 60 / (90 + 60) = 10 800 / 150 = <b>72 km/h</b>. On passe plus de temps à la vitesse lente, donc la moyenne penche vers le bas.',
  }),
  T('text', {
    tag: 'Règle de trois',
    stem: '<p>Une imprimante produit <b>3 500 brochures</b> en <b>5 heures</b>.<br>Combien en produira-t-elle en <b>8 heures</b>, au même rythme ?</p>',
    options: ['4 900', '5 250', '5 600', '6 000', '7 000'],
    correct: 2,
    explain: 'Rythme = 3 500 / 5 = <b>700 brochures/h</b>. En 8 h : 700 × 8 = <b>5 600 brochures</b>.',
  }),
  T('text', {
    tag: 'Ratio de partage',
    stem: '<p>Un budget de <b>1 200 000 €</b> est réparti entre trois projets selon le ratio <b>3 : 4 : 5</b>.<br>Quelle somme reçoit le projet le plus doté ?</p>',
    options: ['300 000 €', '400 000 €', '480 000 €', '500 000 €', '600 000 €'],
    correct: 3,
    explain: 'Nombre total de parts = 3 + 4 + 5 = <b>12</b>. Une part = 1 200 000 / 12 = 100 000 €. Le projet le plus doté reçoit 5 parts = 5 × 100 000 = <b>500 000 €</b>.',
  }),
  T('text', {
    tag: 'Indice base 100',
    stem: '<p>En base <b>100 en 2015</b>, l\'indice des prix atteint <b>128 en 2023</b>. Un produit coûtait <b>45 €</b> en 2015 et son prix suit exactement cet indice.<br>Quel est son prix en 2023 ?</p>',
    options: ['52,20 €', '55,00 €', '57,60 €', '60,00 €', '62,40 €'],
    correct: 2,
    explain: 'Un indice de 128 signifie une hausse de 28 % depuis 2015. Prix 2023 = 45 × 128 / 100 = 45 × 1,28 = <b>57,60 €</b>.',
  }),
  T('text', {
    tag: 'Pourcentage composé',
    stem: '<p>Dans une agence, <b>60 %</b> du personnel est féminin. Parmi les femmes, <b>45 %</b> occupent un poste d\'encadrement.<br>Quel pourcentage de l\'<b>effectif total</b> est constitué de femmes cadres ?</p>',
    options: ['24 %', '27 %', '30 %', '45 %', '52,5 %'],
    correct: 1,
    explain: 'Il faut multiplier les deux proportions : 0,60 × 0,45 = <b>0,27 = 27 %</b>. Piège : on n\'additionne pas (60 % + 45 %) et les 45 % ne s\'appliquent qu\'à la sous-population des femmes.',
  }),
  T('text', {
    tag: 'Moyenne pondérée',
    stem: '<p>Un candidat obtient <b>12/20</b> à une épreuve de <b>coefficient 3</b> et <b>16/20</b> à une épreuve de <b>coefficient 2</b>.<br>Quelle est sa <b>moyenne pondérée</b> ?</p>',
    options: ['13,2', '13,6', '14,0', '14,4', '14,8'],
    correct: 1,
    explain: 'Moyenne pondérée = (12 × 3 + 16 × 2) / (3 + 2) = (36 + 32) / 5 = 68 / 5 = <b>13,6</b>. Piège : la moyenne simple (12 + 16)/2 = 14 est fausse car les coefficients diffèrent.',
  }),
]
