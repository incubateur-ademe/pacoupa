import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: false,
  solutionId: "25",
  titrePrincipal: "Ecole Estienne d’Orves",
  lieu: "Verrières-le-Buisson",
  codeDepartement: "91",
  avantChauffage: "Chaudière gaz",
  avantECS: "Chaudière gaz",
  apresChauffage: "PAC air-eau pour le chauffage avec appoint gaz",
  apresECS: "",
  isolation: "",
  detailMaterielsInstalles: ["2 Effipac 50 kW", "Chaudière gaz"],
  maitreOuvrage: "Ville de Verrières-le-Buisson",
  bureauEtude: "Sage énergies",
  installateur: "CPE maintenance",
  anneeLivraison: 2023,
  avantages: [
    "Il a été installé 2 EFFIPAC chauffage de 50 KW dimensionnés pour assurer 30 % de la puissance par -7 °C extérieur soit une couverture annuelle d'environ 75 % et l'appoint est réalisé par la chaufferie gaz existante.",
  ],
  images: ["/img/fiches-reference/25_01_01.jpg", "/img/fiches-reference/25_01_02.jpg"],
} satisfies FicheReference;
