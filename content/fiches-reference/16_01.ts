import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: false,
  solutionId: "16",
  titrePrincipal: "La Flatière - Foyer de Charité",
  lieu: "Les Houches",
  codeDepartement: "74",
  nbLogements: 35,
  anneeConstruction: 1980,
  avantChauffage: "Chaudière fioul",
  avantECS: "Chaudière fioul",
  apresChauffage: "PAC collective",
  apresECS: "PAC collective",
  isolation: "",
  detailMaterielsInstalles: ["4 PAC HRC70 80 kW"],
  maitreOuvrage: "Foyer de la charité",
  bureauEtude: "CETRALP",
  installateur: "Fluid'air",
  anneeLivraison: 2023,
  avantages: [
    "Le projet est situé à 1000 m d’altitude, avec une température extérieure de référence de -19°C. L’environnement est très calme et l’implantation en toiture était impossible (chalets). La PAC a donc été installée dans un local.",
  ],
  images: ["/img/fiches-reference/16_01_01.jpg", "/img/fiches-reference/16_01_02.jpg"],
} satisfies FicheReference;
