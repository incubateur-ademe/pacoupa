"use server";

import { bddEnergie } from "drizzle/schema";
import { sql } from "drizzle-orm";

import { type InformationsEnergieDTO } from "@/app/api/informations-energie/route";
import { config } from "@/config";
import { db } from "@/lib/drizzle";

import { getTypologie } from "../getTypologie";
import { createCriteria, type SelectBddEnergieSchema } from "./helper";

/**
 * Build a SQL condition from the filters.
 */
const buildWhereClause = (filters: Partial<SelectBddEnergieSchema>) => {
  const keys = Object.keys(filters);

  const sqlChunks = keys.map(key => {
    return sql`upper(${bddEnergie[key as keyof typeof bddEnergie]}) = upper(${filters[key as keyof typeof filters]})`;
  });

  return sql`${sql.join(sqlChunks, sql` and `)}`;
};

export async function getInformationsEnergie(formData: InformationsEnergieDTO) {
  const typologie = await getTypologie({ annee: formData.annee, nbLogements: formData.nbLogements });

  if (!typologie.data) {
    throw new Error("Typologie not found");
  }

  const criteres = createCriteria(formData);

  if (config.env !== "prod") console.debug("criteres", JSON.stringify(criteres, null, 2));

  const rows = await db
    .select({
      id: bddEnergie.id,
      cep: bddEnergie.cep,
      ges: bddEnergie.ges,
      dpe: bddEnergie.dpe,
      gainCep: bddEnergie.gainCep,
    })
    .from(bddEnergie)
    .where(
      buildWhereClause({
        ...criteres,
        typologie: typologie.data.nom,
        scenarioRenovationEnveloppe: formData.scenarioRenovationEnveloppe,
        scenarioRenovationSysteme: formData.scenarioRenovationSysteme,
      }),
    )
    .all();

  return { data: rows };
}
