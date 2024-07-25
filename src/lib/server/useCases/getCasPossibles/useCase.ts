"use server";

import { casPossibles } from "drizzle/schema";
import moize from "moize";

import { type InformationBatiment } from "@/lib/common/domain/InformationBatiment";
import { db } from "@/lib/drizzle";

type EnergieEcsPossibleContexte = {
  energieCh: InformationBatiment["energieCH"];
  typeCh: InformationBatiment["typeCH"];
  typeEcs: InformationBatiment["typeECS"];
};

type TypeEcsPossibleContexte = Omit<EnergieEcsPossibleContexte, "typeEcs">;

type EnergieChPossibleContexte = Omit<TypeEcsPossibleContexte, "energieCh">;

export async function getEnergieEcsPossibles(criteria: EnergieEcsPossibleContexte) {
  const cas = await getAllCasPossiblesMemoized();

  return Array.from(
    new Set(
      cas.data
        .filter(
          cas =>
            cas.estPossible === "oui" &&
            cas.typeCh === criteria.typeCh &&
            cas.energieCh === criteria.energieCh &&
            cas.typeEcs === criteria.typeEcs,
        )
        .map(cas => cas.energieEcs),
    ),
  );
}

export async function getTypeEcsPossibles(criteria: TypeEcsPossibleContexte) {
  const cas = await getAllCasPossiblesMemoized();

  return Array.from(
    new Set(
      cas.data
        .filter(
          cas => cas.estPossible === "oui" && cas.typeCh === criteria.typeCh && cas.energieCh === criteria.energieCh,
        )
        .map(cas => cas.typeEcs),
    ),
  );
}

export async function getEnergieChPossibles(criteria: EnergieChPossibleContexte) {
  const cas = await getAllCasPossiblesMemoized();

  return Array.from(
    new Set(
      cas.data.filter(cas => cas.estPossible === "oui" && cas.typeCh === criteria.typeCh).map(cas => cas.energieCh),
    ),
  );
}

export async function getAllCasPossibles() {
  const rows = await db.select().from(casPossibles);

  return { data: rows };
}

/**
 * Memoized version of getAllTypologies.
 *
 * Typologies are not supposed to change often, so we can memoize the result.
 */
export const getAllCasPossiblesMemoized = moize(getAllCasPossibles, { isPromise: true });
