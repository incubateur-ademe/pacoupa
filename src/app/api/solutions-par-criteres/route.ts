import { criteres, solutions, solutionsParCriteres } from "drizzle/schema";
import { eq, or, sql } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { db } from "@/lib/drizzle";

export const dynamic = "force-dynamic"; // defaults to auto

const OuiNonSchema = z.enum(["oui", "non"]);

const selectCriteresSchema = createSelectSchema(criteres, {
  id: schema => schema.id.optional(),
  ch: z.enum(["ind", "col"]),
  ecs: z.enum(["ind", "col"]),
  emetteur: z.enum(["hydraulique", "electrique"]),
  envContraint: z.enum(["terrain disponible", "contraint"]),
  espaceExterieur: OuiNonSchema,
  toitureTerrasse: z.enum(["sans tt", "toiture t"]),
  nbLgts: z.enum(["< 15", "> 15"]),
  niveauRenovation: z.enum(["recent ou renove", "NA"]).default("NA"), // si non renseigné, on considère que c'est NA pour avoir les lignes correspondantes.
  temperature: z.enum(["< 40°C", "> 60°C", "< 60°C", "40-60°C", "NA"]).default("NA"), // si non renseigné, on considère que c'est NA pour avoir les lignes correspondantes.
});

// The NA fields are a special case. When the field as no value in the payload, it should be considered as NA only. Payload with 1 value should be considered as this value OR NA, SQL wise.
// Think to NA as "in every case" or "no matter what".
const NAFields = ["envContraint", "espaceExterieur", "toitureTerrasse", "nbLgts", "niveauRenovation", "temperature"];

/**
 * Build a SQL condition from the filtersb
 */
const buildConditions = (filters: z.infer<typeof selectCriteresSchema>) => {
  const keys = Object.keys(filters);

  const sqlChunks = keys.map(key => {
    if (NAFields.includes(key)) {
      const firstPart = sql`upper(${criteres[key as keyof typeof criteres]}) = upper(${
        filters[key as keyof typeof filters]
      })`;
      const secondPart = sql`${criteres[key as keyof typeof criteres]} = 'NA'`;

      return sql`${or(firstPart, secondPart)}`;
    } else {
      return sql`upper(${criteres[key as keyof typeof criteres]}) = upper(${filters[key as keyof typeof filters]})`;
    }
  });

  return sql`${sql.join(sqlChunks, sql.raw(" AND "))}`;
};

export async function POST(request: Request) {
  const res = selectCriteresSchema.safeParse(await request.json());

  if (!res.success) {
    return Response.json({ error: res.error });
  }

  console.log("body", JSON.stringify(res, null, 2));

  const rows = await db
    .select()
    .from(criteres)
    .innerJoin(solutionsParCriteres, eq(criteres.id, solutionsParCriteres.criteresId))
    .innerJoin(solutions, eq(solutionsParCriteres.solutionsId, solutions.id))
    .where(buildConditions(res.data))
    .all();

  return Response.json({ nbRows: rows.length, data: rows });
}
