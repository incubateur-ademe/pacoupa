import { type Solution } from "@/lib/enums";

export const solution = {
  id: "60",
  nom: "Pompe à chaleur sur boucle d’eau",
  familleSolution: "PAC Eau-Eau",
  type: "MIX",
  description:
    "La pompe à chaleur (PAC) eau / eau individuelle capte de la chaleur dans la boucle d'eau collective, et produit de l'eau chaude.",
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
    text: [],
  },
} satisfies Solution;
