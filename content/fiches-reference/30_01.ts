import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: false,
  solutionId: "30",
  titrePrincipal: "Résidence Les Primevères",
  lieu: "Taverny",
  codeDepartement: "95",
  nbLogements: 112,
  nbm2: 8129,
  anneeConstruction: 1982,
  avantChauffage: "",
  avantECS: "Chauffe-eau électrique",
  apresChauffage: "",
  apresECS: "CET sur air extrait de VMC pour l’ECS",
  isolation: "Rénovation globale (fenêtres, murs, toiture, plancher)",
  detailMaterielsInstalles: ["Aquacosy SV"],
  maitreOuvrage: "CDC Habitat",
  bureauEtude: "SOGETI INGENIERIE Bâtiment",
  installateur: "GCC",
  anneeLivraison: 2024,
  avantages: [
    "Les 112 logements sont répartis sur 5 bâtiments (R+3 à R+7) équipés de 4 ascenseurs.",
    "Certification NF Habitat HQE et HPE Rénovation. Réhabilitation en site occupé et en présence d’amiante.",
  ],
  images: ["/img/fiches-reference/30_01_01.png", "/img/fiches-reference/30_01_02.png"],
} satisfies FicheReference;
