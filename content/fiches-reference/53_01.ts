import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: false,
  solutionId: "53",
  titrePrincipal: "Résidence Flers",
  lieu: "Flers",
  codeDepartement: "61",
  nbLogements: 112,
  anneeConstruction: 1963,
  avantChauffage: "Chaudière à gaz centrale",
  avantECS: "Chauffe-bains individuels à gaz",
  apresChauffage: "PAC sur air extrait de VMC",
  apresECS: "PAC sur air extrait de VMC",
  isolation: "Rénovation globale (fenêtres, murs, toiture, plancher)",
  detailMaterielsInstalles: ["112 PAC F730"],
  maitreOuvrage: "Logissia / M2OB",
  bureauEtude: "",
  installateur: "SCETEC",
  anneeLivraison: 2024,
  avantages: ["Sans unité extérieure"],
  images: ["/img/fiches-reference/53_01_01.png", "/img/fiches-reference/53_01_02.png"],
} satisfies FicheReference;
