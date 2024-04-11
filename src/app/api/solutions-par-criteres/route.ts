import { simulationSchema } from "@/app/simulation/schema";
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
  const formData = simulationSchema.safeParse(unparsedFormData);

  if (!formData.success) {
    const errors = formData.error.format();
    return Response.json({ error: `Erreur de formatage du hash`, detail: errors });
  }

  const res = await getSolutionsParCriteres(formData.data);

  return Response.json(res);
}
