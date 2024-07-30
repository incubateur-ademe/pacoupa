"use server";

import { typologies } from "drizzle/schema";
import moize from "moize";

import { config } from "@/config";
import { db } from "@/lib/drizzle";

type CriteriaProps = {
  annee: number;
  nbLogements: number;
};

export async function getTypologie(criteria: CriteriaProps) {
  const typologies = await getAllTypologiesMemoized();

  const typologie = typologies.data.find(
    typologie =>
      (typologie.minPeriode === null || typologie.minPeriode <= criteria.annee) &&
      (typologie.maxPeriode === null || typologie.maxPeriode >= criteria.annee) &&
      (typologie.minLogements === null || typologie.minLogements <= criteria.nbLogements) &&
      (typologie.maxLogements === null || typologie.maxLogements >= criteria.nbLogements),
  );

  return typologie;
}

export async function getAllTypologies() {
  const rows = await db.select().from(typologies);

  return { data: rows };
}

/**
 * Memoized version of getAllTypologies.
 *
 * Typologies are not supposed to change often, so we can memoize the result.
 */
export const getAllTypologiesMemoized = moize(getAllTypologies, { isPromise: true, maxAge: config.cacheDuration });
