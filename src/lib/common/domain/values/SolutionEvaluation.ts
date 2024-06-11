import { type ImageEvaluation } from "./ImageEvaluation";
import { type SolutionNote } from "./SolutionNote";

export type SolutionEvaluation = {
  image?: ImageEvaluation;
  note: SolutionNote | "dynamic";
  texte?: Array<{ contenu: string; titre: string }>;
};
