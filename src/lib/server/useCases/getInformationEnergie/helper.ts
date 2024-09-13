import { type BddEnergie } from "drizzle/zod-schema";

import { type SolutionIsolation } from "@/lib/common/domain/values/SolutionIsolation";
import { type TypeCH } from "@/lib/common/domain/values/TypeCH";
import { type TypeECS } from "@/lib/common/domain/values/TypeECS";

import { getTypologie } from "../getTypologie";
import { getZoneClimatiqueAssociee } from "../getZonesClimatiques";
import { type GetInformationEnergieDTO } from "./dto";

type GesteIsolation = "Menuiseries" | "Murs" | "PlancherBas" | "PlancherHaut";

export type CriteresBddEnergie = Pick<
  BddEnergie,
  | "ch"
  | "ecs"
  | "scenarioRenovationEnveloppe"
  | "scenarioRenovationSysteme"
  | "typeCh"
  | "typeEcs"
  | "typologie"
  | "zoneClimatique"
  | `etatIsolation${GesteIsolation}`
>;

/**
 * Application des règles métiers pour transformer le payload de l'API en en données utilisable pour la clause where de la requête SQL.
 *
 * @param dto une simulation
 */
export const creerCriteresBddEnergie = async (dto: GetInformationEnergieDTO): Promise<CriteresBddEnergie> => {
  const typologie = await getTypologie({ annee: dto.annee, nbLogements: dto.nbLogements });

  if (!typologie) {
    throw new Error("Typologie not found");
  }

  const zoneClimatique: CriteresBddEnergie["zoneClimatique"] = getZoneClimatiqueAssociee(
    dto.codePostal.substring(0, 2),
  );

  const etatIsolationMenuiseries: SolutionIsolation = dto.renovation?.includes("fenetres") ? "Isolé" : "Pas isolé";
  const etatIsolationPlancherBas: SolutionIsolation = dto.renovation?.includes("sol") ? "Isolé" : "Pas isolé";
  const etatIsolationPlancherHaut: SolutionIsolation = dto.renovation?.includes("toiture") ? "Isolé" : "Pas isolé";
  const etatIsolationMurs: SolutionIsolation = dto.renovation?.includes("murs") ? "Isolé" : "Pas isolé";

  const typeCh = dto.energieCH === "electricite" ? "ELEC" : (dto.energieCH.toUpperCase() as TypeCH);
  const typeEcs = dto.energieECS === "ballon electrique" ? "ELEC" : (dto.energieECS.toUpperCase() as TypeECS);

  const ch: CriteresBddEnergie["ch"] = dto.typeCH === "collectif" ? "COL" : "IND";
  const ecs: CriteresBddEnergie["ecs"] = dto.typeECS === "collectif" ? "COL" : "IND";

  return {
    typologie: typologie.nom,
    zoneClimatique,
    etatIsolationMenuiseries,
    etatIsolationPlancherBas,
    etatIsolationPlancherHaut,
    etatIsolationMurs,
    typeCh,
    typeEcs,
    ch,
    ecs,
    scenarioRenovationEnveloppe: dto.scenarioRenovationEnveloppe,
    scenarioRenovationSysteme: dto.scenarioRenovationSysteme,
  };
};
