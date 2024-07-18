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
    "01": bddCout.coutsSolution01,
    "02": bddCout.coutsSolution02,
    "03": bddCout.coutsSolution03,
    "04": bddCout.coutsSolution04,
    "05": bddCout.coutsSolution05,
    "06": bddCout.coutsSolution06,
    "07": bddCout.coutsSolution07,
    "08": bddCout.coutsSolution08,
    "10": bddCout.coutsSolution10,
    "11": bddCout.coutsSolution11,
    "12": bddCout.coutsSolution12,
    "13": bddCout.coutsSolution13,
    "15": bddCout.coutsSolution15,
    "16": bddCout.coutsSolution16,
    "20": bddCout.coutsSolution20,
    "21": bddCout.coutsSolution21,
    "22": bddCout.coutsSolution22,
    "23": bddCout.coutsSolution23,
    "25": bddCout.coutsSolution25,
    "26": bddCout.coutsSolution26,
    "30": bddCout.coutsSolution30,
    "31": bddCout.coutsSolution31,
    "32": bddCout.coutsSolution32,
    "40": bddCout.coutsSolution40,
    "50": bddCout.coutsSolution50,
    "51": bddCout.coutsSolution51,
    "52": bddCout.coutsSolution52,
    "53": bddCout.coutsSolution53,
    "54": bddCout.coutsSolution54,
    "60": bddCout.coutsSolution60,
    "61": bddCout.coutsSolution61,
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
