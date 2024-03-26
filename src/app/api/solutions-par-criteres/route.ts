import { caracteristiques, solutions, solutionsParCriteres } from "drizzle/schema";
import { eq, or, sql } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { db } from "@/lib/drizzle";

export const dynamic = "force-dynamic"; // defaults to auto

const OuiNonSchema = z.enum(["oui", "non"]);

const selectCaracteristiquesSchema = createSelectSchema(caracteristiques, {
  id: schema => schema.id.optional(),
  ch: z.enum(["ind", "col"]),
  ecs: z.enum(["ind", "col"]),
  emetteur: z.enum(["hydraulique", "electrique"]),
  envContraint: z.enum(["terrain disponible", "contraint"]),
  espaceExterieur: OuiNonSchema,
  toitureTerrasse: z.enum(["sans tt", "toiture t"]),
  nbLgts: z.enum(["< 15", "> 15"]),
  niveauRenovation: z.enum(["recent ou renove"]).optional(), // non rempli si non récent et non rénové
  temperature: z.enum(["< 40°C", "> 60°C", "< 60°C", "40-60°C"]).optional(), // non rempli si émetteur est électrique
});

const NAFields = ["envContraint", "espaceExterieur", "toitureTerrasse", "nbLgts", "niveauRenovation", "temperature"];

/**
 * Build a SQL condition from the filtersb
 */
const buildConditions = (filters: z.infer<typeof selectCaracteristiquesSchema>) => {
  const keys = Object.keys(filters);

  const sqlChunks = keys.map(key => {
    if (NAFields.includes(key)) {
      const firstPart = sql`upper(${caracteristiques[key as keyof typeof caracteristiques]}) = upper(${
        filters[key as keyof typeof filters]
      })`;
      const secondPart = sql`${caracteristiques[key as keyof typeof caracteristiques]} = 'NA'`;

      return sql`${or(firstPart, secondPart)}`;
    } else {
      return sql`upper(${caracteristiques[key as keyof typeof caracteristiques]}) = upper(${
        filters[key as keyof typeof filters]
      })`;
    }
  });

  return sql`${sql.join(sqlChunks, sql.raw(" AND "))}`;
};

export async function POST(request: Request) {
  const res = selectCaracteristiquesSchema.safeParse(await request.json());

  if (!res.success) {
    return Response.json({ error: res.error });
  }

  // console.log("body", JSON.stringify(res, null, 2));

  const rows = await db
    .select()
    .from(caracteristiques)
    .innerJoin(solutionsParCriteres, eq(caracteristiques.id, solutionsParCriteres.caracteristiquesId))
    .innerJoin(solutions, eq(solutionsParCriteres.idSolution, solutions.id))
    .where(buildConditions(res.data))
    .all();

  return Response.json({ nbRows: rows.length, data: rows });
}
