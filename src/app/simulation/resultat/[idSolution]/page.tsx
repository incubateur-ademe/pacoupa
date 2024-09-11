import assert from "assert";
import { Base64 } from "js-base64";
import { type Metadata } from "next";

import { estGlobalementRenove, informationBatimentSchema } from "@/lib/common/domain/InformationBatiment";
import { type SolutionAvecEnergieCoutAide } from "@/lib/common/domain/values/SolutionAvecEnergieCoutAide";
import { type TravauxNiveauIsolation } from "@/lib/common/domain/values/TravauxNiveauIsolation";

import { sharedMetadata } from "../../../shared-metadata";
import { fetchSolutions } from "../helper";
import { SyncStore } from "../SyncStore";
import { DetailSolution } from "./DetailSolution";

const title = "Détail solution";
const description = "Détail solution";
const url = "/simulation/resultat-detail";

export const metadata: Metadata = {
  ...sharedMetadata,
  title,
  description,
  openGraph: {
    ...sharedMetadata.openGraph,
    title,
    description,
    url,
  },
  alternates: {
    canonical: url,
  },
};

export type Props = {
  params: {
    idSolution: string;
  };
  searchParams: {
    hash: string;
    travauxNiveauIsolation: TravauxNiveauIsolation;
  };
};

const ResultatsPage = async ({ params: { idSolution }, searchParams }: Props) => {
  if (!searchParams.hash) throw new Error("Le hash est manquant");

  const unparsedFormData: unknown = JSON.parse(Base64.decode(searchParams.hash));
  const formData = informationBatimentSchema.safeParse(unparsedFormData);

  if (!formData.success) {
    const errors = formData.error.format();
    throw new Error(`Erreur de formatage du hash ${JSON.stringify(errors)}`);
  }

  const informationBatiment = formData.data;

  // Pour les bâtiments après 2000 ou déjà entièrement rénové, on ne propose plus de rénovation globale.
  // Pour info, pour les bâtiments > 2000, la db ne contient que des données pour un scénario d'enveloppe INIT.
  const travauxNiveauIsolation = estGlobalementRenove(informationBatiment)
    ? "Aucun"
    : searchParams.travauxNiveauIsolation ?? "Global";

  const { solutions } = await fetchSolutions({
    informationBatiment,
    travauxNiveauIsolation,
    complet: true,
  });

  let detailSolution: SolutionAvecEnergieCoutAide | null = null;

  if (idSolution) {
    detailSolution = solutions.find(s => s.id === idSolution) || null;
  }

  assert(detailSolution, "La solution n'a pas été trouvée");

  return (
    <>
      <SyncStore hash={searchParams.hash} />

      <DetailSolution
        solution={detailSolution}
        informationBatiment={informationBatiment}
        travauxNiveauIsolation={travauxNiveauIsolation}
      />
    </>
  );
};

export default ResultatsPage;
