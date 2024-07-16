import { z } from "zod";

import { informationBatimentSchema } from "@/lib/common/domain/InformationBatiment";
import { enumScenarioRenovationEnveloppe } from "@/lib/common/domain/values/ScenarioRenovationEnveloppe";
import { enumScenarioRenovationSysteme } from "@/lib/common/domain/values/ScenarioRenovationSysteme";

export const GetInformationEnergieDTOSchema = informationBatimentSchema
  .pick({
    adresse: true,
    annee: true,
    nbLogements: true,
    renovation: true,
    typeCH: true,
    typeECS: true,
    energieCH: true,
    energieECS: true,
  })
  .extend({
    scenarioRenovationEnveloppe: z.enum(enumScenarioRenovationEnveloppe),
    scenarioRenovationSysteme: z.enum(enumScenarioRenovationSysteme),
  });

export type GetInformationEnergieDTO = z.infer<typeof GetInformationEnergieDTOSchema>;
