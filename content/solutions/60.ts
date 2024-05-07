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
    text: [
      {
        titre: "Consommation d’énergie",
        contenu:
          "La pompe à chaleur utilise une énergie décarbonée (l’électricité). Son rendement est, en moyenne, trois fois supérieur à celui d’un radiateur électrique ou d’une chaudière.",
      },
      {
        titre: "Entretien",
        contenu: "Au même titre qu’une chaudière, il est important de prévoir une maintenance régulière des appareils.",
      },
    ],
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
    image: "60 - PAC indiv sur BET - PAC indiv (impact appartement).png",
    text: [],
  },
  acoustique: {
    note: "C",
    text: [],
  },
  espaceExterieur: {
    note: "C",
    image: "60 - PAC indiv sur BET - PAC coll (impact extérieur).png",
    text: [],
  },
  maturite: {
    note: "E",
    text: [
      {
        titre: "Maturité",
        contenu:
          "La maturité de l’appareil dépend du nombre d’installations et de l’ancienneté de la commercialisation.",
      },
    ],
  },
} satisfies Solution;
