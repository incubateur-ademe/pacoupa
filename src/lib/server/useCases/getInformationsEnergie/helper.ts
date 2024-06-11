import { bddEnergie } from "drizzle/schema";
import { createSelectSchema } from "drizzle-zod";
import { type z } from "zod";

import { type InformationsEnergieDTO } from "@/app/api/informations-energie/route";
import { type SolutionIsolation } from "@/lib/common/domain/values/SolutionIsolation";
import { type TypeCH } from "@/lib/common/domain/values/TypeCH";
import { type TypeECS } from "@/lib/common/domain/values/TypeECS";

import { getTypologie } from "../getTypologie";

const SelectBddEnergieSchema = createSelectSchema(bddEnergie);

export type SelectBddEnergieSchema = z.infer<typeof SelectBddEnergieSchema>;

type GesteIsolation = "Menuiseries" | "Murs" | "PlancherBas" | "PlancherHaut";

export type BddEnergieFilters = Pick<
  SelectBddEnergieSchema,
  | "ch"
  | "ecs"
  | "emetteur"
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
 * @param payload une simulation
 */
export const createBddEnergieFilters = async (payload: InformationsEnergieDTO): Promise<BddEnergieFilters> => {
  const typologie = await getTypologie({ annee: payload.annee, nbLogements: payload.nbLogements });

  if (!typologie.data) {
    throw new Error("Typologie not found");
  }

  const zoneClimatique: SelectBddEnergieSchema["zoneClimatique"] = "75 - Paris";

  const etatIsolationMenuiseries: SolutionIsolation = payload.renovation?.includes("fenetres") ? "Isolé" : "Pas isolé";
  const etatIsolationPlancherBas: SolutionIsolation = payload.renovation?.includes("sol") ? "Isolé" : "Pas isolé";
  const etatIsolationPlancherHaut: SolutionIsolation = payload.renovation?.includes("toiture") ? "Isolé" : "Pas isolé";
  const etatIsolationMurs: SolutionIsolation = payload.renovation?.includes("murs") ? "Isolé" : "Pas isolé";

  const typeCh = payload.energieCH === "electricite" ? "ELEC" : (payload.energieCH.toUpperCase() as TypeCH);
  const typeEcs = payload.energieECS === "ballon electrique" ? "ELEC" : (payload.energieCH.toUpperCase() as TypeECS);
  const emetteur = payload.energieCH === "fioul" || payload.energieCH === "gaz" ? "Hydraulique" : "Electrique";

  const ch = payload.typeCH === "collectif" ? "COL" : "IND";
  const ecs = payload.typeECS === "collectif" ? "COL" : "IND";

  return {
    typologie: typologie.data.nom,
    zoneClimatique,
    etatIsolationMenuiseries,
    etatIsolationPlancherBas,
    etatIsolationPlancherHaut,
    etatIsolationMurs,
    typeCh,
    typeEcs,
    emetteur,
    ch,
    ecs,
    scenarioRenovationEnveloppe: payload.scenarioRenovationEnveloppe,
    scenarioRenovationSysteme: payload.scenarioRenovationSysteme,
  };
};
