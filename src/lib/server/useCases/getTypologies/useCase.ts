"use server";

import { typologies } from "drizzle/schema";
import { and, sql } from "drizzle-orm";

import { db } from "@/lib/drizzle";

type CriteriaProps = {
  annee: number;
  nbLogements: number;
};

export async function getTypologies(criteria: CriteriaProps) {
  const rows = await db
    .select()
    .from(typologies)
    .where(
      sql`${and(
        sql`(${typologies.minPeriode} <= ${criteria.annee} or ${typologies.minPeriode} is null) and (${typologies.maxPeriode} >= ${criteria.annee} or ${typologies.maxPeriode} is null)`,
        sql`(${typologies.minLogements} <= ${criteria.nbLogements} or ${typologies.minLogements} is null) and (${typologies.maxLogements} >= ${criteria.nbLogements} or ${typologies.maxLogements} is null)`,
      )}`,
    )
    .all();

  return { data: rows };
}
