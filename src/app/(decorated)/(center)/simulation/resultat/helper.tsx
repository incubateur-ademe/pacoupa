import { catalogueSolutions } from "@__content/solutions";
import { Base64 } from "js-base64";

import { Badge, type BadgeProps } from "@/components/Badge";
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
import {
  estGlobalementRenove,
  type InformationBatiment,
  informationBatimentSchema,
} from "@/lib/common/domain/InformationBatiment";
import { type SolutionAvecEnergieCoutAide } from "@/lib/common/domain/values/SolutionAvecEnergieCoutAide";
import { type SolutionFamille } from "@/lib/common/domain/values/SolutionFamille";
import { type SolutionNote } from "@/lib/common/domain/values/SolutionNote";
import { type SolutionType } from "@/lib/common/domain/values/SolutionTypes";
import { type TravauxNiveauIsolation } from "@/lib/common/domain/values/TravauxNiveauIsolation";
import { type TypeSystemeWithoutRCU } from "@/lib/common/domain/values/TypeSysteme";
import {
  getCoutAideAvecChangementSystemeMemoized,
  getCoutRecurrentMemoized,
} from "@/lib/server/useCases/getInformationCout";
import { getInformationEnergieMemoized } from "@/lib/server/useCases/getInformationEnergie";
import { getSolutionsApplicablesMemoized } from "@/lib/server/useCases/getSolutionsApplicables";
import { fetchBAN } from "@/lib/services/ban";
import { fetchFcuEligibility } from "@/lib/services/fcu";

export type ResultatSearchParams = {
  complet?: "non" | "oui";
  hash: string;
  travauxNiveauIsolation?: TravauxNiveauIsolation;
};

export type CoachCoproSearchParams = {
  hash: string;
  step: string;
};

export const parseParams = (
  searchParams: ResultatSearchParams,
): {
  complet: boolean;
  informationBatiment: InformationBatiment;
} => {
  if (!searchParams.hash) throw new Error("Le hash est manquant");

  const complet = searchParams.complet === "oui";

  const unparsedFormData: unknown = JSON.parse(Base64.decode(searchParams.hash));
  const formData = informationBatimentSchema.safeParse(unparsedFormData);

  if (!formData.success) {
    const errors = formData.error.format();
    throw new Error(`Erreur de formatage du hash ${JSON.stringify(errors)}`);
  }

  const informationBatiment = formData.data;

  return { informationBatiment, complet };
};

export function parseParamsCoachCopro(searchParams: CoachCoproSearchParams): InformationBatiment | undefined {
  if (!searchParams.hash) return undefined;

  const unparsedFormData: unknown = JSON.parse(Base64.decode(searchParams.hash));
  const formData = informationBatimentSchema.safeParse(unparsedFormData);

  if (!formData.success) {
    const errors = formData.error.format();
    throw new Error(`Erreur de formatage du hash ${JSON.stringify(errors)}`);
  }

  if (formData.data.annee && formData.data.annee > 2000) {
    formData.data.renovation = ["toiture", "murs", "sol", "fenetres"];
  }

  return formData.data;
}

export interface CheckAndLoadResultatParamsReturnType {
  complet: boolean;
  informationBatiment: InformationBatiment;
  isRcuEligible: boolean;
  nbSolutions: number;
  solutions: SolutionAvecEnergieCoutAide[];
  travauxNiveauIsolation: TravauxNiveauIsolation;
}
export const checkAndLoadResultatParams = async (
  searchParams: ResultatSearchParams,
): Promise<CheckAndLoadResultatParamsReturnType> => {
  const { informationBatiment, complet } = parseParams(searchParams);

  // Pour les bâtiments après 2000 ou déjà entièrement rénové, on ne propose plus de rénovation globale.
  // Pour info, pour les bâtiments > 2000, la db ne contient que des données pour un scénario d'enveloppe INIT.
  const travauxNiveauIsolation = estGlobalementRenove(informationBatiment)
    ? "Aucun"
    : searchParams.travauxNiveauIsolation ?? "Global";

  const { solutions, nbSolutions, isRcuEligible } = await fetchSolutions({
    informationBatiment,
    travauxNiveauIsolation,
    complet,
  });

  return { informationBatiment, complet, travauxNiveauIsolation, solutions, nbSolutions, isRcuEligible };
};

