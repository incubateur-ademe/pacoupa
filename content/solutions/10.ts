import { type Solution } from "@/lib/enums";

export const solution = {
  id: "10",
  nom: "Pompe à chaleur air / eau",
  familleSolution: "PAC Air-Eau",
  type: "COL",
  typeSysteme: "CH + ECS : PAC Air / Eau",
  description:
    "La pompe à chaleur (PAC) air / eau prélève de la chaleur dans l'air extérieur, augmente son niveau de température et la transfère à un circuit d'eau.",
  usageCh: "Oui",
  usageEcs: "Oui",
  usageFr: "Possible",
  environnement: {
    note: "A",
    text: [
      {
        titre: "Consommation d’énergie",
        contenu:
          "La pompe à chaleur utilise une énergie décarbonée (l’électricité). Son rendement est, en moyenne, trois fois supérieur à celui d’un radiateur électrique ou d’une chaudière.",
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
    text: [
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
        contenu:
          "Nettoyage et isolation des réseaux chauffage et ECS à prévoir pour optimiser la performance de l’installation.",
      },
    ],
  },
  travauxCollectif: {
    image: "01-10-20 - PAC air eau - parties communes.png",
    note: "dynamic",
    text: [
      {
        titre: "Déroulement des travaux",
        contenu: "Travaux rapides dans des parties communes peu fréquentées.",
      },
    ],
  },
  travauxIndividuel: {
    note: "dynamic",
    text: [
      {
        titre: "Emprise logement",
        contenu: "Aucune.",
      },
      {
        titre: "Déroulement des travaux",
        contenu: "Pas de travaux dans les appartements.",
      },
    ],
  },
  acoustique: {
    note: "C",
    text: [
      {
        titre: "Volume sonore",
        contenu: "de 45 à 65dB (unité extérieure) / de 50 à 65dB (unité intérieure)",
      },
      {
        titre: "Acoustique",
        contenu:
          "Le bruit d’une PAC est couvert par les bruits ambiants la journée mais peut être gênant la nuit si l’unité est trop proche des chambres. Il existe des solutions pour diminuer l’impact sonore des unités extérieures.",
      },
    ],
  },
  espaceExterieur: {
    note: "C",
    image: "10-20 - PAC air eau - impact exterieur.png",
    text: [
      {
        titre: "Unité extérieure",
        contenu: "Les PAC air/eau disposent d’une unité extérieure (sol, toiture, jardin ou terrasse).",
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
    note: "A",
    text: [],
  },
} satisfies Solution;
