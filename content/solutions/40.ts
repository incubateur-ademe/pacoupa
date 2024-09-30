import { ficheReference40 } from "@__content/fiches-reference";

import { type Solution } from "@/lib/common/domain/values/Solution";

export const solution = {
  id: "40",
  nom: "Pompe à chaleur air / air",
  familleSolution: "PAC Air-Air",
  type: "COL",
  typeSysteme: "CH seul : PAC Air / Eau",
  description:
    "La pompe à chaleur (PAC) air / air utilise l'air extérieur comme source d'énergie pour chauffer (ou refroidir) l'air à l'intérieur.",
  usageCh: "Oui",
  usageEcs: "Non",
  usageFr: "Oui",
  environnement: {
    note: "C",
    texte: [
      {
        titre: "Consommation d’énergie",
        contenu:
          "La pompe à chaleur utilise une énergie décarbonée (l’électricité). Son rendement est, en moyenne, trois fois supérieur à celui d’un radiateur électrique ou d’une chaudière. Attention cependant à son utilisation en climatisation qui peut consommer beaucoup d’énergie et rejette de l’air chaud à l’extérieur.",
      },
      {
        titre: "Entretien",
        contenu: "Au même titre qu’une chaudière, il est important de prévoir une maintenance régulière des appareils.",
      },
    ],
  },
  cout: {
    note: "dynamic",
  },
  difficulte: {
    note: "dynamic",
    texte: [
      {
        titre: "Unités extérieures et intérieures",
        contenu:
          "Une pompe à chaleur (PAC) Air / Air est composée d’une unité extérieure, qui capte les calories sur l’air extérieur, et d’une unité intérieure (mono-split) ou de plusieurs (multi-split). Ces unités intérieures positionnées dans chaque pièce permettent de chauffer ou refroidir l’air à l’intérieur du logement.",
      },
      {
        titre: "Structure",
        contenu:
          "En cas de pose en toiture-terrasse, anticipez l’impact des PAC sur la capacité structurelle de la toiture.",
      },
      {
        titre: "Raccordement électrique",
        contenu: "Anticipez l’impact sur la puissance de raccordement électrique.",
      },
      {
        titre: "Réseaux hydrauliques",
        contenu: "Pas de réseau hydraulique.",
      },
    ],
  },
  travauxCollectif: {
    note: "dynamic",
    texte: [
      {
        titre: "Réseau de fluide frigorigène",
        contenu:
          "Il faut prévoir la création d’un réseau de fluide frigorigène entre les unités extérieures et les unités intérieures qui sont disposées dans chaque logement.",
      },
      {
        titre: "Déroulement des travaux",
        contenu: "Travaux rapides dans des parties communes peu fréquentées.",
      },
    ],
  },
  travauxIndividuel: {
    note: "dynamic",
    image: "40 - PAC air air - appartement.png",
    texte: [
      {
        titre: "Déroulement des travaux",
        contenu: "Des unités intérieures sont installées dans chaque logement.",
      },
      {
        titre: "Emprise logement",
        contenu: "Aucune.",
      },
    ],
  },
  acoustique: {
    note: "C",
    texte: [
      {
        titre: "Volume sonore",
        contenu: "De 45 à 65dB (unité extérieure) / de 50 à 65dB (unité intérieure)",
      },
      {
        titre: "Acoustique",
        contenu:
          "Le bruit d’une PAC est couvert par les bruits ambiants la journée mais peut être gênant la nuit si l’unité est trop proche des chambres. Il existe des solutions pour diminuer l’impact sonore des unités extérieures, surtout si les unités extérieures sont positionnées sur les balcons.",
      },
    ],
  },
  espaceExterieur: {
    note: "A",
    image: "40 - PAC air air - impact exterieur.png",
    texte: [
      {
        titre: "Unités extérieures et intérieures",
        contenu:
          "Une pompe à chaleur (PAC) Air / Air est composée d’une unité extérieure, qui capte les calories sur l’air extérieur, et d’une unité intérieure (mono-split) ou de plusieurs (multi-split). Ces unités intérieures positionnées dans chaque pièce permettent de chauffer ou refroidir l’air à l’intérieur du logement.",
      },
      {
        titre: "Structure",
        contenu:
          "En cas de pose en toiture-terrasse, anticipez l’impact des PAC sur la capacité structurelle de la toiture.",
      },
      {
        titre: "Raccordement électrique",
        contenu: "Anticipez l’impact sur la puissance de raccordement électrique.",
      },
      {
        titre: "Réseaux hydrauliques",
        contenu: "Pas de réseau hydraulique.",
      },
    ],
  },
  maturite: {
    note: "C",
    texte: [
      {
        titre: "Maturité",
        contenu:
          "La maturité de l’appareil dépend du nombre d’installations et de l’ancienneté de la commercialisation.",
      },
    ],
  },
  ficheReference: ficheReference40,
} satisfies Solution;
