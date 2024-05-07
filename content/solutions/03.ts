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
    text: [
      {
        titre: "Local technique",
        contenu:
          "S’assurer que la place est suffisante dans la chaufferie existante, ou pour implanter un local technique (surface estimée : xx m²).",
      },
      {
        titre: "Raccordement électrique",
        contenu: "Anticiper l’impact sur la puissance de raccordement électrique.",
      },
      {
        titre: "Réseaux hydrauliques",
        contenu:
          "Prévoir une éventuelle rénovation des réseaux ECS. Prévoir un double réseau d’évacuation des eaux grises et eaux vannes.",
      },
    ],
  },
  travauxCollectif: {
    note: "dynamic",
    text: [
      {
        titre: "Réseaux hydrauliques",
        contenu:
          "Les eaux grises (douches, baignoires, machines à laver…) sont collectées dans une cuve. Il faut donc prévoir un double réseau d’évacuation des eaux grises et eaux vannes.",
      },
    ],
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
    text: [
      {
        titre: "Maturité",
        contenu:
          "La maturité de l’appareil dépend du nombre d’installations et de l’ancienneté de la commercialisation.",
      },
    ],
  },
} satisfies Solution;
