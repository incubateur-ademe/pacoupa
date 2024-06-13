import { type SolutionEvaluation } from "./SolutionEvaluation";
import { type SolutionFamille } from "./SolutionFamille";
import { type SolutionType } from "./SolutionTypes";
import { type SolutionUsage } from "./SolutionUsage";
import { type TypeSysteme } from "./TypeSysteme";

export type Solution = {
  acoustique: SolutionEvaluation;
  cout: SolutionEvaluation;
  description?: string | null;
  difficulte: SolutionEvaluation;
  environnement: SolutionEvaluation;
  espaceExterieur: SolutionEvaluation;
  familleSolution: SolutionFamille;
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
