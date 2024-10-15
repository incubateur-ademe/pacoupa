import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: false,
  solutionId: "01",
  titrePrincipal: "Résidence Rue Riquet",
  lieu: "Paris",
  codeDepartement: "75",
  nbLogements: 167,
  anneeConstruction: 1978,
  avantChauffage: "Réseau de chaleur",
  avantECS: "Réseau de chaleur",
  apresChauffage: "Réseau de chaleur",
  apresECS: "ECS par PAC",
  isolation: "Rénovation globale (fenêtres, murs, toiture, plancher)",
  detailMaterielsInstalles: ["4 Hydragreen"],
  maitreOuvrage: "Immobilière 3F",
  bureauEtude: "LGX ingénierie ",
  installateur: "PITEL",
  anneeLivraison: 2020,
  avantages: [
    "Le choix de la technologie PAC Hydragreen a été réalisé pour augmenter la part EnR avec le raccordement au réseau de chaleur déjà existant.",
  ],
} satisfies FicheReference;
