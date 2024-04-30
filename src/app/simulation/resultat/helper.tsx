import { FamilleCetAirEauImage } from "@/components/img/familles/FamilleCetAirEauImage";
import { FamilleCetEauEauImage } from "@/components/img/familles/FamilleCetEauEauImage";
import { FamilleGeothermieImage } from "@/components/img/familles/FamilleGeothermieImage";
import { FamilleHybrideImage } from "@/components/img/familles/FamilleHybrideImage";
import { FamillePacAirAirImage } from "@/components/img/familles/FamillePacAirAirImage";
import { FamillePacAirEauImage } from "@/components/img/familles/FamillePacAirEauImage";
import { FamillePacEauEauImage } from "@/components/img/familles/FamillePacEauEauImage";
import { FamillePacEauxGrisesEau } from "@/components/img/familles/FamillePacEauxGrisesEau";
import { FamillePacSolaireEauImage } from "@/components/img/familles/FamillePacSolaireEauImage";
import { FamilleRcuImage } from "@/components/img/familles/FamilleRcuImage";
import { type SolutionFamilles, type SolutionNote, type SolutionTypes } from "@/lib/enums";
import { type GetSolutionsParCriteresReturnType } from "@/lib/server/useCases/getSolutionsParCriteres";

export const typeMap: Record<SolutionTypes, string> = {
  IND: "Solution individuelle",
  COL: "Solution collective",
  MIX: "Solution mixte",
};

export const familleImageMap: Record<SolutionFamilles, JSX.Element> = {
  RCU: <FamilleRcuImage />,
  Geothermie: <FamilleGeothermieImage />,
  "PAC Air-Air": <FamillePacAirAirImage />,
  "PAC Air-Eau": <FamillePacAirEauImage />,
  "PAC Eau-Eau": <FamillePacEauEauImage />,
  "PAC Eaux grises-Eau": <FamillePacEauxGrisesEau />,
  "PAC Solaire-Eau": <FamillePacSolaireEauImage />,
  "Hybride PAC + Chaudière": <FamilleHybrideImage />,
  "CET Air-Eau": <FamilleCetAirEauImage />,
  "CET Eau-Eau": <FamilleCetEauEauImage />,
  "PAC Abs Gaz": <>No image</>,
};

export const createRecommandations = (solution: GetSolutionsParCriteresReturnType[number]) => {
  const obj = {
    Chauffage:
      solution.usageCH !== "Non" ? (solution.usageCH === "Oui" ? ("success" as const) : ("info" as const)) : null,
    ECS: solution.usageECS !== "Non" ? (solution.usageECS === "Oui" ? ("success" as const) : ("info" as const)) : null,
    Climatisation:
      solution.usageFr !== "Non" ? (solution.usageFr === "Oui" ? ("success" as const) : ("info" as const)) : null,
  };

  return Object.entries(obj).filter(([_, value]) => value !== null);
};

export const environnementMap: Record<SolutionNote, string> = {
  A: "Très positif",
  B: "Très positif",
  C: "Modéré",
  D: "Modéré",
  E: "Modéré",
};

export const coutMap: Record<SolutionNote, string> = {
  A: "Assez faible",
  B: "Assez faible",
  C: "Modéré",
  D: "Élevé",
  E: "Élevé",
};

export const faciliteMap: Record<SolutionNote, string> = {
  A: "Sans difficulté majeure",
  B: "Sans difficulté majeure",
  C: "Modéré",
  D: "Difficile",
  E: "Difficile",
};
