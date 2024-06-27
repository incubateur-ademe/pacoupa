import { Base64 } from "js-base64";
import { type Metadata } from "next";

import { informationBatimentSchema } from "@/lib/common/domain/InformationBatiment";
import { type TravauxNiveauIsolation } from "@/lib/common/domain/values/TravauxNiveauIsolation";

import { sharedMetadata } from "../../shared-metadata";
import { fetchSolutions } from "./helper";
import { SyncStore } from "./SyncStore";
import { WrapperResultatDetail } from "./WrapperResultatDetail";

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

export type ResultatsPageSearchParamsProps = {
  complet: "non" | "oui";
  hash: string;
  travauxNiveauIsolation: TravauxNiveauIsolation;
};

const ResultatsPage = async ({ searchParams }: { searchParams: ResultatsPageSearchParamsProps }) => {
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

  console.log(JSON.stringify(solutions, null, 2));

  return (
    <>
      <SyncStore hash={searchParams.hash} />

      <WrapperResultatDetail
        informationBatiment={formData.data}
        solutions={solutions}
        isRcuEligible={isRcuEligible}
        complet={complet}
        travauxNiveauIsolation={travauxNiveauIsolation}
      />
    </>
  );
};

export default ResultatsPage;
