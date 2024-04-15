import { type GetSolutionsParCriteresReturnType } from "@/lib/server/useCases/getSolutionsParCriteres";

export const labelForType = (type: string = "") => {
  switch (type.toUpperCase()) {
    case "IND":
      return "Individuel";
    case "COL":
      return "Collectif";
    default:
      return "Mixte";
  }
};

export const createRecommandations = (solution: GetSolutionsParCriteresReturnType[number]) =>
  [solution.usageCH && "Chauffage", solution.usageECS && "ECS", solution.usageFr && "Climatisation"].filter(Boolean);

export const noteEnvironmentHelper = (note: string) => {
  switch (note) {
    case "A":
      return { label: "Très positif", number: 5 };
    case "B":
      return { label: "Positif", number: 4 };
    case "C":
      return { label: "Modéré", number: 3 };
    case "D":
      return { label: "Léger", number: 2 };
    case "E":
      return { label: "Faible", number: 1 };
    default:
      return { label: "Non renseigné", number: 0 };
  }
};

export const noteCoutHelper = (note: string) => {
  switch (note) {
    case "A":
      return { label: "Très faible", number: 1 };
    case "B":
      return { label: "Faible", number: 2 };
    case "C":
      return { label: "Modéré", number: 3 };
    case "D":
      return { label: "Important", number: 4 };
    case "E":
      return { label: "Très important", number: 5 };
    default:
      return { label: "Non renseigné", number: 0 };
  }
};

export const noteDifficulteHelper = (note: string) => {
  switch (note) {
    case "A":
      return { label: "Très facile", number: 1 };
    case "B":
      return { label: "Facile", number: 2 };
    case "C":
      return { label: "Modéré", number: 3 };
    case "D":
      return { label: "Difficile", number: 4 };
    case "E":
      return { label: "Très difficile", number: 5 };
    default:
      return { label: "Non renseigné", number: 0 };
  }
};
