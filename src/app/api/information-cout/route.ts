import { getInformationCout } from "@/lib/server/useCases/getInformationCout";
import { GetInformationCoutDTOSchema } from "@/lib/server/useCases/getInformationCout/dto";

export const dynamic = "force-dynamic"; // defaults to auto

/**
 * Retourne les informations de coût suivant les caractéristiques d'un bâtiment.
 *
 */
export async function POST(request: Request) {
  const unparsedBody: unknown = await request.json();
  const dto = GetInformationCoutDTOSchema.safeParse(unparsedBody);

  if (!dto.success) {
    const errors = dto.error.format();
    return Response.json({ error: `Données invalides`, detail: errors }, { status: 400 });
  }

  const res = await getInformationCout(dto.data);

  return Response.json(res, { status: 200 });
}
