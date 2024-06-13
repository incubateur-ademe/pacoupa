import { type Solution } from "@/lib/common/domain/values/Solution";

export const solution = {
  id: "32",
  nom: "Chauffe-eau thermodynamique air / eau (intérieur)",
  familleSolution: "CET Air-Eau",
  type: "IND",
  typeSysteme: "ECS seule : PAC Air / Eau",
  description:
    "Le chauffe-eau thermodynamique (CET) capte de la chaleur sur l'air extérieur, et produit de l'eau chaude.",
  usageCh: "Non",
  usageEcs: "Oui",
  usageFr: "Non",
  environnement: {
    note: "B",
    texte: [
      {
        titre: "Eau chaude sanitaire uniquement",
        contenu:
          "Un chauffe-eau thermodynamique (CET) est une solution renouvelable (ENR) pour produire de l’eau chaude sanitaire, mais pas de chauffage. Cela représente environ 30% des besoins globaux de l’appartement.",
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
        titre: "Aucun travaux sur parties communes",
        contenu:
          "Un chauffe-eau thermodynamique (CET) est présent dans chaque logement et produit de l’eau chaude sanitaire (ECS). Il est composé d’un seul bloc, intégrant une petite pompe à chaleur et un ballon de stockage ECS. Ce bloc doit être raccordé à l’air extérieur par des bouches en façade ou un conduit collectif.",
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
    note: "dynamic",
    image: "32 - CET air eau - parties communes.png",
    texte: [
      {
        titre: "Travaux à prévoir",
        contenu:
          "Aucun si le raccordement à l’air extérieur se fait via des bouches en façade. Sinon, il faut prévoir le raccordement à un conduit collectif.",
      },
    ],
  },
  travauxIndividuel: {
    note: "dynamic",
    image: "32 - CET air eau - appartement.png",
    texte: [],
  },
  acoustique: {
    note: "C",
    texte: [
      {
        titre: "Volume sonore",
        contenu: "De 30 à 50dB",
      },
      {
        titre: "Acoustique",
        contenu:
          "Il est préconisé de mettre la PAC dans un placard acoustique pour éviter toute gêne, et de ne pas le positionner sur des cloisons mitoyennes de chambre.",
      },
    ],
  },
  espaceExterieur: {
    note: "A",
    texte: [
      {
        titre: "Impact extérieur",
        contenu:
          "Il n’y a pas d’unité extérieure, simplement une bouche en façade (si le raccordement est ainsi fait). Dans ce cas, il faut anticiper l’intégration architecturale des bouches en façade.",
      },
      {
        titre: "PLU",
        contenu: "Vérifiez que l’intégration architecturales des bouches en façade est compatible avec le PLU.",
      },
    ],
  },
  maturite: {
    note: "B",
    texte: [
      {
        titre: "Maturité",
        contenu:
          "La maturité de l’appareil dépend du nombre d’installations et de l’ancienneté de la commercialisation.",
      },
    ],
  },
} satisfies Solution;
