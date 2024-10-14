import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: true,
  solutionId: "32",
  titrePrincipal: "Résidence Rue du Bourgneuf",
  lieu: "Hennebont",
  codeDepartement: "56",
  nbLogements: 37,
  anneeConstruction: 2024,
  apresChauffage: "Chauffage électrique",
  apresECS: "CET sur air extérieur, installé dans les logements avec bouche en façade",
  isolation: "Bâtiment neuf RE2020",
  detailMaterielsInstalles: ["Edel 100 (T2)", "Edel 150 (T3)", "Edel 200 (T4)", "Edel 270 (T5)"],
  maitreOuvrage: "Nexity",
  bureauEtude: "Pouget Consultants",
  installateur: "Climatech Ouest",
  avantages: ["Le projet atteint le seuil 2025 de la RE2020."],
} satisfies FicheReference;
