import { type Metadata } from "next";

import { sharedMetadata } from "../../shared-metadata";
import { checkAndLoadResultatParams, type ResultatSearchParams } from "./helper";
import { Resultat } from "./Resultat";
import { SyncStore } from "./SyncStore";

const title = "Résultat simulation";
const description = "Résultat simulation";
const url = "/simulation/resultat";

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

export type ResultatsPageProps = {
  searchParams: ResultatSearchParams;
};

const ResultatsPage = async ({ searchParams }: ResultatsPageProps) => {
  const { informationBatiment, complet, travauxNiveauIsolation, solutions, nbSolutions, isRcuEligible } =
    await checkAndLoadResultatParams(searchParams);

  return (
    <>
      <SyncStore hash={searchParams.hash} />

      <Resultat
        informationBatiment={informationBatiment}
        solutions={solutions}
        isRcuEligible={isRcuEligible}
        complet={complet}
        travauxNiveauIsolation={travauxNiveauIsolation}
        nbSolutions={nbSolutions}
      />
    </>
  );
};

export default ResultatsPage;
