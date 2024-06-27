import { catalogueSolutions } from "@__content/solutions";
import { fr } from "@codegouvfr/react-dsfr";
import { type AlertProps } from "@codegouvfr/react-dsfr/Alert";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";

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
import { type Solution } from "@/lib/common/domain/values/Solution";
import { type SolutionEnergie } from "@/lib/common/domain/values/SolutionEnergie";
import { type SolutionFamille } from "@/lib/common/domain/values/SolutionFamille";
import { type SolutionNote } from "@/lib/common/domain/values/SolutionNote";
import { type SolutionType } from "@/lib/common/domain/values/SolutionTypes";
import { type TravauxNiveauIsolation } from "@/lib/common/domain/values/TravauxNiveauIsolation";
import { type TypeSystemeWithoutRCU } from "@/lib/common/domain/values/TypeSysteme";
import { getInformationEnergie } from "@/lib/server/useCases/getInformationEnergie";
import { getSolutionsApplicables } from "@/lib/server/useCases/getSolutionsApplicables";
import { type GetSolutionsApplicablesDTO } from "@/lib/server/useCases/getSolutionsApplicables/dto";
import { fetchBAN } from "@/lib/services/ban";
import { fetchFcuEligibility } from "@/lib/services/fcu";

type FetchSolutionsReturnType = {
  isRcuEligible: boolean;
  nbSolutions: number;
  solutions: Array<Solution & SolutionEnergie>;
};

export const fetchSolutions = async (
  data: InformationBatiment,
  travauxNiveauIsolation: TravauxNiveauIsolation,
): Promise<FetchSolutionsReturnType> => {
  const dataSimu1 =
    travauxNiveauIsolation === "Global"
      ? ({ ...data, renovation: ["fenetres", "murs", "sol", "toiture"] } as GetSolutionsApplicablesDTO)
      : data;

  const [baseSolutions, adresses] = await Promise.all([getSolutionsApplicables(dataSimu1), fetchBAN(data.adresse)]);

  const {
    geometry: { coordinates },
  } = adresses.features[0];

  const [lon, lat] = coordinates;

  const { isEligible: isRcuEligible } = await fetchFcuEligibility({ lon, lat });

  const solutions = baseSolutions.data.map(solution => {
    return { ...catalogueSolutions[solution.id], ...solution };
  });

  // Just in case the Simulateur 2 is not exhaustive.
  const testSimulateur2 = await getInformationEnergie({
    ...data,
    scenarioRenovationEnveloppe: "INIT",
    scenarioRenovationSysteme: "S0",
  });

  if (!testSimulateur2.data) throw new Error("Erreur récupération données énergétiques manquantes");

  const solutionsAvecEnergie = await Promise.all(
    solutions.map(async solution => {
      const baseEnergie = await getInformationEnergie({
        ...data,
        scenarioRenovationEnveloppe: "INIT",
        scenarioRenovationSysteme: "S0",
      });

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
        etaIsolationMenuiseriesApres: futurEnergie.data.etatIsolationMenuiseriesApresScénarioRenovationEnveloppe,
        etaIsolationMursAvant: baseEnergie.data.etatIsolationMurs,
        etaIsolationMursApres: futurEnergie.data.etatIsolationMursApresScénarioRenovationEnveloppe,
        etaIsolationPlancherBasAvant: baseEnergie.data.etatIsolationPlancherBas,
        etaIsolationPlancherBasApres: futurEnergie.data.etatIsolationPlancherBasApresScénarioRenovationEnveloppe,
        etaIsolationPlancherHautAvant: baseEnergie.data.etatIsolationPlancherHaut,
        etaIsolationPlancherHautApres: futurEnergie.data.etatIsolationPlancherHautApresScénarioRenovationEnveloppe,
      };
    }),
  );

  const nbSolutions = solutions.length + (isRcuEligible ? 1 : 0);

  return {
    nbSolutions,
    solutions: solutionsAvecEnergie,
    isRcuEligible,
  };
};

export const typeMap: Record<SolutionType, React.ReactNode> = {
  IND: (
    <div className="whitespace-nowrap">
      <i className={cx(fr.cx("fr-icon-user-fill", "fr-icon--sm"), "mr-1")} />
      Solution individuelle
    </div>
  ),
  COL: (
    <div className="whitespace-nowrap">
      <i className={cx(fr.cx("fr-icon-team-fill", "fr-icon--sm"), "mr-1")} />
      Solution collective
    </div>
  ),
  MIX: (
    <div className="whitespace-nowrap">
      <i className={cx(fr.cx("fr-icon-group-fill", "fr-icon--sm"), "mr-1")} />
      Solution mixte
    </div>
  ),
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
