import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: false,
  solutionId: "40",
  titrePrincipal: "Particulier",
  lieu: "",
  nbLogements: 0,
  nbm2: 0,
  anneeConstruction: 0,
  avantChauffage: "",
  avantECS: "",
  apresChauffage: "PAC air-air monosplit",
  apresECS: "PAC air-air monosplit",
  isolation: "",
  detailMaterielsInstalles: [],
  maitreOuvrage: "",
  bureauEtude: "",
  installateur: "E-Climat",
  anneeLivraison: 2024,
  avantages: ["Cache extérieur DECOCLIM en aluminium"],
} satisfies FicheReference;
