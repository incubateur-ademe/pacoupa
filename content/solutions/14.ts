import { type Solution } from "@/lib/enums";

// TODO: solution à supprimer ??

export const solution = {
  id: "14",
  nom: "Pompe à chaleur absorption gaz",
  familleSolution: "PAC Abs Gaz",
  type: "COL",
  description:
    "La pompe à chaleur (PAC) absorption gaz utilise une réaction chimique entre un gaz réfrigérant et un absorbeur pour absorber et libérer de la chaleur.",
  usageCh: "Oui",
  usageEcs: "Oui",
  usageFr: "Possible",
  environnement: {
    note: "D",
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
    note: "C",
    text: [],
  },
} satisfies Solution;
