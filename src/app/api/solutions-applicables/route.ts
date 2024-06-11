import { getSolutionsParCriteres } from "@/lib/server/useCases/getSolutionsApplicables";
import { GetSolutionsApplicablesDTOSchema } from "@/lib/server/useCases/getSolutionsApplicables/dto";

export const dynamic = "force-dynamic"; // defaults to auto

/**
 * Get all solutions that match the criteres.
 *
 * NB: this is a POST request because the body is used to send the payload.
 */
export async function POST(request: Request) {
  const unparsedBody: unknown = await request.json();
  const dto = GetSolutionsApplicablesDTOSchema.safeParse(unparsedBody);

  if (!dto.success) {
    const errors = dto.error.format();
    return Response.json({ error: `Données invalides`, detail: errors }, { status: 400 });
  }

  const res = await getSolutionsParCriteres(dto.data);

  return Response.json(res);
}
