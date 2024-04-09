import { criteres, solutions, solutionsParCriteres } from "drizzle/schema";
import { eq, or, sql } from "drizzle-orm";

import { simulationSchema } from "@/app/simulation/schema";
import { db } from "@/lib/drizzle";

import { createCriteria, type SelectCriteresSchema } from "./helper";

export const dynamic = "force-dynamic"; // defaults to auto

// The NA fields are a special case. When the field as no value in the payload, it should be considered as NA only. Payload with 1 value should be considered as this value OR NA, SQL wise.
// Think to NA as "in every case" or "no matter what".
const NAFields = ["envContraint", "espaceExterieur", "toitureTerrasse", "nbLgts", "niveauRenovation", "temperature"];

/**
 * Build a SQL condition from the filtersb
 */
const buildWhereClause = (filters: SelectCriteresSchema) => {
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
  // const res = CriteriaPayloadSchema.safeParse(await request.json());
  const res = simulationSchema.safeParse(await request.json());

  if (!res.success) {
    return Response.json({ error: res.error });
  }

  console.log("body", JSON.stringify(res, null, 2));

  const criteresHelper = createCriteria(res.data);

  console.log("criteresHelper", JSON.stringify(criteresHelper, null, 2));

  const rows = await db
    .select()
    .from(criteres)
    .innerJoin(solutionsParCriteres, eq(criteres.id, solutionsParCriteres.criteresId))
    .innerJoin(solutions, eq(solutionsParCriteres.solutionsId, solutions.id))
    .where(buildWhereClause(criteresHelper))
    .all();

  return Response.json({ nbRows: rows.length, data: rows });
}
