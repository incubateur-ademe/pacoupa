export const enumTypeCH = ["ELEC", "FIOUL", "GAZ"] as const;

export type TypeCH = (typeof enumTypeCH)[number];
