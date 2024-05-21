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

type ImageEvaluation =
  | "01 - PAC air eau - impact exterieur.png"
  | "01-10-20 - PAC air eau - parties communes.png"
  | "02-11-21 - PAC air eau gainee - parties communes.png"
  | "03 - PAC eaux grises eau - parties communes1.png"
  | "03 - PAC eaux grises eau - parties communes2.png"
  | "04 - PAC sur capteur solaire - impact exterieur.png"
  | "04 - PAC sur capteur solaire - parties communes.png"
  | "05-15-25 - Hybride PAC + chaudiere - impact exterieur.png"
  | "05-15-25 - Hybride PAC + chaudiere - parties communes.png"
  | "06-16-26 - Hybride PAC gainee + chaudiere - parties communes.png"
  | "07 - PAC sur air extrait - impact exterieur.png"
  | "08-13-23 - PAC geothermique - facilite installation.png"
  | "08-13-23 - PAC geothermique - parties communes.png"
  | "10-20 - PAC air eau - impact exterieur.png"
  | "12-22 - PAC air air DRV - impact exterieur.png"
  | "30 - CET air extrait eau - appartement.png"
  | "30 - CET air extrait eau - impact exterieur.png"
  | "31 - CET air eau - impact exterieur.png"
  | "32 - CET air eau - appartement.png"
  | "32 - CET air eau - parties communes.png"
  | "40 - PAC air air - appartement.png"
  | "40 - PAC air air - impact exterieur.png"
  | "50 - PAC air eau - impact exterieur.png"
  | "50 - PAC air eau avec unite ext - appartement.png"
  | "51 - PAC air eau sans unite ext - impact exterieur.png"
  | "52 - PAC air air avec ECS - T One - impact exterieur.png"
  | "53 - PAC sur air extrait - NIBE - appartement.png"
  | "54 - CET air eau avec chauffage par air - parties communes.png"
  | "60 - PAC indiv sur BET - PAC coll - impact exterieur.png"
  | "60 - PAC indiv sur BET - PAC indiv - appartement.png"
  | "61 - CET indiv sur retour chauffage - CET - appartement.png";

type SolutionEvaluation = {
  image?: ImageEvaluation;
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
