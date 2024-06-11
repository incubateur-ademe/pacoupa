"use server";

import { criteres, solutions, solutionsParCriteres } from "drizzle/schema";
import { eq, or, sql } from "drizzle-orm";

import { config } from "@/config";
import { db } from "@/lib/drizzle";

import { type GetSolutionsApplicablesDTO } from "./dto";
import { creerCriteresSolutionsApplicables, type SelectCriteresSchema } from "./helper";

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

export async function getSolutionsParCriteres(dto: GetSolutionsApplicablesDTO) {
  const criteresSolutionsApplicables = creerCriteresSolutionsApplicables(dto);

  if (config.env !== "prod") console.debug("criteresHelper", JSON.stringify(criteresSolutionsApplicables, null, 2));

  const rows = await db
    .select({
      id: solutions.id,
      type: solutions.type,
      familleSolution: solutions.familleSolution,
      usageCh: solutions.usageCh,
      usageEcs: solutions.usageEcs,
      usageFr: solutions.usageFr,
      typeSystem: solutions.typeSysteme,
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
    .where(buildWhereClause(criteresSolutionsApplicables))
    .orderBy(solutionsParCriteres.ordreSolution)
    .all();

  return { data: rows };
}
