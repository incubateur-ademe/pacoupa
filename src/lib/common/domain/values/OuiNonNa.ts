export const enumOuiNonNa = ["Oui", "Non", "NA"] as const;

export type OuiNonNa = (typeof enumOuiNonNa)[number];
