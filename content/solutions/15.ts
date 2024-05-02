import { type Solution } from "@/lib/enums";

export const solution = {
  id: "15",
  nom: "Hybride pompe à chaleur + chaudière",
  familleSolution: "Hybride PAC + Chaudière",
  type: "COL",
  description: "La solution hybride combine une pompe à chaleur (PAC) avec une chaudière pour assurer l'appoint.",
  usageCh: "Oui",
  usageEcs: "Oui",
  usageFr: "Possible",
  environnement: {
    note: "C",
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
    note: "B",
    text: [],
  },
} satisfies Solution;
