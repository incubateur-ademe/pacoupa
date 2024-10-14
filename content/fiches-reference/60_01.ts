import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: false,
  solutionId: "60",
  titrePrincipal: "Résidence Saint-Mihiel",
  lieu: "Saint-Mihiel",
  codeDepartement: "55",
  nbLogements: 16,
  nbm2: 1147,
  anneeConstruction: 1978,
  avantChauffage: "Chauffage électrique",
  avantECS: "Chauffe-eau électrique individuel",
  apresChauffage: "PAC individuelle sur boucle d’eau",
  apresECS: "PAC individuelle sur boucle d’eau",
  isolation: "Rénovation globale (fenêtres, murs, toiture, plancher)",
  detailMaterielsInstalles: ["2 PAC air-eau EWYT", "16 PAC eau-eau Altherma"],
  maitreOuvrage: "OPH de la Meuse",
  bureauEtude: "Setecba",
  installateur: "",
  anneeLivraison: 2024,
  avantages: [
    "Dossier Titre V opération réalisé pour pouvoir bénéficier des aides financières et justifier l’atteinte de l’étiquette DPE C.",
  ],
} satisfies FicheReference;
