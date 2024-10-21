import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: false,
  solutionId: "01",
  titrePrincipal: "Résidence Corcieux",
  lieu: "Corcieux",
  codeDepartement: "88",
  nbLogements: 12,
  nbm2: 0,
  anneeConstruction: 1960,
  avantChauffage: "Chaudière gaz",
  avantECS: "Chaudière gaz",
  apresChauffage: "Chaudière bois pour le chauffage",
  apresECS: "ECS par PAC",
  isolation: "",
  detailMaterielsInstalles: ["1 HRC70 35 kW"],
  maitreOuvrage: "Le Toit Vosgien",
  bureauEtude: "Terranergie",
  installateur: "Eury",
  anneeLivraison: 2019,
  avantages: ["Bâtiment passif"],
  images: ["/img/fiches-reference/01_02_01.jpg", "/img/fiches-reference/01_02_02.jpg"],
} satisfies FicheReference;
