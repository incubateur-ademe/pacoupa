import { type Solution } from "./Solution";
import { type SolutionCout } from "./SolutionCout";
import { type SolutionEnergie } from "./SolutionEnergie";

export type SolutionAvecEnergieCout = Solution & SolutionCout & SolutionEnergie;
