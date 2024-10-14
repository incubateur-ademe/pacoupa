import { type catalogueSolutions } from "@__content/solutions";

import { type DPE } from "./DPE";

export type FicheReference = {
  anneeConstruction?: number;
  apresChauffage: string;
  apresECS: string;
  avantages: string[];
  bureauEtude: string;
  codeDepartement?: string;
  detailMaterielsInstalles: string[];
  dpeApres?: DPE;
  dpeAvant?: DPE;
  gainEnergetique?: number;
  images?: string[];
  installateur: string;
  isolation: string;
  lieu: string;
  maitreOuvrage: string;
  nbLogements?: number;
  nbm2?: number;
  solutionId: keyof typeof catalogueSolutions;
  titrePrincipal: string;
} & (
  | {
      anneeLivraison?: number;
      avantChauffage: string;
      avantECS: string;
      estNeuf: false;
    }
  | {
      anneeLivraison?: never;
      avantChauffage?: never;
      avantECS?: never;
      estNeuf: true;
    }
);
