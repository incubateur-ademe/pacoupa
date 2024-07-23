"use server";

import { type catalogueSolutions } from "@__content/solutions";
import { bddEco } from "drizzle/schema";
import { sql } from "drizzle-orm";
import { type SQLiteColumn } from "drizzle-orm/sqlite-core";

import { config } from "@/config";
import { db } from "@/lib/drizzle";

import { type GetInformationCoutDTO } from "./dto";
import { creerCriteresBddEco, type CriteresBddEco } from "./helper";

const creerClauseWhere = (filters: CriteresBddEco) => {
  const keys = Object.keys(filters);

  const sqlChunks = keys.map(key => {
    return sql`${bddEco[key as keyof typeof bddEco]} = ${filters[key as keyof typeof filters]}`;
  });

  return sql`${sql.join(sqlChunks, sql` and `)}`;
};

/**
 * Récupère les coûts et les aides sans prendre en compte de changement de système.
 *
 * @param dto
 */
export async function getCoutRecurrent(dto: Omit<GetInformationCoutDTO, "solution">) {
  const criteresBddEco = await creerCriteresBddEco(dto);

  if (config.env !== "prod")
    console.debug("criteresBddEco getInformationCoutRecurrent", JSON.stringify(criteresBddEco, null, 2));

  const [row] = await db
    .select({
      id: bddEco.id,
      coutAbonnement: bddEco.coutAbonnement,
      coutMaintenance: bddEco.coutMaintenance,
      factureEnergetique: bddEco.factureEnergetique,
      coutIsolationEnveloppe: bddEco.coutIsolationEnveloppe,
    })
    .from(bddEco)
    .where(creerClauseWhere(criteresBddEco))
    .limit(1);

  return { data: row };
}

type GetCoutAideAvecChangementSystemeReturnType = {
  data: {
    aidesInstallationSysteme: number;
    coutAbonnement: number;
    coutInstallationSysteme: number;
    coutIsolationEnveloppe: number | null;
    coutMaintenance: number;
    factureEnergetique: number;
    id: number;
  };
};

export async function getCoutAideAvecChangementSysteme(
  dto: GetInformationCoutDTO,
): Promise<GetCoutAideAvecChangementSystemeReturnType> {
  const criteresBddEco = await creerCriteresBddEco(dto);

  if (config.env !== "prod")
    console.debug(
      "criteresBddEco getInformationCoutEtAideAvecChangementSysteme",
      JSON.stringify(criteresBddEco, null, 2),
    );

  const solutionColumn: Record<keyof typeof catalogueSolutions, { aides: SQLiteColumn; cout: SQLiteColumn }> = {
    "01": { cout: bddEco.coutSolution01, aides: bddEco.aidesSolution01 },
    "02": { cout: bddEco.coutSolution02, aides: bddEco.aidesSolution02 },
    "03": { cout: bddEco.coutSolution03, aides: bddEco.aidesSolution03 },
    "04": { cout: bddEco.coutSolution04, aides: bddEco.aidesSolution04 },
    "05": { cout: bddEco.coutSolution05, aides: bddEco.aidesSolution05 },
    "06": { cout: bddEco.coutSolution06, aides: bddEco.aidesSolution06 },
    "07": { cout: bddEco.coutSolution07, aides: bddEco.aidesSolution07 },
    "08": { cout: bddEco.coutSolution08, aides: bddEco.aidesSolution08 },
    "10": { cout: bddEco.coutSolution10, aides: bddEco.aidesSolution10 },
    "11": { cout: bddEco.coutSolution11, aides: bddEco.aidesSolution11 },
    "12": { cout: bddEco.coutSolution12, aides: bddEco.aidesSolution12 },
    "13": { cout: bddEco.coutSolution13, aides: bddEco.aidesSolution13 },
    "15": { cout: bddEco.coutSolution15, aides: bddEco.aidesSolution15 },
    "16": { cout: bddEco.coutSolution16, aides: bddEco.aidesSolution16 },
    "20": { cout: bddEco.coutSolution20, aides: bddEco.aidesSolution20 },
    "21": { cout: bddEco.coutSolution21, aides: bddEco.aidesSolution21 },
    "22": { cout: bddEco.coutSolution22, aides: bddEco.aidesSolution22 },
    "23": { cout: bddEco.coutSolution23, aides: bddEco.aidesSolution23 },
    "25": { cout: bddEco.coutSolution25, aides: bddEco.aidesSolution25 },
    "26": { cout: bddEco.coutSolution26, aides: bddEco.aidesSolution26 },
    "30": { cout: bddEco.coutSolution30, aides: bddEco.aidesSolution30 },
    "31": { cout: bddEco.coutSolution31, aides: bddEco.aidesSolution31 },
    "32": { cout: bddEco.coutSolution32, aides: bddEco.aidesSolution32 },
    "40": { cout: bddEco.coutSolution40, aides: bddEco.aidesSolution40 },
    "50": { cout: bddEco.coutSolution50, aides: bddEco.aidesSolution50 },
    "51": { cout: bddEco.coutSolution51, aides: bddEco.aidesSolution51 },
    "52": { cout: bddEco.coutSolution52, aides: bddEco.aidesSolution52 },
    "53": { cout: bddEco.coutSolution53, aides: bddEco.aidesSolution53 },
    "54": { cout: bddEco.coutSolution54, aides: bddEco.aidesSolution54 },
    "60": { cout: bddEco.coutSolution60, aides: bddEco.aidesSolution60 },
    "61": { cout: bddEco.coutSolution61, aides: bddEco.aidesSolution61 },
  };

  const [row] = await db
    .select({
      id: bddEco.id,
      coutAbonnement: bddEco.coutAbonnement,
      coutMaintenance: bddEco.coutMaintenance,
      factureEnergetique: bddEco.factureEnergetique,
      coutIsolationEnveloppe: bddEco.coutIsolationEnveloppe,
      coutInstallationSysteme: solutionColumn[dto.solution].cout,
      aidesInstallationSysteme: solutionColumn[dto.solution].aides,
    })
    .from(bddEco)
    .where(creerClauseWhere(criteresBddEco))
    .limit(1);

  return { data: row };
}
