import { type Solution } from "@/lib/enums";

export const solution = {
  id: "54",
  nom: "Pompe à chaleur air / eau avec chauffage par l’air",
  familleSolution: "PAC Air-Eau",
  type: "IND",
  description:
    "La pompe à chaleur (PAC) air / eau capte de la chaleur sur l’air extérieur, produit de l’eau chaude et chauffe (ou refroidit) l'air intérieur.",
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
    note: "D",
    text: [],
  },
} satisfies Solution;
