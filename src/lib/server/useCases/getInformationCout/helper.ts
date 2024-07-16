import { type BddCout } from "drizzle/zod-schema";

import { type TypeCH } from "@/lib/common/domain/values/TypeCH";
import { type TypeECS } from "@/lib/common/domain/values/TypeECS";

import { getTypologie } from "../getTypologie";
import { type GetInformationCoutDTO } from "./dto";

export type CriteresBddCout = Pick<
  BddCout,
  | "ch"
  | "ecs"
  | "scenarioRenovationEnveloppe"
  | "scenarioRenovationSysteme"
  | "typeCh"
  | "typeEcs"
  | "typologie"
  | "zoneClimatique"
  // | `solution${(typeof enumIdSolution)[number]}`
>;

/**
 * Application des règles métiers pour transformer le payload de l'API en en données utilisable pour la clause where de la requête SQL.
 *
 * @param dto une simulation
 */
export const creerCriteresBddCout = async (dto: GetInformationCoutDTO): Promise<CriteresBddCout> => {
  const typologie = await getTypologie({ annee: dto.annee, nbLogements: dto.nbLogements });

  if (!typologie.data) {
    throw new Error("Typologie not found");
  }

  const zoneClimatique: CriteresBddCout["zoneClimatique"] = "75 - Paris";

  const typeCh = dto.energieCH === "electricite" ? "ELEC" : (dto.energieCH.toUpperCase() as TypeCH);
  const typeEcs = dto.energieECS === "ballon electrique" ? "ELEC" : (dto.energieECS.toUpperCase() as TypeECS);

  const ch: CriteresBddCout["ch"] = dto.typeCH === "collectif" ? "COL" : "IND";
  const ecs: CriteresBddCout["ecs"] = dto.typeECS === "collectif" ? "COL" : "IND";

  return {
    typologie: typologie.data.nom,
    zoneClimatique,
    typeCh,
    typeEcs,
    ch,
    ecs,
    scenarioRenovationEnveloppe: dto.scenarioRenovationEnveloppe,
    scenarioRenovationSysteme: dto.scenarioRenovationSysteme,
  };
};
