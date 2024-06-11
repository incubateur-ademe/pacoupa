export const enumNiveauRenovation = ["recent"] as const;

export type SolutionNiveauRenovation = (typeof enumNiveauRenovation)[number];
