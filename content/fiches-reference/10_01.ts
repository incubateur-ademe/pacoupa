import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: false,
  solutionId: "10",
  titrePrincipal: "Extension du foyer de l’Espérance",
  lieu: "Le Molay-Littry",
  codeDepartement: "14",
  nbLogements: 102,
  nbm2: 1600,
  avantChauffage: "",
  avantECS: "",
  anneeConstruction: 1995,
  apresChauffage: "PAC collective chauffage et ECS",
  apresECS: "PAC collective chauffage et ECS",
  isolation: "",
  detailMaterielsInstalles: ["4 PAC WPL 23", "3 PAC WPL 33", "5 ballons tampon SBP 700", "5 ballons ECS SBB 1 000 WP"],
  maitreOuvrage: "SCI Avenir",
  bureauEtude: "I2D Conseils",
  installateur: "Max Services 14",
  anneeLivraison: 2020,
  avantages: [
    "Le chantier portait sur la réhabilitation complète et l’extension du Foyer de l’Espérance en vue de pouvoir accueillir 102 résidents contre 86, initialement. Les PAC réalisent le chauffage et la production d’eau chaude sanitaire pour 5 bâtiments.",
  ],
  images: ["/img/fiches-reference/10_01_01.png"],
} satisfies FicheReference;
