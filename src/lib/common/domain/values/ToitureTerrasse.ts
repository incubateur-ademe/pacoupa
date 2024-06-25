export const enumToitureTerrasse = ["NA", "Sans TT", "Toiture T"] as const;

export type ToitureTerrasse = (typeof enumToitureTerrasse)[number];
