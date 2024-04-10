export const typeLabel = (type: string = "") => {
  switch (type.toUpperCase()) {
    case "IND":
      return "Individuel";
    case "COL":
      return "Collectif";
    default:
      return "Mixte";
  }
};
