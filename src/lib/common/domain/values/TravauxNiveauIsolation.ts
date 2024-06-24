export const enumTravauxNiveauIsolation = ["Aucun", "Global", "Partiel"] as const;

export type TravauxNiveauIsolation = (typeof enumTravauxNiveauIsolation)[number];
