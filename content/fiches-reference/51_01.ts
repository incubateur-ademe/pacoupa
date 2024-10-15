import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: false,
  solutionId: "51",
  titrePrincipal: "Résidence",
  lieu: "Rennes",
  codeDepartement: "35",
  nbLogements: 20,
  avantChauffage: "Convecteurs électriques",
  avantECS: "Chauffe-eau électrique individuel",
  apresChauffage: "PAC air-eau sans unité extérieure",
  apresECS: "PAC air-eau sans unité extérieure",
  isolation: "",
  detailMaterielsInstalles: ["PAC OPTIM’DUO"],
  maitreOuvrage: "Espacil Habitat",
  bureauEtude: "",
  installateur: "",
  anneeLivraison: 2016,
  avantages: [
    "Installation dans les combles",
    "Facture de chauffage et ECS divisée par 6",
    "Passage en étiquette DPE B",
  ],
} satisfies FicheReference;
