import { z } from "zod";

import { simulationSchema } from "@/app/simulation/schema";
import { enumScenarioRenovationEnveloppe, enumScenarioRenovationSysteme } from "@/lib/enums";
import { getInformationsEnergie } from "@/lib/server/useCases/getInformationsEnergie";

export const dynamic = "force-dynamic"; // defaults to auto

const schema = simulationSchema.extend({
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
