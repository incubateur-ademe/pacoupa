import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: false,
  solutionId: "22",
  titrePrincipal: "Hôtel La Villa",
  lieu: "Antibes",
  codeDepartement: "06",
  nbLogements: 60,
  avantChauffage: "",
  avantECS: "",
  apresChauffage: "DRV pour le chauffage et la climatisation",
  apresECS: "",
  isolation: "",
  detailMaterielsInstalles: ["8 groupes VRFMAX2R", "60 gainables"],
  maitreOuvrage: "Hôtel La Villa",
  bureauEtude: "JCD Etude",
  installateur: "Aqualia",
  avantages: [],
} satisfies FicheReference;
