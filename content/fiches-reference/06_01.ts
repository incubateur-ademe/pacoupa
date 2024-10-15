import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: false,
  solutionId: "06",
  titrePrincipal: "Résidence Paris Habitat",
  lieu: "Paris",
  codeDepartement: "75",
  nbLogements: 243,
  anneeConstruction: 1970,
  avantChauffage: "Chaudière gaz",
  avantECS: "Chaudière gaz",
  apresChauffage: "PAC collective ECS et chaudière gaz en appoint",
  apresECS: "PAC collective ECS et chaudière gaz en appoint",
  isolation: "",
  detailMaterielsInstalles: ["1 PAC HRC 80 kW"],
  maitreOuvrage: "Paris Habitat",
  bureauEtude: "AT3E",
  installateur: "CIEC",
  anneeLivraison: 2023,
  avantages: [
    "L’implantation de la PAC en toiture était compliquée par les travaux nécessaires au passage des réseaux hydrauliques. La solution de PAC gainable a donc été retenue. ",
  ],
  images: ["/img/fiches-reference/06_01_01.png", "/img/fiches-reference/06_01_02.png"],
} satisfies FicheReference;
