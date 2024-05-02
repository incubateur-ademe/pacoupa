"use server";

import { criteres, solutions, solutionsParCriteres } from "drizzle/schema";
import { eq, or, sql } from "drizzle-orm";

import { type SimulationSchema } from "@/app/simulation/schema";
import { config } from "@/config";
import { db } from "@/lib/drizzle";

import { createCriteria, type SelectCriteresSchema } from "./helper";

// The NA fields are a special case. When the field as no value in the payload, it should be considered as NA only. Payload with 1 value should be considered as this value OR NA, SQL wise.
// Think to NA as "in every case" or "no matter what".
const NAFields = ["envContraint", "espaceExterieur", "toitureTerrasse", "nbLgts", "niveauRenovation", "temperature"];

/**
 * Build a SQL condition from the filters.
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

export type GetSolutionsParCriteresReturnType = Awaited<ReturnType<typeof getSolutionsParCriteres>>["data"];

export async function getSolutionsParCriteres(formData: SimulationSchema) {
  const criteresHelper = createCriteria(formData);

  if (config.env !== "prod") console.debug("criteresHelper", JSON.stringify(criteresHelper, null, 2));

  const rows = await db
    .select({
      id: solutions.id,
      ordre: solutionsParCriteres.ordreSolution,
      cout: { note: solutionsParCriteres.noteCout },
      difficulte: { note: solutionsParCriteres.noteDifficulte },
      travauxCollectif: { note: solutionsParCriteres.noteImpactTravauxColl },
      travauxIndividuel: { note: solutionsParCriteres.noteImpactTravauxIndiv },
      criteres,
    })
    .from(criteres)
    .innerJoin(solutionsParCriteres, eq(criteres.id, solutionsParCriteres.criteresId))
    .innerJoin(solutions, eq(solutionsParCriteres.solutionsId, solutions.id))
    .where(buildWhereClause(criteresHelper))
    .orderBy(solutionsParCriteres.ordreSolution)
    .all();

  return { data: rows };
}
