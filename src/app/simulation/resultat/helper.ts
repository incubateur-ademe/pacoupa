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
