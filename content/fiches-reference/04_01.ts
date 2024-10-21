import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: false,
  solutionId: "04",
  titrePrincipal: "La Marseillaise",
  lieu: "Nantes",
  codeDepartement: "44",
  nbLogements: 0,
  nbm2: 858,
  anneeConstruction: 1927,
  avantChauffage: "Gaz collectif",
  avantECS: "Gaz collectif",
  apresChauffage: "ECS par PAC sur capteur solaire atmosphérique",
  apresECS: "ECS par PAC sur capteur solaire atmosphérique",
  isolation: "Rénovation globale (fenêtres, murs, toiture, plancher)",
  detailMaterielsInstalles: ["PAC", "2 ballons 1000 l", "66 m² capteurs"],
  maitreOuvrage: "GALEO",
  bureauEtude: "Pouget Consultants",
  installateur: "ABG Climatique",
  anneeLivraison: 2018,
  avantages: [
    "Les capteurs solaires hybrides produisent à la fois de l’eau chaude sanitaire et de l’électricité photovoltaïque. Le projet est labélisé SMILE.",
  ],
  images: ["/img/fiches-reference/04_01_01.jpg", "/img/fiches-reference/04_01_02.jpg"],
} satisfies FicheReference;
