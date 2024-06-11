import { getInformationsEnergie } from "@/lib/server/useCases/getInformationEnergie";
import { GetInformationEnergieDTOSchema } from "@/lib/server/useCases/getInformationEnergie/dto";

export const dynamic = "force-dynamic"; // defaults to auto

/**
 * Get energy data for a user's simulation.
 */
export async function POST(request: Request) {
  const unparsedFormData: unknown = await request.json();
  const formData = GetInformationEnergieDTOSchema.safeParse(unparsedFormData);

  if (!formData.success) {
    const errors = formData.error.format();
    return Response.json({ error: `Données invalides`, detail: errors });
  }

  const res = await getInformationsEnergie(formData.data);

  return Response.json(res, { status: 200 });
}
