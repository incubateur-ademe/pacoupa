import { type z } from "zod";

import { informationBatimentSchema } from "@/lib/common/domain/InformationBatiment";

export const GetSolutionsApplicablesDTOSchema = informationBatimentSchema.pick({
  adresse: true,
  annee: true,
  nbLogements: true,
  renovation: true,
  typeCH: true,
  typeECS: true,
  energieCH: true,
  emetteur: true,
  espacesExterieursCommuns: true,
  espacesExterieursPersonnels: true,
});

export type GetSolutionsApplicablesDTO = z.infer<typeof GetSolutionsApplicablesDTOSchema>;
