import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: true,
  solutionId: "11",
  titrePrincipal: "Résidence Alexandre Dumas",
  lieu: "Paris",
  codeDepartement: "75",
  nbLogements: 24,
  nbm2: 1451,
  anneeConstruction: 2024,
  apresChauffage: "PAC air-eau",
  apresECS: "PAC air-eau",
  isolation: "Bâtiment neuf RT2012",
  detailMaterielsInstalles: [],
  maitreOuvrage: "Seqens",
  bureauEtude: "Pouget Consultants",
  installateur: "SCPC",
  avantages: [
    "Projet complexe en zone urbaine dense. Le traitement acoustique et visuel est le suivant :",
    "Ventelle acoustique (3 faces)",
    "Support béton + support anti vibratile",
    "« Banquette » pour dissimuler la VMC",
  ],
} satisfies FicheReference;
