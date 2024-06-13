import { type Solution } from "@/lib/common/domain/values/Solution";

export const solution = {
  id: "22",
  nom: "Pompe à chaleur air / air (DRV)",
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
        contenu: "Prévoir une éventuelle rénovation des réseaux ECS et création d’un réseau de fluide frigorigène.",
      },
    ],
  },
  travauxCollectif: {
    note: "dynamic",
    texte: [
      {
        titre: "Réseau de fluide frigorigène",
        contenu:
          "Il faut prévoir la création d’un réseau de fluide frigorigène pour relier le DRV (généralement installé en toiture) aux unités intérieures qui sont disposées dans chaque logement.",
      },
      {
        titre: "Déroulement des travaux",
        contenu:
          "Travaux rapides dans des parties communes peu fréquentées pour l’installation de la DRV (unité extérieure).",
      },
    ],
  },
  travauxIndividuel: {
    note: "dynamic",
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
          "Le bruit d’une PAC est couvert par les bruits ambiants la journée mais peut être gênant la nuit si l’unité est trop proche des chambres. Il existe des solutions pour diminuer l’impact sonore des unités extérieures.",
      },
    ],
  },
  espaceExterieur: {
    note: "A",
    image: "12-22 - PAC air air DRV - impact exterieur.png",
    texte: [
      {
        titre: "Unité extérieure",
        contenu: "Les PAC air / air disposent d’une unité extérieure (sol, toiture, jardin ou terrasse).",
      },
      {
        titre: "Emprise des PAC",
        contenu: "Assurez-vous que la place est suffisante en extérieur (voir la surface estimée).",
      },
      {
        titre: "Structure",
        contenu:
          "En cas de pose en toiture-terrasse, anticipez l’impact des PAC sur la capacité structurelle de la toiture.",
      },
      {
        titre: "PLU",
        contenu:
          "Vérifiez que l'installation de PAC est compatible avec le PLU (notamment la hauteur si la PAC est en toiture).",
      },
    ],
  },
  maturite: {
    note: "C",
    texte: [],
  },
} satisfies Solution;
