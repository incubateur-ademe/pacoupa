import { type FicheReference } from "@/lib/common/domain/values/FicheReference";

export const ficheReference = {
  titrePrincipal: "Résidence Hermann Sabran",
  lieu: "Lyon (Rhône)",
  nbLogements: 70,
  nbm2: 3154,
  anneeConstruction: 1978,
  initChauffage: "Plancher chauffant électrique",
  initECS: "Ballon individuel électrique",
  initClimatisation: "Aucune",
  detailMaterielsInstalles: [
    "2 chaudières à condensation 100kw",
    "2 chaudières à condensation 80kw",
    "Une pompe à chaleur",
  ],
  gainEnergetique: -74,
  dpeAvant: "F",
  depApres: "C",
  maitreOuvrage: "Grand Lyon habitat (69)",
  bureauEtude: "Vidalat (69)",
  installateur: "Groupement EMV/ALVES (69)",
  anneeLivraison: 2018,
} satisfies FicheReference;
