import { type BddEco } from "drizzle/zod-schema";

import { type TypeCH } from "@/lib/common/domain/values/TypeCH";
import { type TypeECS } from "@/lib/common/domain/values/TypeECS";

import { getTypologie } from "../getTypologie";
import { type GetInformationCoutDTO } from "./dto";

export type CriteresBddEco = Pick<
  BddEco,
  | "ch"
  | "ecs"
  | "scenarioRenovationEnveloppe"
  | "scenarioRenovationSysteme"
  | "typeCh"
  | "typeEcs"
  | "typologie"
  | "zoneClimatique"
>;

/**
 * Application des règles métiers pour transformer le payload de l'API en en données utilisable pour la clause where de la requête SQL.
 *
 * @param dto une simulation
 */
export const creerCriteresBddEco = async (dto: GetInformationCoutDTO): Promise<CriteresBddEco> => {
  const typologie = await getTypologie({ annee: dto.annee, nbLogements: dto.nbLogements });

  if (!typologie.data) {
    throw new Error("Typologie not found");
  }

  const zoneClimatique: CriteresBddEco["zoneClimatique"] = "75 - Paris";

  const typeCh = dto.energieCH === "electricite" ? "ELEC" : (dto.energieCH.toUpperCase() as TypeCH);
  const typeEcs = dto.energieECS === "ballon electrique" ? "ELEC" : (dto.energieECS.toUpperCase() as TypeECS);

  const ch: CriteresBddEco["ch"] = dto.typeCH === "collectif" ? "COL" : "IND";
  const ecs: CriteresBddEco["ecs"] = dto.typeECS === "collectif" ? "COL" : "IND";

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
