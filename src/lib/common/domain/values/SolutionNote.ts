export const enumNote = ["A", "B", "C", "D", "E"] as const;

export type SolutionNote = (typeof enumNote)[number];
