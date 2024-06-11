import { getInformationEnergie } from "@/lib/server/useCases/getInformationEnergie";
import { GetInformationEnergieDTOSchema } from "@/lib/server/useCases/getInformationEnergie/dto";

export const dynamic = "force-dynamic"; // defaults to auto

/**
 * Retourne les informations énergétiques suivant les caractéristiques d'un bâtiment.
 *
 */
export async function POST(request: Request) {
  const unparsedBody: unknown = await request.json();
  const dto = GetInformationEnergieDTOSchema.safeParse(unparsedBody);

  if (!dto.success) {
    const errors = dto.error.format();
    return Response.json({ error: `Données invalides`, detail: errors }, { status: 400 });
  }

  const res = await getInformationEnergie(dto.data);

  return Response.json(res, { status: 200 });
}
