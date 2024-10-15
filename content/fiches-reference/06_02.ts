import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: true,
  solutionId: "06",
  titrePrincipal: "Quartier Youri-Gargarine",
  lieu: "Romainville",
  codeDepartement: "93",
  nbm2: 6800,
  nbLogements: 107,
  anneeConstruction: 2022,
  apresChauffage: "Gaz",
  apresECS: "PAC air-eau gainée et appoint gaz",
  isolation: "Bâtiment neuf RT2012",
  detailMaterielsInstalles: ["4 PAC WPL 23 E", "7 ballons ECS 1000 l, SBB 1001"],
  maitreOuvrage: "Nexity",
  bureauEtude: "Pouget Consultants",
  installateur: "UTB",
  avantages: ["La PAC couvre 50% des besoins ECS", "Sans module extérieur : PAC gainée"],
} satisfies FicheReference;
