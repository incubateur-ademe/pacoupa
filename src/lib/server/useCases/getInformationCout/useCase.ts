"use server";

import { bddCout } from "drizzle/schema";
import { sql } from "drizzle-orm";

import { config } from "@/config";
import { db } from "@/lib/drizzle";

import { type GetInformationCoutDTO } from "./dto";
import { creerCriteresBddCout, type CriteresBddCout } from "./helper";

const creerClauseWhere = (filters: CriteresBddCout) => {
  const keys = Object.keys(filters);

  const sqlChunks = keys.map(key => {
    return sql`${bddCout[key as keyof typeof bddCout]} = ${filters[key as keyof typeof filters]}`;
  });

  return sql`${sql.join(sqlChunks, sql` and `)}`;
};

export async function getInformationCout(dto: GetInformationCoutDTO) {
  const criteresBddCout = await creerCriteresBddCout(dto);

  if (config.env !== "prod") console.debug("criteresBddCout", JSON.stringify(criteresBddCout, null, 2));

  const solutionColumn = {
    "01": bddCout.solution01,
    "02": bddCout.solution02,
    "03": bddCout.solution03,
    "04": bddCout.solution04,
    "05": bddCout.solution05,
    "06": bddCout.solution06,
    "07": bddCout.solution07,
    "08": bddCout.solution08,
    "10": bddCout.solution10,
    "11": bddCout.solution11,
    "12": bddCout.solution12,
    "13": bddCout.solution13,
    "15": bddCout.solution15,
    "16": bddCout.solution16,
    "20": bddCout.solution20,
    "21": bddCout.solution21,
    "22": bddCout.solution22,
    "23": bddCout.solution23,
    "25": bddCout.solution25,
    "26": bddCout.solution26,
    "30": bddCout.solution30,
    "31": bddCout.solution31,
    "32": bddCout.solution32,
    "40": bddCout.solution40,
    "50": bddCout.solution50,
    "51": bddCout.solution51,
    "52": bddCout.solution52,
    "53": bddCout.solution53,
    "54": bddCout.solution54,
    "60": bddCout.solution60,
    "61": bddCout.solution61,
  };

  const [row] = await db
    .select({
      id: bddCout.id,
      coutAbonnement: bddCout.coutAbonnement,
      coutMaintenance: bddCout.coutMaintenance,
      factureEnergetique: bddCout.factureEnergetique,
      coutIsolationEnveloppe: bddCout.coutIsolationEnveloppe,
      coutInstallationSysteme: solutionColumn[dto.solution],
    })
    .from(bddCout)
    .where(creerClauseWhere(criteresBddCout))
    .limit(1);

  return { data: row };
}

export type GetInformationCoutReturnDTO = ReturnType<typeof getInformationCout>;
