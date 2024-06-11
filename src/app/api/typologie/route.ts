import { type NextRequest } from "next/server";

import { getTypologie } from "@/lib/server/useCases/getTypologie";
import { GetTypologieDTOSchema } from "@/lib/server/useCases/getTypologie/dto";

export const dynamic = "force-dynamic"; // defaults to auto

/**
 * Retourne la typologie suivant les critères année de construction et nombre de logements.
 *
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const annee = searchParams.get("annee");
  const nbLogements = searchParams.get("nbLogements");

  const dto = GetTypologieDTOSchema.safeParse({ annee, nbLogements });

  if (!dto.success) {
    const errors = dto.error.format();
    return Response.json({ error: `Données invalides`, detail: errors }, { status: 400 });
  }

  const res = await getTypologie({ annee: dto.data.annee, nbLogements: dto.data.nbLogements });

  return Response.json(res);
}
