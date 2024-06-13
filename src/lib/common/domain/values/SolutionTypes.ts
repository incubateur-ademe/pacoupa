export const enumType = ["COL", "IND", "MIX"] as const;

export type SolutionType = (typeof enumType)[number];

export const enumTypeWithoutMix = ["COL", "IND"] as const;

export type SolutionTypeWithoutMix = (typeof enumTypeWithoutMix)[number];
