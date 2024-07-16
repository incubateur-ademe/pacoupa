import { z } from "zod";

import { informationBatimentSchema } from "@/lib/common/domain/InformationBatiment";
import { enumScenarioRenovationEnveloppe } from "@/lib/common/domain/values/ScenarioRenovationEnveloppe";
import { enumScenarioRenovationSysteme } from "@/lib/common/domain/values/ScenarioRenovationSysteme";
import { enumIdSolution } from "@/lib/common/domain/values/Solution";

export const GetInformationCoutDTOSchema = informationBatimentSchema
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
    solution: z.enum(enumIdSolution),
  });

export type GetInformationCoutDTO = z.infer<typeof GetInformationCoutDTOSchema>;
