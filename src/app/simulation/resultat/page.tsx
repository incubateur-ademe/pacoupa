import { Base64 } from "js-base64";
import { type Metadata } from "next";

import { informationBatimentSchema } from "@/lib/common/domain/InformationBatiment";
import { type TravauxNiveauIsolation } from "@/lib/common/domain/values/TravauxNiveauIsolation";

import { sharedMetadata } from "../../shared-metadata";
import { fetchSolutions } from "./helper";
import { ResultatDetailSolution } from "./ResultatDetailSolution";
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

const ResultatsPage = async ({
  searchParams,
}: {
  searchParams: { complet: "non" | "oui"; hash: string; travauxNiveauIsolation: TravauxNiveauIsolation };
}) => {
  if (!searchParams.hash) throw new Error("Le hash est manquant");

  const complet = searchParams.complet === "oui";

  const travauxNiveauIsolation = searchParams.travauxNiveauIsolation ?? "Global";

  const unparsedFormData: unknown = JSON.parse(Base64.decode(searchParams.hash));
  const formData = informationBatimentSchema.safeParse(unparsedFormData);

  if (!formData.success) {
    const errors = formData.error.format();
    throw new Error(`Erreur de formatage du hash ${JSON.stringify(errors)}`);
  }

  const { solutions, isRcuEligible } = await fetchSolutions(formData.data, travauxNiveauIsolation);

  return (
    <>
      <SyncStore hash={searchParams.hash} />

      <ResultatDetailSolution
        informationBatiment={formData.data}
        solutions={solutions}
        isRcuEligible={isRcuEligible}
        hash={searchParams.hash}
        travauxNiveauIsolation={travauxNiveauIsolation}
      />
    </>
  );
};

export default ResultatsPage;
