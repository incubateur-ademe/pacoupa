import { criteres } from "drizzle/schema";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type SimulationSchema } from "@/app/simulation/schema";

const SelectCriteresSchema = createSelectSchema(criteres, {
  id: schema => schema.id.optional(),
  ch: z.enum(["ind", "col"]),
  ecs: z.enum(["ind", "col"]),
  emetteur: z.enum(["hydraulique", "electrique"]),
  espaceExterieurPersonnel: z.enum(["oui", "non", "NA"]),
  envContraint: z.enum(["terrain disponible", "contraint", "NA"]),
  toitureTerrasse: z.enum(["sans tt", "toiture t", "NA"]),
  nbLgts: z.enum(["< 15", ">= 15", "NA"]),
  niveauRenovation: z.enum(["recent ou renove", "NA"]),
  temperature: z.enum(["< 40°C", "> 60°C", "< 60°C", "40-60°C", "NA"]),
});

export type SelectCriteresSchema = z.infer<typeof SelectCriteresSchema>;

/**
 * Application des règles métiers pour transformer le payload de l'API en en données utilisable pour la clause where de la requête SQL.
 *
 * @param payload une simulation
 */
export const createCriteria = (payload: SimulationSchema): SelectCriteresSchema => {
  const emetteur: SelectCriteresSchema["emetteur"] = payload.energieCH === "electricite" ? "electrique" : "hydraulique";

  const espaceExterieurPersonnel: SelectCriteresSchema["espaceExterieurPersonnel"] =
    payload.typeCH === "individuel" && payload.typeECS === "individuel"
      ? payload.espacesExterieursPersonnels?.includes("balcon")
        ? "oui"
        : "non"
      : "NA";

  const estContraint =
    !payload.espacesExterieursCommuns?.includes("jardin") &&
    !payload.espacesExterieursCommuns?.includes("parking exterieur");

  const envContraint: SelectCriteresSchema["envContraint"] =
    payload.typeCH === "collectif" || payload.typeECS === "collectif"
      ? !estContraint
        ? "terrain disponible"
        : "contraint"
      : "NA";

  const toitureTerrasse: SelectCriteresSchema["toitureTerrasse"] = estContraint
    ? payload.espacesExterieursCommuns?.includes("toit terrasse") ||
      payload.espacesExterieursPersonnels?.includes("toit terrasse")
      ? "toiture t"
      : "sans tt"
    : "NA";

  const temperature: SelectCriteresSchema["temperature"] =
    payload.emetteur === "plancher chauffant"
      ? "< 40°C"
      : payload.renovation === "rénovation globale"
        ? "40-60°C"
        : "> 60°C";

  const nbLgts: SelectCriteresSchema["nbLgts"] = payload.nbLogements < 15 ? "< 15" : ">= 15";

  const niveauRenovation: SelectCriteresSchema["niveauRenovation"] =
    payload.annee >= 2000 || payload.renovation === "rénovation globale" ? "recent ou renove" : "NA";

  return {
    ch: payload.typeCH === "collectif" ? "col" : "ind",
    ecs: payload.typeECS === "collectif" ? "col" : "ind",
    emetteur,
    envContraint,
    espaceExterieurPersonnel,
    toitureTerrasse,
    temperature,
    nbLgts,
    niveauRenovation,
  };
};
