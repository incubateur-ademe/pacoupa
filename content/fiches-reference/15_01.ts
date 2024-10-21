import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: false,
  solutionId: "15",
  titrePrincipal: "Hôtel Les Coquelicots",
  lieu: "Saint-Pardoux-l’Ortigier",
  codeDepartement: "19",
  nbLogements: 25,
  nbm2: 900,
  anneeConstruction: 1977,
  avantChauffage: "Chaudière fioul",
  avantECS: "Chaudière fioul",
  apresChauffage: "PAC air-eau avec appoint gaz",
  apresECS: "PAC air-eau avec appoint gaz",
  isolation: "",
  detailMaterielsInstalles: [
    "AC ECS Hydrapac 11 kW",
    "ECS : Chaudière gaz Varfree 40 kW",
    "Ballon ECS Corydro 750 l",
    "PAC chauffage Aptaé 27 kW",
    "Chauffage : Chaudière gaz Varfree 70 kW",
  ],
  maitreOuvrage: "Hôtel Les Coquelicots",
  bureauEtude: "",
  installateur: "Faugeras Thermique Sanitaire",
  anneeLivraison: 2024,
  avantages: [
    "Avec Hydrapac, les économies sur la facture ECS sont de 25 à 30 % par rapport à la chaudière fioul existante.",
  ],
  images: ["/img/fiches-reference/15_01_01.jpg", "/img/fiches-reference/15_01_02.jpg"],
} satisfies FicheReference;
