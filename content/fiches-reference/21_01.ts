import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: true,
  solutionId: "21",
  titrePrincipal: "Résidence Le Colibri",
  lieu: "Aubervilliers",
  codeDepartement: "93",
  nbLogements: 15,
  nbm2: 830,
  anneeConstruction: 2022,
  apresChauffage: "PAC air-eau gainée",
  apresECS: "",
  isolation: "Bâtiment neuf RT2012",
  detailMaterielsInstalles: ["2 PAC WPL 23 E", "Ballon tampon 700 l, SBP 700"],
  maitreOuvrage: "",
  bureauEtude: "SOPILQ",
  installateur: "",
  avantages: [
    "Le projet est situé en zone urbaine dense. La chaufferie est composée de deux pompes à chaleur air/eau installées à l’intérieur du local technique et raccordées sur l’extérieur par l’intermédiaire d’un réseau aéraulique. ",
  ],
  images: ["/img/fiches-reference/21_01_01.png", "/img/fiches-reference/21_01_02.png"],
} satisfies FicheReference;
