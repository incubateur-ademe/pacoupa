import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: false,
  solutionId: "12",
  titrePrincipal: "Résidence Les Girandières",
  lieu: "Cognac",
  codeDepartement: "16",
  nbLogements: 0,
  nbm2: 0,
  anneeConstruction: 1948,
  avantChauffage: "",
  avantECS: "",
  apresChauffage: "DRV",
  apresECS: "PAC air-eau",
  isolation: "",
  detailMaterielsInstalles: ["9 groupes PURY-P YNW-A", "107 gainables", "PAC au CO2 Yuzen", "Ballons ECS 2000 l"],
  maitreOuvrage: "Réside Etudes",
  bureauEtude: "",
  installateur: "Dupré Guy & fils",
  anneeLivraison: 2020,
  avantages: [
    "Rénovation d’un bâtiment historique en centre-ville (ancienne maison de Cognac H. Mounier).",
    "Mise en œuvre du système DRV à récupération d’énergie pour assurer une indépendance en chauffage / climatisation par appartement.",
  ],
  images: ["/img/fiches-reference/12_01_01.jpg", "/img/fiches-reference/12_01_02.png"],
} satisfies FicheReference;
