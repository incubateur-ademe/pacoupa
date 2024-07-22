import { type CriteresBatiment } from "drizzle/zod-schema";

import { type GetSolutionsApplicablesDTO } from "./dto";

export type CriteresBatimentWithoutId = Omit<CriteresBatiment, "id">;

const estRenovationGlobale = (dto: GetSolutionsApplicablesDTO) => dto.annee >= 2000 || dto.renovation?.length === 4;

/**
 * Application des règles métiers pour transformer le payload de l'API en en données utilisable pour la clause where de la requête SQL.
 *
 * @param dto une simulation
 */
export const creerCriteresSolutionsApplicables = (dto: GetSolutionsApplicablesDTO): CriteresBatimentWithoutId => {
  const emetteur: CriteresBatimentWithoutId["emetteur"] =
    dto.energieCH === "electricite" ? "Electrique" : "Hydraulique";

  const espaceExterieurPersonnel: CriteresBatimentWithoutId["espaceExterieurPersonnel"] =
    dto.typeCH === "individuel" && dto.typeECS === "individuel"
      ? dto.espacesExterieursPersonnels?.includes("balcon")
        ? "Oui"
        : "Non"
      : "NA";

  const estContraint =
    !dto.espacesExterieursCommuns?.includes("jardin") && !dto.espacesExterieursCommuns?.includes("parking exterieur");

  const envContraint: CriteresBatimentWithoutId["envContraint"] =
    dto.typeCH === "collectif" || dto.typeECS === "collectif"
      ? !estContraint
        ? "Terrain disponible"
        : "Contraint"
      : "NA";

  const toitureTerrasse: CriteresBatimentWithoutId["toitureTerrasse"] = estContraint
    ? dto.espacesExterieursCommuns?.includes("toit terrasse") ||
      dto.espacesExterieursPersonnels?.includes("toit terrasse")
      ? "Toiture T"
      : "Sans TT"
    : "NA";

  const temperature: CriteresBatimentWithoutId["temperature"] =
    dto.emetteur === "plancher chauffant" ? "< 40°C" : estRenovationGlobale(dto) ? "40-60°C" : "> 60°C";

  const nbLgts: CriteresBatimentWithoutId["nbLgts"] = dto.nbLogements < 15 ? "< 15" : ">= 15";

  const niveauRenovation: CriteresBatimentWithoutId["niveauRenovation"] = estRenovationGlobale(dto)
    ? "Recent ou renove"
    : "NA";

  const ch: CriteresBatimentWithoutId["ch"] = dto.typeCH === "collectif" ? "COL" : "IND";
  const ecs: CriteresBatimentWithoutId["ecs"] = dto.typeECS === "collectif" ? "COL" : "IND";

  return {
    ch,
    ecs,
    emetteur,
    envContraint,
    espaceExterieurPersonnel,
    toitureTerrasse,
    temperature,
    nbLgts,
    niveauRenovation,
  };
};
