import { type Solution } from "@/lib/enums";

export const solution = {
  id: "25",
  nom: "Hybride pompe à chaleur + chaudière",
  familleSolution: "Hybride PAC + Chaudière",
  type: "COL",
  description: "La solution hybride combine une pompe à chaleur (PAC) avec une chaudière pour assurer l'appoint.",
  usageCh: "Oui",
  usageEcs: "Non",
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
    image: "05-15-25 - Hybride PAC + chaudiere - parties communes.png",
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
    image: "05-15-25 - Hybride PAC + chaudiere - impact exterieur.png",
    text: [],
  },
  maturite: {
    note: "B",
    text: [
      {
        titre: "Maturité",
        contenu:
          "La maturité de l’appareil dépend du nombre d’installations et de l’ancienneté de la commercialisation.",
      },
    ],
  },
} satisfies Solution;