import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: true,
  solutionId: "02",
  titrePrincipal: "Résidence OLEA",
  lieu: "Pantin",
  codeDepartement: "93",
  nbLogements: 77,
  nbm2: 4700,
  anneeConstruction: 2021,
  apresChauffage: "Chauffage électrique",
  apresECS: "PAC Air / Eau (gainée)",
  isolation: "Bâtiment neuf RT2012",
  detailMaterielsInstalles: ["", "", ""],
  maitreOuvrage: "Woodeum",
  bureauEtude: "Pouget Consultants",
  installateur: "Dulipecc",
  avantages: [
    "Fonctionnement sans appoint à la température de référence de la zone à -18°C",
    "Récupérateur de chaleur sur eaux usées instantané",
  ],
} satisfies FicheReference;
