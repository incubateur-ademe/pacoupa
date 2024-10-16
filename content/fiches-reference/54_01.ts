import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: true,
  solutionId: "54",
  titrePrincipal: "Résidence Merville",
  lieu: "Merville",
  codeDepartement: "31",
  nbLogements: 17,
  anneeConstruction: 2024,
  apresChauffage: "PAC air/air sans unité extérieur + convecteurs en zone de nuit",
  apresECS: "CET sur air extérieur, installé dans les logements avec bouche en façade",
  isolation: "Bâtiment neuf RE2020",
  detailMaterielsInstalles: ["Zé7"],
  maitreOuvrage: "Groupe XF",
  bureauEtude: "NEORKA",
  installateur: "JL groupe",
  avantages: ["PAC triple service sans unité extérieur sans option de rafraichissement"],
  images: ["/img/fiches-reference/54_01_01.jpg", "/img/fiches-reference/54_01_02.jpg"],
} satisfies FicheReference;
