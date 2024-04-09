import { criteres } from "drizzle/schema";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type SimulationSchema } from "@/app/simulation/schema";

export const CriteriaPayloadSchema = createSelectSchema(criteres, {
  id: schema => schema.id.optional(),
  ch: z.enum(["ind", "col"]),
  ecs: z.enum(["ind", "col"]),
  emetteur: z.enum(["hydraulique", "electrique"]),
  envContraint: z.enum(["terrain disponible", "contraint", "NA"]),
  espaceExterieur: z.enum(["oui", "non", "NA"]),
  toitureTerrasse: z.enum(["sans tt", "toiture t", "NA"]),
  nbLgts: z.enum(["< 15", ">= 15"]),
  niveauRenovation: z.enum(["recent ou renove", "NA"]),
  temperature: z.enum(["< 40°C", "> 60°C", "< 60°C", "40-60°C", "NA"]).default("NA"), // si non renseigné, on considère que c'est NA pour avoir les lignes correspondantes.
});

type CriteriaPayload = z.infer<typeof CriteriaPayloadSchema>;

/**
 * Application des règles métiers pour transformer le payload de l'API en en données utilisable pour la clause where de la requête SQL.
 *
 * @param payload une simulation
 */
const createCriteria = (payload: SimulationSchema): CriteriaPayload => {
  const emetteur: CriteriaPayload["emetteur"] = payload.emetteur === "radiateurs" ? "electrique" : "hydraulique";

  const espaceExterieur: CriteriaPayload["espaceExterieur"] =
    payload.typeCH === "individuel" && payload.typeECS === "individuel"
      ? payload.espacesExterieursPersonnels?.includes("balcon")
        ? "oui"
        : "non"
      : "NA";

  const envContraint: CriteriaPayload["envContraint"] =
    payload.typeCH === "collectif" || payload.typeECS === "collectif"
      ? payload.espacesExterieursCommuns?.includes("jardin") ||
        payload.espacesExterieursCommuns?.includes("parking exterieur")
        ? "terrain disponible"
        : "contraint"
      : "NA";

  const toitureTerrasse: CriteriaPayload["toitureTerrasse"] =
    envContraint === "contraint"
      ? payload.espacesExterieursCommuns?.includes("toit terrasse") ||
        payload.espacesExterieursPersonnels?.includes("toit terrasse")
        ? "toiture t"
        : "sans tt"
      : "NA";

  const temperature: CriteriaPayload["temperature"] =
    payload.emetteur === "plancher chauffant"
      ? "< 40°C"
      : payload.renovation === "rénovation globale"
        ? "40-60°C"
        : "> 60°C";

  return {
    ch: payload.typeECS === "collectif" ? "col" : "ind",
    ecs: payload.typeECS === "collectif" ? "col" : "ind",
    emetteur,
    envContraint,
    espaceExterieur,
    toitureTerrasse,
    temperature,
    nbLgts: payload.nbLogements < 15 ? "< 15" : ">= 15",
    niveauRenovation:
      payload.annee === "post-1990" || payload.renovation === "rénovation globale" ? "recent ou renove" : "NA",
  };
};
