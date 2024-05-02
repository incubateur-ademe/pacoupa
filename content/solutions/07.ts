import { type Solution } from "@/lib/enums";

export const solution = {
  id: "07",
  nom: "Pompe à chaleur sur air extrait",
  familleSolution: "PAC Air-Eau",
  type: "COL",
  description:
    "La pompe à chaleur (PAC) air extrait / eau capte de la chaleur sur l'air extrait de ventilation, et produit de l’eau chaude.",
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
    note: "B",
    text: [],
  },
  espaceExterieur: {
    note: "B",
    text: [],
  },
  maturite: {
    note: "E",
    text: [],
  },
} satisfies Solution;
