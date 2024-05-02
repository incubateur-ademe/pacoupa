import { type Solution } from "@/lib/enums";

export const solution = {
  id: "08",
  nom: "Pompe à chaleur eau / eau géothermie",
  familleSolution: "PAC Eau-Eau",
  type: "COL",
  description:
    "La pompe à chaleur (PAC) eau / eau prélève de la chaleur dans le sol, augmente son niveau de température et la transfère à un circuit d'eau.",
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
    note: "A",
    text: [],
  },
  espaceExterieur: {
    note: "B",
    text: [],
  },
  maturite: {
    note: "A",
    text: [],
  },
} satisfies Solution;
