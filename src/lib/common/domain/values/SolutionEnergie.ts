import { type BddEnergie } from "drizzle/schema";

export type SolutionEnergie = {
  cepApres: BddEnergie["cep"];
  cepAvant: BddEnergie["cep"];
  dpeApres: BddEnergie["dpe"];
  dpeAvant: BddEnergie["dpe"];
  etaIsolationMenuiseriesApres: BddEnergie["etatIsolationMenuiseries"];
  etaIsolationMenuiseriesAvant: BddEnergie["etatIsolationMenuiseries"];
  etaIsolationMursApres: BddEnergie["etatIsolationMurs"];
  etaIsolationMursAvant: BddEnergie["etatIsolationMurs"];
  etaIsolationPlancherBasApres: BddEnergie["etatIsolationPlancherBas"];
  etaIsolationPlancherBasAvant: BddEnergie["etatIsolationPlancherBas"];
  etaIsolationPlancherHautApres: BddEnergie["etatIsolationPlancherHaut"];
  etaIsolationPlancherHautAvant: BddEnergie["etatIsolationPlancherHaut"];
  gesApres: BddEnergie["ges"];
  gesAvant: BddEnergie["ges"];
};
