"use server";

import { criteres, solutions, solutionsParCriteres } from "drizzle/schema";
import { eq, or, sql } from "drizzle-orm";

import { simulationSchema } from "@/app/simulation/schema";
import { db } from "@/lib/drizzle";

import { createCriteria, type SelectCriteresSchema } from "./helper";

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

// type ActionReturn = { data: rows; nbRows: number };

export async function getSolutionParTypologie(data: unknown) {
  // const res = CriteriaPayloadSchema.safeParse(await request.json());

  console.log("data", JSON.stringify(data, null, 2));

  const res = simulationSchema.safeParse(data);

  console.log("res", res);

  if (!res.success) {
    console.error("error", res.error.format());
    throw new Error("Erreur de formatage du hash");
  }

  console.log("body", JSON.stringify(res, null, 2));

  const criteresHelper = createCriteria(res.data);

  console.log("criteresHelper", JSON.stringify(criteresHelper, null, 2));

  const rows = await db
    .select({
      id: solutions.id,
      name: solutions.name,
      type: solutions.type,
      usageCH: solutions.usageCh,
      usageECS: solutions.usageEcs,
      usageFr: solutions.usageFr,
      ordre: solutionsParCriteres.ordreSolution,
      noteEnvironnemental: solutions.noteEnvironnemental,
      noteCout: solutionsParCriteres.cout,
      noteDifficulte: solutionsParCriteres.difficulte,
      criteres,
    })
    .from(criteres)
    .innerJoin(solutionsParCriteres, eq(criteres.id, solutionsParCriteres.criteresId))
    .innerJoin(solutions, eq(solutionsParCriteres.solutionsId, solutions.id))
    .where(buildWhereClause(criteresHelper))
    .all();

  console.log("rows", rows);

  return { nbRows: rows.length, data: rows };
}
