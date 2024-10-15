import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: false,
  anneeConstruction: 1967,
  solutionId: "10",
  titrePrincipal: "Résidence Gerardmer",
  lieu: "Gerardmer",
  codeDepartement: "88",
  nbLogements: 40,
  avantChauffage: "Chaudière fioul",
  avantECS: "Chaudière fioul",
  apresChauffage: "PAC collective chauffage et ECS",
  apresECS: "PAC collective chauffage et ECS",
  isolation: "Rénovation globale (fenêtres, murs, toiture, plancher)",
  detailMaterielsInstalles: ["1 PAC ZéPAC HRC70 50 kW", "Ballon ECS 2000"],
  maitreOuvrage: "Le Toit Vosgien",
  bureauEtude: "Terranergie",
  installateur: "SARL Maurice Alexandre",
  anneeLivraison: 2020,
  avantages: [
    "Bâtiment passif",
    "Fonctionnement sans appoint à la température de référence de la zone à -18°C",
    "Récupérateur de chaleur sur eaux usées instantané",
  ],
  images: ["/img/fiches-reference/10_03_01.png", "/img/fiches-reference/10_03_02.png"],
} satisfies FicheReference;
