import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: true,
  solutionId: "61",
  titrePrincipal: "Résidence Odivine",
  lieu: "Divonne-Les-Bains",
  codeDepartement: "01",
  nbLogements: 16,
  anneeConstruction: 2020,
  apresChauffage: "PAC collective géothermique et plancher chauffant",
  apresECS: "CET eau-eau individuels",
  isolation: "Bâtiment neuf RT2012",
  detailMaterielsInstalles: [
    "1 Edel Eau 100 l",
    "10 Edel Eau 150 l",
    "5 Edel Eau 200 l",
    "PAC géothermique pour le chauffage",
  ],
  maitreOuvrage: "SOGIMM",
  bureauEtude: "Beter Pierre C",
  installateur: "Plomb’elec",
  avantages: [
    "Projet combinant une PAC collective géothermique, un plancher chauffant, et des CET eau-eau individuels raccordés sur le retour du réseau hydraulique du chauffage.",
  ],
  images: ["/img/fiches-reference/61_01_01.jpg", "/img/fiches-reference/61_01_02.jpg"],
} satisfies FicheReference;
