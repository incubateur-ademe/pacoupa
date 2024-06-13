export const enumUsage = ["Oui", "Non", "Possible"] as const;

export type SolutionUsage = (typeof enumUsage)[number];
