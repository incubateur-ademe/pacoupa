import { type Solution } from "@/lib/enums";

export const solution = {
  id: "03",
  nom: "Pompe à chaleur eaux grises / eau",
  familleSolution: "PAC Eaux grises-Eau",
  type: "COL",
  description:
    "La pompe à chaleur (PAC) eaux grises-eau prélève de la chaleur dans les eaux grises (douches, vaisselle), augmente son niveau de température et la transfère à un circuit d'eau.",
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
    note: "A",
    text: [],
  },
  maturite: {
    note: "B",
    text: [],
  },
} satisfies Solution;
