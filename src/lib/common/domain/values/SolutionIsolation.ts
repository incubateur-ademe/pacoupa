export const enumIsolation = ["Isolé", "Pas isolé"] as const;

export type SolutionIsolation = (typeof enumIsolation)[number];
