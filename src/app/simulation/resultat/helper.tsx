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

export const travauxMap: NoteMap = {
  A: { label: "Faible", severity: "success" },
  B: { label: "Faible", severity: "success" },
  C: { label: "Modéré", severity: "warning" },
  D: { label: "Important", severity: "error" },
  E: { label: "Important", severity: "error" },
};

export const acoustiqueMap: NoteMap = {
  A: { label: "Silencieux", severity: "success" },
  B: { label: "Silencieux", severity: "success" },
  C: { label: "Modéré", severity: "warning" },
  D: { label: "Bruyant", severity: "error" },
  E: { label: "Bruyant", severity: "error" },
};

export const maturiteMap: NoteMap = {
  A: { label: "Éprouvé", severity: "success" },
  B: { label: "Éprouvé", severity: "success" },
  C: { label: "Mature", severity: "warning" },
  D: { label: "Récent", severity: "error" },
  E: { label: "Récent", severity: "error" },
};
