// Banque de questions — Raisonnement verbal (format SHL Verify / EPSO).
// Réponses : Vrai / Faux / On ne peut pas savoir. On juge UNIQUEMENT d'après le passage.
import type { VerbalQuestion } from '../types'

export const VFN = ['Vrai', 'Faux', 'On ne peut pas savoir']

const P_DSA = "Le règlement (UE) 2022/2065, entré en vigueur le 1er janvier 2023, oblige toute plateforme numérique comptant plus de 45 millions d'utilisateurs actifs mensuels dans l'Union à publier un rapport de transparence tous les six mois. Les plateformes de taille inférieure ne sont tenues qu'à une publication annuelle. Le respect de ces obligations est contrôlé par la Commission européenne."
const P_CONCOURS = "L'avis de concours EPSO/AD/400 précise que les candidats doivent, à la fois, posséder un diplôme universitaire sanctionnant un cycle complet d'au moins trois ans et justifier d'une expérience professionnelle de deux années minimum. Les tests de présélection se déroulent sur ordinateur dans un centre agréé. La liste de réserve est valable deux ans."
const P_ACCUEIL = "Le centre administratif reçoit le public du lundi au vendredi, de 8 h 30 à 16 h 00, sans interruption. Le mardi, une permanence exceptionnelle est assurée jusqu'à 19 h 00. Les prises de rendez-vous s'effectuent exclusivement en ligne."
const P_AGENCE = "En 2023, l'agence a traité 12 400 demandes, contre 9 800 en 2022. Le délai moyen de traitement est passé de 45 jours en 2022 à 30 jours en 2023. L'agence a par ailleurs recruté quinze nouveaux agents en septembre 2023."
const P_TELETRAVAIL = "La politique interne autorise chaque salarié à télétravailler jusqu'à trois jours par semaine, sous réserve de l'accord préalable de son responsable. Les réunions d'équipe hebdomadaires se tiennent obligatoirement en présentiel, le lundi. Aucun télétravail n'est possible durant la période d'essai."
const P_DOSSIER = 'Tous les dossiers déposés après le 31 mars sont examinés lors de la session d\'automne. Le dossier de M. Dupont a été déposé le 15 février.'
const P_HELIOS = 'Lors du dernier appel à propositions, seuls les projets ayant obtenu une note strictement supérieure à 70 sur 100 ont été retenus pour un financement. Le projet Helios a obtenu 68 points.'

const V = (q: Omit<VerbalQuestion, 'kind' | 'sec' | 'options'>): VerbalQuestion => ({
  kind: 'verbal',
  sec: 'verb',
  options: VFN,
  ...q,
})

