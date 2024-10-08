import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: false,
  solutionId: "04",
  titrePrincipal: "",
  lieu: "",
  nbLogements: 0,
  nbm2: 0,
  anneeConstruction: 0,
  avantChauffage: "",
  avantECS: "",
  apresChauffage: "",
  apresECS: "",
  isolation: "",
  detailMaterielsInstalles: [],
  maitreOuvrage: "",
  bureauEtude: "",
  installateur: "",
  anneeLivraison: 0,
  avantages: [],
} satisfies FicheReference;
