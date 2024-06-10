import { type NextRequest } from "next/server";
import { z } from "zod";

import { getTypologie } from "@/lib/server/useCases/getTypologie";

export const dynamic = "force-dynamic"; // defaults to auto

const payloadSchema = z.object({
  annee: z.coerce.number(),
  nbLogements: z.coerce.number(),
});

/**
 * Retourne toutes les typologies suivant les critères année de construction et nombre de logements.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const annee = searchParams.get("annee");
  const nbLogements = searchParams.get("nbLogements");

  const result = payloadSchema.safeParse({ annee, nbLogements });

  if (!result.success) {
    const errors = result.error.format();
    return Response.json({ error: `Données invalides`, detail: errors });
  }

  const res = await getTypologie({ annee: result.data.annee, nbLogements: result.data.nbLogements });

  return Response.json(res);
}
