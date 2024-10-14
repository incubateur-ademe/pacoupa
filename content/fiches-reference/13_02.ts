import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: false,
  solutionId: "13",
  titrePrincipal: "Résidence Verson",
  lieu: "Verson",
  codeDepartement: "14",
  nbLogements: 6,
  nbm2: 414,
  anneeConstruction: 1948,
  avantChauffage: "Chaudière fioul",
  avantECS: "Chaudière fioul",
  apresChauffage: "PAC géothermique",
  apresECS: "PAC géothermique",
  isolation: "Rénovation globale (fenêtres, murs, toiture, plancher)",
  detailMaterielsInstalles: ["PAC WPF 16", "4 sondes de 100 m"],
  maitreOuvrage: "Le Rez et Les Terrasses de Verson",
  bureauEtude: "Domoexpert",
  installateur: "",
  anneeLivraison: 2014,
  avantages: [
    "Projet labélisé Effinergie Rénovation",
    "100 m² de panneaux photovoltaïques",
    "Ventilation double flux",
    "Très faibles consommations : 27 kWh/m²/an pour chauffage, ECS, VMC et éclairage des parties communes",
  ],
} satisfies FicheReference;
