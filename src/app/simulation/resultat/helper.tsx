import { type AlertProps } from "@codegouvfr/react-dsfr/Alert";

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

type NoteMap = Record<SolutionNote, { label: string; severity: AlertProps.Severity }>;

export const environnementMap: NoteMap = {
  A: { label: "Très positif", severity: "success" },
  B: { label: "Très positif", severity: "success" },
  C: { label: "Modéré", severity: "warning" },
  D: { label: "Modéré", severity: "error" },
  E: { label: "Modéré", severity: "error" },
};

export const coutMap: NoteMap = {
  A: { label: "Assez faible", severity: "success" },
  B: { label: "Assez faible", severity: "success" },
  C: { label: "Modéré", severity: "warning" },
  D: { label: "Élevé", severity: "error" },
  E: { label: "Élevé", severity: "error" },
};

export const faciliteMap: NoteMap = {
  A: { label: "Sans difficulté majeure", severity: "success" },
  B: { label: "Sans difficulté majeure", severity: "success" },
  C: { label: "Modéré", severity: "warning" },
  D: { label: "Difficile", severity: "error" },
  E: { label: "Difficile", severity: "error" },
};
