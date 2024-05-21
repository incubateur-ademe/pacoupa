import { type Solution } from "@/lib/enums";

export const solution = {
  id: "30",
  nom: "Chauffe-eau thermodynamique air extrait / eau",
  familleSolution: "CET Air-Eau",
  type: "IND",
  description:
    "Le chauffe-eau thermodynamique (CET) capte de la chaleur sur l'air extrait de ventilation, et produit de l'eau chaude.",
  usageCh: "Non",
  usageEcs: "Oui",
  usageFr: "Non",
  environnement: {
    note: "B",
    text: [
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
    text: [
      {
        titre: "Aucun travaux sur parties communes",
        contenu:
          "Un chauffe-eau thermodynamique est présent dans chaque logement et produit de l’Eau Chaude Sanitaire (ECS). Il est composé d’un seul bloc, intégrant une petite pompe à chaleur et un ballon de stockage ECS. La PAC prélève les calories sur l’air extrait par la ventilation mécanique.",
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
    image: "30 - CET air extrait eau - impact exterieur.png",
    note: "dynamic",
    text: [
      {
        titre: "Déroulement des travaux",
        contenu: "Aucun.",
      },
    ],
  },
  travauxIndividuel: {
    image: "30 - CET air extrait eau - appartement.png",
    note: "dynamic",
    text: [
      {
        titre: "Emprise logement",
        contenu: "Il faut prévoir un encombrement d'environ 70x70x250 cm (placard acoustique).",
      },
      {
        titre: "Déroulement des travaux",
        contenu:
          "Le chauffe-eau thermodynamique est composé d’un seul bloc, intégrant une petite pompe à chaleur et un ballon de stockage ECS. La PAC prélève les calories sur l’air extrait par la ventilation mécanique.",
      },
    ],
  },
  acoustique: {
    note: "A",
    text: [
      {
        titre: "Volume sonore",
        contenu: "De 30 à 50dB.",
      },
      {
        titre: "Acoustique",
        contenu:
          "Il est préconisé de mettre le CET dans un placard acoustique pour éviter toute gêne, et de ne pas le positionner sur des cloisons mitoyennes de chambre.",
      },
    ],
  },
  espaceExterieur: {
    note: "A",
    text: [
      {
        titre: "Impact extérieur",
        contenu:
          "Il n’y a pas d’unité extérieure, simplement une bouche en façade. La pompe à chaleur est reliée à l’air extrait par la ventilation mécanique. Il faut anticiper l’intégration architecturale des bouches en façade.",
      },
      {
        titre: "PLU",
        contenu: "Vérifiez que l’intégration architecturales des bouches en façade est compatible avec le PLU.",
      },
    ],
  },
  maturite: {
    note: "A",
    text: [
      {
        titre: "Maturité",
        contenu:
          "La maturité de l’appareil dépend du nombre d’installations et de l’ancienneté de la commercialisation.",
      },
    ],
  },
} satisfies Solution;
