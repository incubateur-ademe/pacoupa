import { type Solution } from "@/lib/enums";

export const solution = {
  id: "61",
  nom: "Chauffe-eau thermodynamique individuel sur retour de chauffage collectif",
  familleSolution: "CET Eau-Eau",
  type: "MIX",
  description:
    "Le chauffe-eau thermodynamique (CET) récupère la chaleur dans l'eau de retour du réseau de chauffage collectif pour chauffer l'eau sanitaire.",
  usageCh: "Oui",
  usageEcs: "Oui",
  usageFr: "Possible",
  environnement: {
    note: "A",
    text: [],
  },
  cout: {
    note: "dynamic",
  },
  difficulte: {
    note: "dynamic",
    text: [],
  },
  travauxCollectif: {
    note: "dynamic",
    text: [],
  },
  travauxIndividuel: {
    note: "dynamic",
    image: "61 - CET indiv sur retour chauffage - CET (impact appartement).png",
    text: [],
  },
  acoustique: {
    note: "C",
    text: [],
  },
  espaceExterieur: {
    note: "C",
    text: [],
  },
  maturite: {
    note: "E",
    text: [
      {
        titre: "Maturité",
        contenu:
          "La maturité de l’appareil dépend du nombre d’installations et de l’ancienneté de la commercialisation.",
      },
    ],
  },
} satisfies Solution;
