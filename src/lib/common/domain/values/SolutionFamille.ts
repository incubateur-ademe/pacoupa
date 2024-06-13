export const enumFamille = [
  "RCU",
  "Geothermie",
  "PAC Air-Air",
  "PAC Air-Eau",
  "PAC Eau-Eau",
  "PAC Eaux grises-Eau",
  "PAC Solaire-Eau",
  "Hybride PAC + Chaudière",
  "CET Air-Eau",
  "CET Eau-Eau",
  "PAC Abs Gaz",
] as const;

export type SolutionFamille = (typeof enumFamille)[number];
