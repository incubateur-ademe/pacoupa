import { catalogueSolutions } from "@__content/solutions";
import { type AlertProps } from "@codegouvfr/react-dsfr/Alert";

import { BadgePacoupa } from "@/components/BadgePacoupa";
import { FamilleCetAirEauImage } from "@/components/img/familles/FamilleCetAirEauImage";
import { FamilleCetEauEauImage } from "@/components/img/familles/FamilleCetEauEauImage";
import { FamilleGeothermieImage } from "@/components/img/familles/FamilleGeothermieImage";
import { FamilleHybrideImage } from "@/components/img/familles/FamilleHybrideImage";
import { FamillePacAirAirImage } from "@/components/img/familles/FamillePacAirAirImage";
import { FamillePacAirEauImage } from "@/components/img/familles/FamillePacAirEauImage";
import { FamillePacEauEauImage } from "@/components/img/familles/FamillePacEauEauImage";
import { FamillePacEauxGrisesEau } from "@/components/img/familles/FamillePacEauxGrisesEau";
import { FamillePacSolaireEauImage } from "@/components/img/familles/FamillePacSolaireEauImage";
import { FamilleRcuImage } from "@/components/img/familles/FamilleRcuImage";
import { type InformationBatiment } from "@/lib/common/domain/InformationBatiment";
import { type SolutionAvecEnergieCoutAide } from "@/lib/common/domain/values/SolutionAvecEnergieCoutAide";
import { type SolutionFamille } from "@/lib/common/domain/values/SolutionFamille";
import { type SolutionNote } from "@/lib/common/domain/values/SolutionNote";
import { type SolutionType } from "@/lib/common/domain/values/SolutionTypes";
import { type TravauxNiveauIsolation } from "@/lib/common/domain/values/TravauxNiveauIsolation";
import { type TypeSystemeWithoutRCU } from "@/lib/common/domain/values/TypeSysteme";
import { getInformationCout } from "@/lib/server/useCases/getInformationCout";
import { getInformationEnergie } from "@/lib/server/useCases/getInformationEnergie";
import { getSolutionsApplicables } from "@/lib/server/useCases/getSolutionsApplicables";
import { fetchBAN } from "@/lib/services/ban";
import { fetchFcuEligibility } from "@/lib/services/fcu";

type FetchSolutionsReturnType = {
  isRcuEligible: boolean;
  nbSolutions: number;
  solutions: SolutionAvecEnergieCoutAide[];
};

export const fetchSolutions = async (
  data: InformationBatiment,
  travauxNiveauIsolation: TravauxNiveauIsolation,
  complet: boolean = false,
): Promise<FetchSolutionsReturnType> => {
  const [baseSolutions, adresses] = await Promise.all([getSolutionsApplicables(data), fetchBAN(data.adresse)]);

  const {
    geometry: { coordinates },
  } = adresses.features[0];

  const [lon, lat] = coordinates;

  const { isEligible: isRcuEligible } = await fetchFcuEligibility({ lon, lat });

  const extractBaseSolutions = complet ? baseSolutions.data : baseSolutions.data.slice(0, isRcuEligible ? 2 : 3);

  const solutions = extractBaseSolutions.map(solution => {
    return { ...catalogueSolutions[solution.id], ...solution };
  });

  const baseEnergie = await getInformationEnergie({
    ...data,
    scenarioRenovationEnveloppe: "INIT",
    scenarioRenovationSysteme: "S0",
  });

  if (!baseEnergie.data) throw new Error("Erreur récupération données énergétiques manquantes");

  const solutionsAvecEnergie = await Promise.all(
    solutions.map(async solution => {
      const futurEnergie = await getInformationEnergie({
        ...data,
        scenarioRenovationEnveloppe:
          travauxNiveauIsolation === "Global" ? "GLOB" : travauxNiveauIsolation === "Partiel" ? "INTER" : "INIT",
        scenarioRenovationSysteme: solution.typeSysteme as TypeSystemeWithoutRCU,
      });

      return {
        ...solution,
        dpeAvant: baseEnergie.data.dpe,
        dpeApres: futurEnergie.data.dpe,
        cepAvant: baseEnergie.data.cep,
        cepApres: futurEnergie.data.cep,
        gesAvant: baseEnergie.data.ges,
        gesApres: futurEnergie.data.ges,
        etaIsolationMenuiseriesAvant: baseEnergie.data.etatIsolationMenuiseries,
        etaIsolationMenuiseriesApres: futurEnergie.data.etatIsolationMenuiseriesApresScenarioRenovationEnveloppe,
        etaIsolationMursAvant: baseEnergie.data.etatIsolationMurs,
        etaIsolationMursApres: futurEnergie.data.etatIsolationMursApresScenarioRenovationEnveloppe,
        etaIsolationPlancherBasAvant: baseEnergie.data.etatIsolationPlancherBas,
        etaIsolationPlancherBasApres: futurEnergie.data.etatIsolationPlancherBasApresScenarioRenovationEnveloppe,
        etaIsolationPlancherHautAvant: baseEnergie.data.etatIsolationPlancherHaut,
        etaIsolationPlancherHautApres: futurEnergie.data.etatIsolationPlancherHautApresScenarioRenovationEnveloppe,
      };
    }),
  );

  const solutionsAvecCout = await Promise.all(
    solutionsAvecEnergie.map(async solution => {
      const baseCout = await getInformationCout({
        ...data,
        scenarioRenovationEnveloppe: "INIT",
        scenarioRenovationSysteme: "S0",
        solution: solution.id,
      });

      const futurCout = await getInformationCout({
        ...data,
        scenarioRenovationEnveloppe:
          travauxNiveauIsolation === "Global" ? "GLOB" : travauxNiveauIsolation === "Partiel" ? "INTER" : "INIT",
        scenarioRenovationSysteme: solution.typeSysteme as TypeSystemeWithoutRCU,
        solution: solution.id,
      });

      return {
        ...solution,
        coutAbonnementApres: futurCout.data.coutAbonnement,
        coutAbonnementAvant: baseCout.data.coutAbonnement,
        coutInstallationSysteme: futurCout.data.coutInstallationSysteme,
        coutIsolationEnveloppe: futurCout.data.coutIsolationEnveloppe,
        coutMaintenanceApres: futurCout.data.coutMaintenance,
        coutMaintenanceAvant: baseCout.data.coutMaintenance,
        factureEnergetiqueApres: futurCout.data.factureEnergetique,
        factureEnergetiqueAvant: baseCout.data.factureEnergetique,
        aidesInstallationSysteme: futurCout.data.aidesInstallationSysteme,
      };
    }),
  );

  const nbSolutions = solutions.length + (isRcuEligible ? 1 : 0);

  return {
    nbSolutions,
    solutions: solutionsAvecCout,
    isRcuEligible,
  };
};

