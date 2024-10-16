import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: false,
  solutionId: "13",
  titrePrincipal: "Résidence Rouget de l’Isle",
  lieu: "Pantin",
  codeDepartement: "93",
  nbLogements: 151,
  nbm2: 10055,
  anneeConstruction: 1966,
  avantChauffage: "Chaudière gaz et plancher chauffant",
  avantECS: "Chaudière gaz et plancher chauffant",
  apresChauffage: "PAC géothermique et chaudière gaz en appoint",
  apresECS: "PAC géothermique et chaudière gaz en appoint",
  isolation: "Rénovation globale (fenêtres, murs, toiture, plancher)",
  detailMaterielsInstalles: ["RTWB 208, Trane", "2 chaudières gaz en appoint"],
  maitreOuvrage: "Immobilière 3F",
  bureauEtude: "Anteagroup, Sermet",
  installateur: "Cofely GDF Suez et Sanfor",
  anneeLivraison: 2011,
  avantages: [
    "Baisse des factures énergétiques de 59%",
    "Temps de retour sur investissement (avec subventions) : 6 ans",
    "PAC sur eau de nappe, puits de 68 m de profondeur et espacés de 280 m",
  ],
  images: ["/img/fiches-reference/13_01_01.jpg", "/img/fiches-reference/13_01_02.jpg"],
} satisfies FicheReference;
