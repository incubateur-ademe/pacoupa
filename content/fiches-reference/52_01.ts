import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: false,
  solutionId: "52",
  titrePrincipal: "Résidence Les Ferrets",
  lieu: "Toulouse",
  codeDepartement: "31",
  nbLogements: 38,
  avantChauffage: "Convecteurs électriques",
  avantECS: "Chauffe-eau électrique individuel",
  apresChauffage: "PAC air / air avec ECS pour un logement",
  apresECS: "PAC air / air avec ECS pour un logement",
  isolation: "Rénovation globale (fenêtres, murs, toiture, plancher)",
  detailMaterielsInstalles: ["T-One AquaAIR"],
  maitreOuvrage: "Toulouse Métropole Habitat",
  bureauEtude: "BET Atmospheres",
  installateur: "GB ENERGIE",
  anneeLivraison: 2021,
  avantages: [
    "Passage d’une étiquette DPE E à B",
    "Baisse des factures par 3 à 4",
    "100 m² de panneaux photovoltaïques",
  ],
  images: ["/img/fiches-reference/52_01_01.jpg", "/img/fiches-reference/52_01_02.png"],
} satisfies FicheReference;
