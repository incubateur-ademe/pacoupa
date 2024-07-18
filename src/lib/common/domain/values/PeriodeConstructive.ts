export const enumPeriodeConstructive = ["1974 - 1990", "1990 - 2000", "Après 2000", "Avant 1974"] as const;

export type PeriodeConstructive = (typeof enumPeriodeConstructive)[number];
