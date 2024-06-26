// colonne simulateur 1

export const enumNiveauRenovationSimu1 = ["NA", "Recent ou renove"] as const;

export type NiveauRenovationSimu1 = (typeof enumNiveauRenovationSimu1)[number];
