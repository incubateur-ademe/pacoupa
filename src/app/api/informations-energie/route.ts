import { z } from "zod";

import { informationsBatimentSchema } from "@/lib/common/domain/InformationsBatiment";
import { enumScenarioRenovationEnveloppe } from "@/lib/common/domain/values/ScenarioRenovationEnveloppe";
import { enumScenarioRenovationSysteme } from "@/lib/common/domain/values/ScenarioRenovationSysteme";
import { getInformationsEnergie } from "@/lib/server/useCases/getInformationsEnergie";

export const dynamic = "force-dynamic"; // defaults to auto

const schema = informationsBatimentSchema.extend({
  scenarioRenovationEnveloppe: z.enum(enumScenarioRenovationEnveloppe),
  scenarioRenovationSysteme: z.enum(enumScenarioRenovationSysteme),
});

export type InformationsEnergieDTO = z.infer<typeof schema>;

/**
 * Get energy data for a user's simulation.
 */
export async function POST(request: Request) {
  const unparsedFormData: unknown = await request.json();
  const formData = schema.safeParse(unparsedFormData);

  if (!formData.success) {
    const errors = formData.error.format();
    return Response.json({ error: `Données invalides`, detail: errors });
  }

  const res = await getInformationsEnergie(formData.data);

  return Response.json(res, { status: 200 });
}
