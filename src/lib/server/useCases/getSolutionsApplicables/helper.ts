import { criteres } from "drizzle/schema";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type GetSolutionsApplicablesDTO } from "./dto";

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

const estRenovationGlobale = (dto: GetSolutionsApplicablesDTO) => dto.renovation?.length === 4;

/**
 * Application des règles métiers pour transformer le payload de l'API en en données utilisable pour la clause where de la requête SQL.
 *
 * @param dto une simulation
 */
export const creerCriteresSolutionsApplicables = (dto: GetSolutionsApplicablesDTO): SelectCriteresSchema => {
  const emetteur: SelectCriteresSchema["emetteur"] = dto.energieCH === "electricite" ? "electrique" : "hydraulique";

  const espaceExterieurPersonnel: SelectCriteresSchema["espaceExterieurPersonnel"] =
    dto.typeCH === "individuel" && dto.typeECS === "individuel"
      ? dto.espacesExterieursPersonnels?.includes("balcon")
        ? "oui"
        : "non"
      : "NA";

  const estContraint =
    !dto.espacesExterieursCommuns?.includes("jardin") && !dto.espacesExterieursCommuns?.includes("parking exterieur");

  const envContraint: SelectCriteresSchema["envContraint"] =
    dto.typeCH === "collectif" || dto.typeECS === "collectif"
      ? !estContraint
        ? "terrain disponible"
        : "contraint"
      : "NA";

  const toitureTerrasse: SelectCriteresSchema["toitureTerrasse"] = estContraint
    ? dto.espacesExterieursCommuns?.includes("toit terrasse") ||
      dto.espacesExterieursPersonnels?.includes("toit terrasse")
      ? "toiture t"
      : "sans tt"
    : "NA";

  const temperature: SelectCriteresSchema["temperature"] =
    dto.emetteur === "plancher chauffant" ? "< 40°C" : estRenovationGlobale(dto) ? "40-60°C" : "> 60°C";

  const nbLgts: SelectCriteresSchema["nbLgts"] = dto.nbLogements < 15 ? "< 15" : ">= 15";

  const niveauRenovation: SelectCriteresSchema["niveauRenovation"] =
    dto.annee >= 2000 || estRenovationGlobale(dto) ? "recent ou renove" : "NA";

  return {
    ch: dto.typeCH === "collectif" ? "col" : "ind",
    ecs: dto.typeECS === "collectif" ? "col" : "ind",
    emetteur,
    envContraint,
    espaceExterieurPersonnel,
    toitureTerrasse,
    temperature,
    nbLgts,
    niveauRenovation,
  };
};
