import assert from "assert";
import { type Metadata } from "next";

import { type TravauxNiveauIsolation } from "@/lib/common/domain/values/TravauxNiveauIsolation";

import { sharedMetadata } from "../../../shared-metadata";
import { checkAndLoadResultatParams, ResultatSearchParams } from "../helper";
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
  searchParams: ResultatSearchParams
};

const ResultatDetailPage = async ({ params: { idSolution }, searchParams }: Props) => {
  const { informationBatiment, travauxNiveauIsolation, solutions } = await checkAndLoadResultatParams(searchParams);

  const detailSolution = idSolution ? solutions.find(s => s.id === idSolution) : null;

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

export default ResultatDetailPage;
