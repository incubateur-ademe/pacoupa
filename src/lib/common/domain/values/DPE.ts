export const enumDPE = ["A", "B", "C", "D", "E", "F", "G"] as const;

export type DPE = (typeof enumDPE)[number];
