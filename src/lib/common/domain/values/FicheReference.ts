import { type DPE } from "./DPE";

export type FicheReference = {
  anneeConstruction: number;
  anneeLivraison: number;
  bureauEtude: string;
  depApres: DPE;
  detailMaterielsInstalles: string[];
  dpeAvant: DPE;
  gainEnergetique: number;
  images?: string[];
  initChauffage: string;
  initClimatisation: string;
  initECS: string;
  installateur: string;
  lieu: string;
  maitreOuvrage: string;
  nbLogements: number;
  nbm2: number;
  titrePrincipal: string;
};
