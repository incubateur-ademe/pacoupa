"use server";

import { criteres, solutions, solutionsParCriteres } from "drizzle/schema";
import { eq, or, sql } from "drizzle-orm";
import moize from "moize";

import { config } from "@/config";
import { db } from "@/lib/drizzle";

import { type GetSolutionsApplicablesDTO } from "./dto";
import { creerCriteresSolutionsApplicables, type CriteresBatimentWithoutId } from "./helper";

// Les champs NA sont spéciaux. Quand les champs n'ont pas de valeur dans le DTO, il faut le considérer comme NA.
// Les champs avec 1 valeur doivent être considérés comme cette valeur OU bien NA, côté SQL.
// En résumé, NA veut dire "dans tous les cas" ou "peu importe".
const NAFields = ["envContraint", "espaceExterieur", "toitureTerrasse", "nbLgts", "niveauRenovation", "temperature"];

const creerClauseWhere = (filters: CriteresBatimentWithoutId) => {
  const keys = Object.keys(filters);

  const sqlChunks = keys.map(key => {
    if (NAFields.includes(key)) {
      const firstPart = sql`${criteres[key as keyof typeof criteres]} = ${filters[key as keyof typeof filters]}`;
      const secondPart = sql`${criteres[key as keyof typeof criteres]} = 'NA'`;

      return sql`${or(firstPart, secondPart)}`;
    } else {
      return sql`${criteres[key as keyof typeof criteres]} = ${filters[key as keyof typeof filters]}`;
    }
  });

  return sql`${sql.join(sqlChunks, sql.raw(" AND "))}`;
};

export async function getSolutionsApplicables(dto: GetSolutionsApplicablesDTO) {
  const criteresSolutionsApplicables = creerCriteresSolutionsApplicables(dto);

  if (config.env !== "prod")
    console.debug("criteresSolutionsApplicables", JSON.stringify(criteresSolutionsApplicables, null, 2));

  const rows = await db
    .select({
      id: solutions.id,
      type: solutions.type,
      familleSolution: solutions.familleSolution,
      usageCh: solutions.usageCh,
      usageEcs: solutions.usageEcs,
      usageFr: solutions.usageFr,
      typeSysteme: solutions.typeSysteme,
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
    .where(creerClauseWhere(criteresSolutionsApplicables))
    .orderBy(solutionsParCriteres.ordreSolution)
    .all();

  return { data: rows };
}

export const getSolutionsApplicablesMemoized = moize.serialize(getSolutionsApplicables, {
  isPromise: true,
  maxAge: config.cacheDuration,
});
