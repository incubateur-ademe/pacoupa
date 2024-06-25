"use server";

import { bddEnergie } from "drizzle/schema";
import { sql } from "drizzle-orm";

import { config } from "@/config";
import { db } from "@/lib/drizzle";

import { type GetInformationEnergieDTO } from "./dto";
import { creerCriteresBddEnergie, type CriteresBddEnergie } from "./helper";

const creerClauseWhere = (filters: CriteresBddEnergie) => {
  const keys = Object.keys(filters);

  const sqlChunks = keys.map(key => {
    return sql`upper(${bddEnergie[key as keyof typeof bddEnergie]}) = upper(${filters[key as keyof typeof filters]})`;
  });

  return sql`${sql.join(sqlChunks, sql` and `)}`;
};

export async function getInformationEnergie(dto: GetInformationEnergieDTO) {
  const criteresBddEnergie = await creerCriteresBddEnergie(dto);

  if (config.env !== "prod") console.debug("criteresBddEnergie", JSON.stringify(criteresBddEnergie, null, 2));

  const [row] = await db
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
    })
    .from(bddEnergie)
    .where(creerClauseWhere(criteresBddEnergie))
    .limit(1);

  return { data: row };
}

export type GetInformationEnergieReturnDTO = ReturnType<typeof getInformationEnergie>;
