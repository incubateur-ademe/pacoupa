import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: true,
  solutionId: "07",
  titrePrincipal: "Résidence Panorama",
  lieu: "Rennes",
  codeDepartement: "35",
  nbLogements: 54,
  anneeConstruction: 2018,
  apresChauffage: "",
  apresECS: "PAC sur air extrait",
  isolation: "Bâtiment neuf RT2012",
  detailMaterielsInstalles: ["Soraya 15 kW"],
  maitreOuvrage: "Réalités",
  bureauEtude: "BETOM Ingénierie",
  installateur: "PINEAU THERMIC SYSTEM",
  avantages: ["PAC sur air extrait de VMC collective pour la production d’ECS, sans unité extérieure"],
  images: ["/img/fiches-reference/07_01_01.jpg", "/img/fiches-reference/07_01_02.jpg"],
} satisfies FicheReference;
