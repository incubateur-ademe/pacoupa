import { informationsBatimentSchema } from "@/lib/common/domain/InformationsBatiment";
import { getSolutionsParCriteres } from "@/lib/server/useCases/getSolutionsParCriteres";

export const dynamic = "force-dynamic"; // defaults to auto

/**
 * Get all solutions that match the criteres.
 *
 * NB: this is a POST request because the body is used to send the payload.
 */
export async function POST(request: Request) {
  // const res = CriteriaPayloadSchema.safeParse(await request.json());
  // const res = simulationSchema.safeParse(await request.json());

  const unparsedFormData: unknown = await request.json();
  const formData = informationsBatimentSchema.safeParse(unparsedFormData);

  if (!formData.success) {
    const errors = formData.error.format();
    return Response.json({ error: `Données invalides`, detail: errors });
  }

  const res = await getSolutionsParCriteres(formData.data);

  return Response.json(res);
}