export const verbal: VerbalQuestion[] = [
  V({
    tag: 'Quantificateur',
    passage: P_DSA,
    statement: 'Une plateforme comptant 50 millions d\'utilisateurs actifs mensuels doit publier un rapport de transparence deux fois par an.',
    correct: 0,
    explain: 'Le texte vise les plateformes de « plus de 45 millions » d\'utilisateurs, tenues à un rapport « tous les six mois », soit deux fois par an. Comme 50 > 45, l\'obligation semestrielle s\'applique → <b>Vrai</b>.',
  }),
  V({
    tag: 'Quantificateur',
    passage: P_DSA,
    statement: 'Une plateforme comptant exactement 45 millions d\'utilisateurs actifs mensuels est soumise à l\'obligation semestrielle.',
    correct: 1,
    explain: 'Le seuil est « <b>plus de</b> 45 millions », une borne <i>stricte</i>. Exactement 45 millions n\'est pas « plus de 45 millions » : la plateforme relève donc de la publication annuelle → <b>Faux</b>.',
  }),
  V({
    tag: 'Piège',
    passage: P_DSA,
    statement: 'Une plateforme qui omet de publier son rapport encourt une amende équivalant à 6 % de son chiffre d\'affaires annuel.',
    correct: 2,
    explain: 'Le texte indique seulement que le respect des obligations est « contrôlé par la Commission ». Aucune sanction, ni son montant, n\'est mentionnée. Ajouter une amende chiffrée relève d\'une information extérieure au passage → <b>On ne peut pas savoir</b>.',
  }),
  V({
    tag: 'Logique',
    passage: P_CONCOURS,
    statement: 'Un candidat titulaire d\'un diplôme universitaire de trois ans, mais dépourvu d\'expérience professionnelle, peut être admis à concourir.',
    correct: 1,
    explain: 'Les deux conditions sont cumulatives (« à la fois… et… »). Sans les deux années d\'expérience professionnelle exigées, la condition n\'est pas remplie, quel que soit le diplôme → <b>Faux</b>.',
  }),
  V({
    tag: 'Quantificateur',
    passage: P_CONCOURS,
    statement: 'Un candidat justifiant de quatre années d\'expérience professionnelle satisfait à la condition d\'expérience.',
    correct: 0,
    explain: 'La condition est « deux années <b>minimum</b> », une borne <i>inclusive</i>. Quatre années dépassent ce seuil (4 ≥ 2), la condition d\'expérience est donc satisfaite → <b>Vrai</b>.',
  }),
  V({
    tag: 'Piège',
    passage: P_CONCOURS,
    statement: 'La durée de validité de la liste de réserve peut être prolongée au-delà de deux ans.',
    correct: 2,
    explain: 'Le texte indique que la liste « est valable deux ans » mais ne dit rien sur une éventuelle prolongation. Ni confirmée ni infirmée → <b>On ne peut pas savoir</b>.',
  }),
  V({
    tag: 'Vrai/Faux',
    passage: P_ACCUEIL,
    statement: 'Un usager peut être reçu le mardi à 17 h 30.',
    correct: 0,
    explain: 'Le mardi, la permanence est assurée « jusqu\'à 19 h 00 ». 17 h 30 se situe avant cette limite, l\'accueil est donc ouvert → <b>Vrai</b>.',
  }),
  V({
    tag: 'Vrai/Faux',
    passage: P_ACCUEIL,
    statement: 'Il est possible de prendre rendez-vous par téléphone.',
    correct: 1,
    explain: 'Le texte précise que les rendez-vous se prennent « <b>exclusivement</b> en ligne ». Le canal téléphonique est donc explicitement exclu → <b>Faux</b>.',
  }),
  V({
    tag: 'Vrai/Faux',
    passage: P_AGENCE,
    statement: 'En 2022, le délai moyen de traitement dépassait un mois.',
    correct: 0,
    explain: 'En 2022, le délai moyen était de 45 jours, soit plus de 30 jours (un mois). 45 > 30 → le délai dépassait bien un mois → <b>Vrai</b>.',
  }),
  V({
    tag: 'Corrélation ≠ cause',
    passage: P_AGENCE,
    statement: 'La réduction du délai de traitement s\'explique par le recrutement des quinze nouveaux agents.',
    correct: 2,
    explain: 'Le texte mentionne côte à côte la baisse du délai <i>et</i> le recrutement, mais n\'établit aucun lien de cause à effet. Passer de la coïncidence (« par ailleurs ») à la causalité (« s\'explique par ») est un ajout non fondé → <b>On ne peut pas savoir</b>.',
  }),
  V({
    tag: 'Vrai/Faux',
    passage: P_AGENCE,
    statement: 'Le nombre de demandes traitées a diminué entre 2022 et 2023.',
    correct: 1,
    explain: 'L\'agence a traité 12 400 demandes en 2023 contre 9 800 en 2022. 12 400 > 9 800 : le nombre a <b>augmenté</b>, non diminué → <b>Faux</b>.',
  }),
  V({
    tag: 'Logique',
    passage: P_TELETRAVAIL,
    statement: 'Un salarié encore en période d\'essai peut télétravailler deux jours par semaine.',
    correct: 1,
    explain: 'Le texte est catégorique : « <b>Aucun</b> télétravail n\'est possible durant la période d\'essai ». Le quantificateur exclut tout jour de télétravail, y compris deux → <b>Faux</b>.',
  }),
  V({
    tag: 'Logique',
    passage: P_TELETRAVAIL,
    statement: 'Le responsable peut refuser une demande de télétravail présentée par un salarié.',
    correct: 0,
    explain: 'Le télétravail est accordé « sous réserve de l\'accord préalable de son responsable ». Subordonner le droit à un accord implique que ce dernier peut être refusé → <b>Vrai</b>.',
  }),
  V({
    tag: 'Logique',
    passage: P_DOSSIER,
    statement: 'Le dossier de M. Dupont sera examiné lors de la session d\'automne.',
    correct: 2,
    explain: 'La règle ne concerne que les dossiers déposés <i>après</i> le 31 mars. Déposé le 15 février, le dossier n\'est pas visé par cette règle, qui ne dit rien du sort des dépôts antérieurs → <b>On ne peut pas savoir</b>.',
  }),
  V({
    tag: 'Quantificateur',
    passage: P_HELIOS,
    statement: 'Le projet Helios a été retenu pour un financement.',
    correct: 1,
    explain: '« Seuls » les projets notés au-dessus de 70 ont été financés. Avec 68 points, Helios est sous le seuil (68 < 70) et se trouve donc exclu → <b>Faux</b>.',
  }),
  V({
    tag: 'Quantificateur',
    passage: P_HELIOS,
    statement: 'Un projet ayant obtenu exactement 70 points a été retenu pour un financement.',
    correct: 1,
    explain: 'Le seuil est « <b>strictement</b> supérieur à 70 », une borne <i>exclusive</i>. Une note de 70 n\'est pas strictement supérieure à 70, le projet n\'est donc pas financé → <b>Faux</b>.',
  }),
]
