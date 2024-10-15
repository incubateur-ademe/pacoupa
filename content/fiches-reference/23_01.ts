import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: false,
  solutionId: "23",
  titrePrincipal: "Résidence Les Tilleuls",
  lieu: "Lassay-les-Châteaux",
  codeDepartement: "53",
  nbLogements: 85,
  nbm2: 4000,
  avantChauffage: "",
  avantECS: "",
  apresChauffage: "PAC géothermique pour le chauffage",
  apresECS: "",
  isolation: "Rénovation globale (fenêtres, murs, toiture, plancher)",
  detailMaterielsInstalles: ["3 PAC géothermiques WPF 52", "2 ballons tampon SBP 1 500"],
  maitreOuvrage: "EHPAD Les Tilleuls",
  bureauEtude: "EICE",
  installateur: "SMEC",
  anneeLivraison: 2018,
  avantages: [
    "Réhabilitation complète du bâtiment avec agrandissement de la maison de retraite afin d’accueillir 85 personnes. Le chauffage est assuré par une cascade de 3 pompes à chaleur géothermiques, raccordées sur 26 forages.",
  ],
  images: ["/img/fiches-reference/23_01_01.png", "/img/fiches-reference/23_01_02.png"],
} satisfies FicheReference;
