export const enumEnvironnementContraint = ["NA", "Contraint", "Terrain disponible"] as const;

export type EnvironnementContraint = (typeof enumEnvironnementContraint)[number];
