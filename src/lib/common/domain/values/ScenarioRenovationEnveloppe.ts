export const enumScenarioRenovationEnveloppe = ["INIT", "INTER", "GLOB"] as const;

export type ScenarioRenovationEnveloppe = (typeof enumScenarioRenovationEnveloppe)[number];
