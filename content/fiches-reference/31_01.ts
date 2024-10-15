import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: false,
  solutionId: "31",
  titrePrincipal: "Résidence Rue de la Croix",
  lieu: "Nanterre",
  codeDepartement: "92",
  nbLogements: 74,
  avantChauffage: "",
  avantECS: "Chauffe-eau électrique",
  apresChauffage: "",
  apresECS: "CET sur air extérieur",
  isolation: "",
  detailMaterielsInstalles: ["Calypso"],
  maitreOuvrage: "Erigere",
  bureauEtude: "",
  installateur: "Bedier",
  anneeLivraison: 2021,
  avantages: [],
  images: ["/img/fiches-reference/31_01_01.png", "/img/fiches-reference/31_01_02.jpg"],
} satisfies FicheReference;
