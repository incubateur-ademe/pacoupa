import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  titrePrincipal: "",
  lieu: "",
  nbLogements: 0,
  nbm2: 0,
  anneeConstruction: 0,
  initChauffage: "",
  initECS: "",
  initClimatisation: "",
  detailMaterielsInstalles: ["", "", ""],
  gainEnergetique: 0,
  dpeAvant: "G",
  depApres: "G",
  maitreOuvrage: "",
  bureauEtude: "",
  installateur: "",
  anneeLivraison: 0,
} satisfies FicheReference;
