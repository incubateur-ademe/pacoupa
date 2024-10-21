import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: true,
  solutionId: "03",
  titrePrincipal: "Eole Evangile",
  lieu: "Paris",
  codeDepartement: "75",
  nbLogements: 167,
  nbm2: 8000,
  anneeConstruction: 2021,
  apresChauffage: "Chauffage électrique",
  apresECS: "PAC sur eaux grise",
  isolation: "Bâtiment neuf RT2012",
  detailMaterielsInstalles: ["PAC facteur 7"],
  gainEnergetique: 0,
  dpeAvant: "G",
  dpeApres: "G",
  maitreOuvrage: "Linkcity",
  bureauEtude: "Amoes",
  installateur: "Bouygues Construction",
  avantages: [
    "COP effectif mesuré de l’ordre de 5 pour la production ECS",
    "COP effectif mesuré de l’ordre de 4 pour la production ECS et le Bouclage",
  ],
  images: ["/img/fiches-reference/03_01_01.jpg", "/img/fiches-reference/03_01_02.jpg"],
} satisfies FicheReference;
