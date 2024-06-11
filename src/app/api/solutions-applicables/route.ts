import { getSolutionsApplicables } from "@/lib/server/useCases/getSolutionsApplicables";
import { GetSolutionsApplicablesDTOSchema } from "@/lib/server/useCases/getSolutionsApplicables/dto";

export const dynamic = "force-dynamic"; // defaults to auto

/**
 * Retourne toutes les solutions applicables suivant les caractéristiques du bâtiment.
 *
 */
export async function POST(request: Request) {
  const unparsedBody: unknown = await request.json();
  const dto = GetSolutionsApplicablesDTOSchema.safeParse(unparsedBody);

  if (!dto.success) {
    const errors = dto.error.format();
    return Response.json({ error: `Données invalides`, detail: errors }, { status: 400 });
  }

  const res = await getSolutionsApplicables(dto.data);

  return Response.json(res);
}
