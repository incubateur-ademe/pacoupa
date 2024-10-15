import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: false,
  solutionId: "10",
  titrePrincipal: "Résidence Saint-Dié-des-Vosges",
  lieu: "Saint-Dié-des-Vosges",
  codeDepartement: "88",
  nbLogements: 20,
  avantChauffage: "Chaudière fioul",
  avantECS: "Chaudière fioul",
  apresChauffage: "PAC collective chauffage et ECS",
  apresECS: "PAC collective chauffage et ECS",
  isolation: "Rénovation globale (fenêtres, murs, toiture, plancher)",
  detailMaterielsInstalles: ["1 PAC ZéPAC HRC70 35 kW", "Ballon ECS 1000 l"],
  maitreOuvrage: "Le Toit Vosgien",
  bureauEtude: "Terranergie",
  installateur: "",
  anneeLivraison: 2018,
  avantages: ["Bâtiment passif", "Fonctionnement sans appoint à la température de référence de la zone à -18°C."],
  images: ["/img/fiches-reference/10_02_01.png", "/img/fiches-reference/10_02_02.png"],
} satisfies FicheReference;
