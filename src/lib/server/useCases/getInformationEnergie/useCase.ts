"use server";

import { bddEnergie } from "drizzle/schema";
import { sql } from "drizzle-orm";
import moize from "moize";

import { config } from "@/config";
import { db } from "@/lib/drizzle";

import { type GetInformationEnergieDTO } from "./dto";
import { creerCriteresBddEnergie, type CriteresBddEnergie } from "./helper";

const creerClauseWhere = (filters: CriteresBddEnergie) => {
  const keys = Object.keys(filters);

  const sqlChunks = keys.map(key => {
    return sql`${bddEnergie[key as keyof typeof bddEnergie]} = ${filters[key as keyof typeof filters]}`;
  });

  return sql`${sql.join(sqlChunks, sql` and `)}`;
};

export async function getInformationEnergie(dto: GetInformationEnergieDTO) {
  const criteresBddEnergie = await creerCriteresBddEnergie(dto);

  // if (config.env !== "prod") console.debug("criteresBddEnergie", JSON.stringify(criteresBddEnergie, null, 2));

  const [row] = await db
    .select({
      id: bddEnergie.id,
      etatIsolationPlancherBas: bddEnergie.etatIsolationPlancherBas,
      etatIsolationPlancherBasApresScenarioRenovationEnveloppe:
        bddEnergie.etatIsolationPlancherBasApresScenarioRenovationEnveloppe,
      etatIsolationPlancherHaut: bddEnergie.etatIsolationPlancherHaut,
      etatIsolationPlancherHautApresScenarioRenovationEnveloppe:
        bddEnergie.etatIsolationPlancherHautApresScenarioRenovationEnveloppe,
      etatIsolationMenuiseries: bddEnergie.etatIsolationMenuiseries,
      etatIsolationMenuiseriesApresScenarioRenovationEnveloppe:
        bddEnergie.etatIsolationMenuiseriesApresScenarioRenovationEnveloppe,
      etatIsolationMurs: bddEnergie.etatIsolationMurs,
      etatIsolationMursApresScenarioRenovationEnveloppe: bddEnergie.etatIsolationMursApresScenarioRenovationEnveloppe,
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

export const getInformationEnergieMemoized = moize.serialize(getInformationEnergie, {
  isPromise: true,
  maxAge: config.cacheDuration,
});
