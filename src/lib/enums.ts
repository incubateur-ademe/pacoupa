export const enumUsages = ["Oui", "Non", "Possible"] as const;

export type SolutionUsage = (typeof enumUsages)[number];

export const enumNotes = ["A", "B", "C", "D", "E"] as const;

export type SolutionNote = (typeof enumNotes)[number];

export const enumTypes = ["COL", "IND", "MIX"] as const;

export type SolutionTypes = (typeof enumTypes)[number];

export const enumFamilles = [
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

export type SolutionFamilles = (typeof enumFamilles)[number];

type SolutionEvaluation = {
  image?: string;
  note: SolutionNote | "dynamic";
  text?: Array<{ contenu: string; titre: string }>;
};

export type Solution = {
  acoustique: SolutionEvaluation;
  cout: SolutionEvaluation;
  description?: string | null;
  difficulte: SolutionEvaluation;
  environnement: SolutionEvaluation;
  espaceExterieur: SolutionEvaluation;
  familleSolution: SolutionFamilles;
  id: string;
  maturite: SolutionEvaluation;
  nom: string;
  travauxCollectif: SolutionEvaluation;
  travauxIndividuel: SolutionEvaluation;
  type: SolutionTypes;
  usageCh: SolutionUsage;
  usageEcs: SolutionUsage;
  usageFr: SolutionUsage;
};
