import { type Solution } from "@/lib/enums";

export const solution = {
  id: "04",
  nom: "Pompe à chaleur sur capteur solaire atmosphérique",
  familleSolution: "PAC Solaire-Eau",
  type: "COL",
  description:
    "La pompe à chaleur (PAC) sur capteur solaire atmosphérique utilise l'énergie solaire pour chauffer un fluide caloporteur, qui est ensuite utilisé pour produire de la chaleur.",
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
    note: "C",
    text: [],
  },
  maturite: {
    note: "A",
    text: [],
  },
} satisfies Solution;
