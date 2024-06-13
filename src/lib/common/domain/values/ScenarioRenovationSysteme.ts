import { enumTypeSystemeWithoutRCU } from "./TypeSysteme";

export const enumScenarioRenovationSysteme = ["S0", ...enumTypeSystemeWithoutRCU] as const;

export type ScenarioRenovationSysteme = (typeof enumScenarioRenovationSysteme)[number];
