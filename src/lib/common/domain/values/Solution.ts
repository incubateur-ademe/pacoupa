import { type FicheReference } from "./FicheReference";
import { type SolutionEvaluation } from "./SolutionEvaluation";
import { type SolutionFamille } from "./SolutionFamille";
import { type SolutionType } from "./SolutionTypes";
import { type SolutionUsage } from "./SolutionUsage";
import { type TypeSysteme } from "./TypeSysteme";

export const enumIdSolution = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "10",
  "11",
  "12",
  "13",
  "15",
  "16",
  "20",
  "21",
  "22",
  "23",
  "25",
  "26",
  "30",
  "31",
  "32",
  "40",
  "50",
  "51",
  "52",
  "53",
  "54",
  "60",
  "61",
] as const;

export type Solution = {
  acoustique: SolutionEvaluation;
  cout: SolutionEvaluation;
  description?: string | null;
  difficulte: SolutionEvaluation;
  environnement: SolutionEvaluation;
  espaceExterieur: SolutionEvaluation;
  familleSolution: SolutionFamille;
  ficheReference: FicheReference;
  id: string;
  maturite: SolutionEvaluation;
  nom: string;
  travauxCollectif: SolutionEvaluation;
  travauxIndividuel: SolutionEvaluation;
  type: SolutionType;
  typeSysteme: TypeSysteme;
  usageCh: SolutionUsage;
  usageEcs: SolutionUsage;
  usageFr: SolutionUsage;
};
