import { type Solution } from "@/lib/enums";

export const solution = {
  id: "23",
  nom: "Pompe à chaleur eau / eau géothermie",
  familleSolution: "PAC Eau-Eau",
  type: "COL",
  description:
    "La pompe à chaleur (PAC) eau / eau prélève de la chaleur dans le sol, augmente son niveau de température et la transfère à un circuit d'eau.",
  usageCh: "Oui",
  usageEcs: "Non",
  usageFr: "Possible",
  environnement: {
    note: "B",
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
    image: "08-13-23 - PAC geothermique - facilite installation.png",
    text: [],
  },
  travauxCollectif: {
    note: "dynamic",
    image: "08-13-23 - PAC geothermique - parties communes.png",
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
    text: [
      {
        titre: "Maturité",
        contenu:
          "La maturité de l’appareil dépend du nombre d’installations et de l’ancienneté de la commercialisation.",
      },
    ],
  },
} satisfies Solution;
