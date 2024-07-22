import { type Solution } from "./Solution";
import { type SolutionAide } from "./SolutionAide";
import { type SolutionCout } from "./SolutionCout";
import { type SolutionEnergie } from "./SolutionEnergie";

export type SolutionAvecEnergieCoutAide = Solution & SolutionAide & SolutionCout & SolutionEnergie;
