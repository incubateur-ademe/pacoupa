import { criteres, solutions, solutionsParCriteres } from "drizzle/schema";
import { eq, or, sql } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { db } from "@/lib/drizzle";

export const dynamic = "force-dynamic"; // defaults to auto

export const CriteriaPayloadSchema = createSelectSchema(criteres, {
  id: schema => schema.id.optional(),
  ch: z.enum(["ind", "col"]),
  ecs: z.enum(["ind", "col"]),
  emetteur: z.enum(["hydraulique", "electrique"]),
  envContraint: z.enum(["terrain disponible", "contraint"]),
  espaceExterieur: z.enum(["oui", "non", "NA"]),
  toitureTerrasse: z.enum(["sans tt", "toiture t", "NA"]),
  nbLgts: z.enum(["< 15", ">= 15"]),
  niveauRenovation: z.enum(["recent ou renove", "NA"]).default("NA"), // si non renseigné, on considère que c'est NA pour avoir les lignes correspondantes.
  temperature: z.enum(["< 40°C", "> 60°C", "< 60°C", "40-60°C", "NA"]).default("NA"), // si non renseigné, on considère que c'est NA pour avoir les lignes correspondantes.
});

// TODO : some fields need to be ignored (set to NA) in certain cases
// nbLgts : data.typeCH === "individuel" && data.typeECS === "individuel" && envContraint !== "contraint" => NA

// The NA fields are a special case : when the field as no value in the payload, it should be considered as NA. Payload with one value should be considered as "this value OR NA", SQL wise.
// Think of NA as "in every case" or "no matter what".
const NAFields = ["envContraint", "espaceExterieur", "toitureTerrasse", "nbLgts", "niveauRenovation", "temperature"];

/**
 * Build a SQL condition from the filters
 */
const buildWhereClause = (filters: z.infer<typeof CriteriaPayloadSchema>) => {
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

/**
 * Get all solutions that match the criteres.
 *
 * NB: this is a POST request because the body is used to send the payload.
 */
export async function POST(request: Request) {
  const res = CriteriaPayloadSchema.safeParse(await request.json());

  if (!res.success) {
    return Response.json({ error: res.error });
  }

  console.log("body", JSON.stringify(res, null, 2));

  const rows = await db
    .select()
    .from(criteres)
    .innerJoin(solutionsParCriteres, eq(criteres.id, solutionsParCriteres.criteresId))
    .innerJoin(solutions, eq(solutionsParCriteres.solutionsId, solutions.id))
    .where(buildWhereClause(res.data))
    .all();

  return Response.json({ nbRows: rows.length, data: rows });
}
