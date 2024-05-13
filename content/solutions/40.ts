import { type Solution } from "@/lib/enums";

// TODO: solution à supprimer ??

export const solution = {
  id: "40",
  nom: "PAC Air / Air",
  familleSolution: "PAC Air-Air",
  type: "COL",
  description:
    "La pompe à chaleur (PAC) air / air utilise l'air extérieur comme source d'énergie pour chauffer (ou refroidir) l'air à l'intérieur.",
  usageCh: "Oui",
  usageEcs: "Non",
  usageFr: "Oui",
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
    image: "40 - PAC air air - appartement.png",
    text: [],
  },
  acoustique: {
    note: "C",
    text: [],
  },
  espaceExterieur: {
    note: "A",
    image: "40 - PAC air air - impact exterieur.png",
    text: [],
  },
  maturite: {
    note: "C",
    text: [],
  },
} satisfies Solution;