export const typeMap: Record<SolutionType, React.ReactNode> = {
  IND: <BadgePacoupa label="Solution individuelle" icon="fr-icon-user-fill" />,
  COL: <BadgePacoupa label="Solution collective" icon="fr-icon-team-fill" />,
  MIX: <BadgePacoupa label="Solution mixte" icon="fr-icon-group-fill" />,
};

export const familleImageMap: Record<SolutionFamille, JSX.Element> = {
  RCU: <FamilleRcuImage />,
  Geothermie: <FamilleGeothermieImage />,
  "PAC Air-Air": <FamillePacAirAirImage />,
  "PAC Air-Eau": <FamillePacAirEauImage />,
  "PAC Eau-Eau": <FamillePacEauEauImage />,
  "PAC Eaux grises-Eau": <FamillePacEauxGrisesEau />,
  "PAC Solaire-Eau": <FamillePacSolaireEauImage />,
  "Hybride PAC + Chaudière": <FamilleHybrideImage />,
  "CET Air-Eau": <FamilleCetAirEauImage />,
  "CET Eau-Eau": <FamilleCetEauEauImage />,
  "PAC Abs Gaz": <>No image</>,
};

type NoteMap = Record<SolutionNote, { label: string; severity: AlertProps.Severity }>;

export const environnementMap: NoteMap = {
  A: { label: "Très positif", severity: "success" },
  B: { label: "Très positif", severity: "success" },
  C: { label: "Modéré", severity: "warning" },
  D: { label: "Modéré", severity: "error" },
  E: { label: "Modéré", severity: "error" },
};

export const coutMap: NoteMap = {
  A: { label: "Assez faible", severity: "success" },
  B: { label: "Assez faible", severity: "success" },
  C: { label: "Modéré", severity: "warning" },
  D: { label: "Élevé", severity: "error" },
  E: { label: "Élevé", severity: "error" },
};

export const faciliteMap: NoteMap = {
  A: { label: "Sans difficulté majeure", severity: "success" },
  B: { label: "Sans difficulté majeure", severity: "success" },
  C: { label: "Modéré", severity: "warning" },
  D: { label: "Difficile", severity: "error" },
  E: { label: "Difficile", severity: "error" },
};

export const travauxMap: NoteMap = {
  A: { label: "Faible", severity: "success" },
  B: { label: "Faible", severity: "success" },
  C: { label: "Modéré", severity: "warning" },
  D: { label: "Important", severity: "error" },
  E: { label: "Important", severity: "error" },
};

export const acoustiqueMap: NoteMap = {
  A: { label: "Silencieux", severity: "success" },
  B: { label: "Silencieux", severity: "success" },
  C: { label: "Modéré", severity: "warning" },
  D: { label: "Bruyant", severity: "error" },
  E: { label: "Bruyant", severity: "error" },
};

export const maturiteMap: NoteMap = {
  A: { label: "Éprouvé", severity: "success" },
  B: { label: "Éprouvé", severity: "success" },
  C: { label: "Mature", severity: "warning" },
  D: { label: "Récent", severity: "error" },
  E: { label: "Récent", severity: "error" },
};
