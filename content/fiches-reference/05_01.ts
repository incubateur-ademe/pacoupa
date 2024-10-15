import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  estNeuf: false,
  solutionId: "05",
  titrePrincipal: "Résidence Hermann Sabran",
  lieu: "Lyon (Rhône)",
  nbLogements: 70,
  nbm2: 3154,
  anneeConstruction: 1978,
  avantChauffage: "Plancher chauffant électrique",
  avantECS: "Ballon individuel électrique",
  apresChauffage: "Chaudière gaz en appoint",
  apresECS: "PAC collective ECS",
  isolation: "Rénovation globale (fenêtres, murs, toiture, plancher)",
  detailMaterielsInstalles: [
    "2 chaudières à condensation 100kw",
    "2 chaudières à condensation 80kw",
    "Une pompe à chaleur",
  ],
  gainEnergetique: -74,
  dpeAvant: "F",
  dpeApres: "C",
  maitreOuvrage: "Grand Lyon habitat (69)",
  bureauEtude: "Vidalat (69)",
  installateur: "Groupement EMV/ALVES (69)",
  anneeLivraison: 2018,
  avantages: [
    "Les technologies simples et éprouvées ont permis un gain sur le CEP de 74%, et le passage d’une étiquette DPE F à C.",
  ],
  images: ["/img/fiches-reference/05_01_01.png", "/img/fiches-reference/05_01_02.png"],
} satisfies FicheReference;
