import { type Solution } from "@/lib/enums";

export const solution = {
  id: "11",
  nom: "Pompe à chaleur air / eau (gainée)",
  familleSolution: "PAC Air-Eau",
  type: "COL",
  description:
    "La pompe à chaleur (PAC) air / eau prélève de la chaleur dans l'air extérieur, augmente son niveau de température et la transfère à un circuit d'eau.",
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
    note: "A",
    text: [],
  },
  maturite: {
    note: "C",
    text: [],
  },
} satisfies Solution;
