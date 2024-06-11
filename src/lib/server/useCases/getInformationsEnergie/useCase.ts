"use server";

import { bddEnergie } from "drizzle/schema";
import { sql } from "drizzle-orm";

import { type InformationsEnergieDTO } from "@/app/api/informations-energie/route";
import { config } from "@/config";
import { db } from "@/lib/drizzle";

import { type BddEnergieFilters, createBddEnergieFilters } from "./helper";

/**
 * Build a SQL condition from the filters.
 */
const buildWhereClause = (filters: BddEnergieFilters) => {
  const keys = Object.keys(filters);

  const sqlChunks = keys.map(key => {
    return sql`upper(${bddEnergie[key as keyof typeof bddEnergie]}) = upper(${filters[key as keyof typeof filters]})`;
  });

  return sql`${sql.join(sqlChunks, sql` and `)}`;
};

export async function getInformationsEnergie(formData: InformationsEnergieDTO) {
  const criteres = await createBddEnergieFilters(formData);

  if (config.env !== "prod") console.debug("criteres", JSON.stringify(criteres, null, 2));

  const rows = await db
    .select({
      id: bddEnergie.id,
      etatIsolationPlancherBas: bddEnergie.etatIsolationPlancherBas,
      etatIsolationPlancherBasApresScénarioRenovationEnveloppe:
        bddEnergie.etatIsolationPlancherBasApresScénarioRenovationEnveloppe,
      etatIsolationPlancherHaut: bddEnergie.etatIsolationPlancherHaut,
      etatIsolationPlancherHautApresScénarioRenovationEnveloppe:
        bddEnergie.etatIsolationPlancherHautApresScénarioRenovationEnveloppe,
      etatIsolationMenuiseries: bddEnergie.etatIsolationMenuiseries,
      etatIsolationMenuiseriesApresScénarioRenovationEnveloppe:
        bddEnergie.etatIsolationMenuiseriesApresScénarioRenovationEnveloppe,
      etatIsolationMurs: bddEnergie.etatIsolationMurs,
      etatIsolationMursApresScénarioRenovationEnveloppe: bddEnergie.etatIsolationMursApresScénarioRenovationEnveloppe,
      cep: bddEnergie.cep,
      ges: bddEnergie.ges,
      dpe: bddEnergie.dpe,
      gainCep: bddEnergie.gainCep,
    })
    .from(bddEnergie)
    .where(buildWhereClause(criteres))
    .all();

  return { data: rows };
}
