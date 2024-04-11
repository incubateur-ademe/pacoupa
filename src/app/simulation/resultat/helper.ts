import { type getSolutionsParCriteres } from "@/lib/server/useCases/getSolutionsParCriteres";

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

type Foo = Awaited<ReturnType<typeof getSolutionsParCriteres>>["data"][number];

export const createRecommandations = (solution: Foo) =>
  [solution.usageCH && "Chauffage", solution.usageECS && "ECS", solution.usageFr && "Climatisation"].filter(Boolean);
