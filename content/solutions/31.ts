import { type Solution } from "@/lib/enums";

export const solution = {
  id: "31",
  nom: "Chauffe-eau thermodynamique air / eau (avec unité extérieure)",
  familleSolution: "CET Air-Eau",
  type: "IND",
  description:
    "Le chauffe-eau thermodynamique (CET) capte de la chaleur sur l'air extérieur, et produit de l'eau chaude.",
  usageCh: "Non",
  usageEcs: "Oui",
  usageFr: "Non",
  environnement: {
    note: "B",
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
    text: [],
  },
  acoustique: {
    note: "C",
    text: [],
  },
  espaceExterieur: {
    note: "D",
    image: "31 - CET Air Eau - impact exterieur.png",
    text: [],
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
