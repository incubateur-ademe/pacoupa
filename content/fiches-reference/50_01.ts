import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: false,
  solutionId: "50",
  titrePrincipal: "Résidence Urimenil",
  lieu: "Urimenil",
  codeDepartement: "88",
  nbLogements: 20,
  nbm2: 1500,
  anneeConstruction: 1975,
  avantChauffage: "Chaudière individuelle fioul",
  avantECS: "Chauffe-eau électrique individuel",
  apresChauffage: "PAC individuelle",
  apresECS: "PAC individuelle",
  isolation: "Isolation par l’extérieur des murs",
  detailMaterielsInstalles: ["Arianext Compact"],
  maitreOuvrage: "Offre Public de l'Habitat",
  bureauEtude: "Fluid'Concept",
  installateur: "CPIS",
  anneeLivraison: 2021,
  avantages: [
    "Remplacement d’une chaudière à fioul et de chauffe-eau électrique par une PAC pour le chauffage et l’ECS faisant passer la classe énergétique de la section E-G à B-C.",
  ],
} satisfies FicheReference;