export interface CheckAndLoadResultatParamsCoachCoproReturnType {
  informationBatiment: InformationBatiment;
  isRcuEligible: boolean;
  nbSolutions: number;
  solutions: SolutionAvecEnergieCoutAide[];
  travauxNiveauIsolation: TravauxNiveauIsolation;
}
export const checkAndLoadResultatParamsCoachCopro = async (
  informationBatiment: InformationBatiment,
  travaux?: TravauxNiveauIsolation,
): Promise<CheckAndLoadResultatParamsCoachCoproReturnType | null> => {
  if (!informationBatiment) return null;

  // Pour les bâtiments après 2000 ou déjà entièrement rénové, on ne propose plus de rénovation globale.
  // Pour info, pour les bâtiments > 2000, la db ne contient que des données pour un scénario d'enveloppe INIT.
  const travauxNiveauIsolation = estGlobalementRenove(informationBatiment) ? "Aucun" : travaux ?? "Global";

  const { solutions, nbSolutions, isRcuEligible } = await fetchSolutions({
    informationBatiment,
    travauxNiveauIsolation,
    complet: true,
  });

  return { informationBatiment, travauxNiveauIsolation, solutions, nbSolutions, isRcuEligible };
};

type FetchSolutionsReturnType = {
  isRcuEligible: boolean;
  nbSolutions: number;
  solutions: SolutionAvecEnergieCoutAide[];
};

type FetchSolutionsParams = {
  complet?: boolean;
  informationBatiment: InformationBatiment;
  travauxNiveauIsolation: TravauxNiveauIsolation;
};

export const fetchSolutions = async ({
  informationBatiment,
  travauxNiveauIsolation,
  complet = false,
}: FetchSolutionsParams): Promise<FetchSolutionsReturnType> => {
  const [baseSolutions, adresses] = await Promise.all([
    getSolutionsApplicablesMemoized(
      travauxNiveauIsolation === "Global"
        ? { ...informationBatiment, renovation: ["fenetres", "sol", "toiture", "murs"] }
        : informationBatiment,
    ),
    fetchBAN(informationBatiment.adresse),
  ]);

  const {
    properties: { postcode: codePostal },
    geometry: {
      coordinates: [lon, lat],
    },
  } = adresses.features[0];

  const { isEligible: isRcuEligible } = await fetchFcuEligibility({ lon, lat });

  const trancheBaseSolutions = complet ? baseSolutions.data : baseSolutions.data.slice(0, isRcuEligible ? 2 : 3);

  const solutions = trancheBaseSolutions.map(solution => {
    return { ...catalogueSolutions[solution.id], ...solution };
  });

  const baseEnergie = await getInformationEnergieMemoized({
    ...informationBatiment,
    scenarioRenovationEnveloppe: "INIT",
    scenarioRenovationSysteme: "S0",
    codePostal,
  });

  if (!baseEnergie.data) throw new Error("Erreur récupération données énergétiques manquantes");

  const solutionsAvecEnergie = await Promise.all(
    solutions.map(async solution => {
      const futurEnergie = await getInformationEnergieMemoized({
        ...informationBatiment,
        scenarioRenovationEnveloppe:
          travauxNiveauIsolation === "Global" ? "GLOB" : travauxNiveauIsolation === "Partiel" ? "INTER" : "INIT",
        scenarioRenovationSysteme: solution.typeSysteme as TypeSystemeWithoutRCU,
        codePostal,
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

  const baseCout = await getCoutRecurrentMemoized({
    ...informationBatiment,
    scenarioRenovationEnveloppe: "INIT",
    scenarioRenovationSysteme: "S0",
    codePostal,
  });

  if (!baseCout.data) throw new Error("Erreur récupération données coût et aides manquantes");

  const solutionsAvecCout = await Promise.all(
    solutionsAvecEnergie.map(async solution => {
      const futurCout = await getCoutAideAvecChangementSystemeMemoized({
        ...informationBatiment,
        scenarioRenovationEnveloppe:
          travauxNiveauIsolation === "Global" ? "GLOB" : travauxNiveauIsolation === "Partiel" ? "INTER" : "INIT",
        scenarioRenovationSysteme: solution.typeSysteme as TypeSystemeWithoutRCU,
        solution: solution.id,
        codePostal,
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

  return {
    nbSolutions: baseSolutions.data.length + (isRcuEligible ? 1 : 0),
    solutions: solutionsAvecCout,
    isRcuEligible,
  };
};

export const typeMap: Record<SolutionType, React.ReactNode> = {
  IND: <Badge label="Solution individuelle" icon="fr-icon-user-fill" />,
  COL: <Badge label="Solution collective" icon="fr-icon-team-fill" />,
  MIX: <Badge label="Solution mixte" icon="fr-icon-group-fill" />,
};

export const typeMapCoachCopro: Record<SolutionType, React.ReactNode> = {
  IND: <Badge label="Individuel" icon="fr-icon-user-fill" />,
  COL: <Badge label="Collectif" icon="fr-icon-team-fill" />,
  MIX: <Badge label="Mixte" icon="fr-icon-group-fill" />,
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

type NoteMap = Record<SolutionNote, { label: string; severity: BadgeProps["type"] }>;

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
