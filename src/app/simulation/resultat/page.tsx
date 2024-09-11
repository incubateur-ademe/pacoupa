import { Base64 } from "js-base64";
import { type Metadata } from "next";

import { estGlobalementRenove, informationBatimentSchema } from "@/lib/common/domain/InformationBatiment";
import { type TravauxNiveauIsolation } from "@/lib/common/domain/values/TravauxNiveauIsolation";

import { sharedMetadata } from "../../shared-metadata";
import { fetchSolutions } from "./helper";
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
  searchParams: {
    complet: "non" | "oui";
    hash: string;
    idSolution: string;
    travauxNiveauIsolation: TravauxNiveauIsolation;
  };
};

const ResultatsPage = async ({ searchParams }: ResultatsPageProps) => {
  if (!searchParams.hash) throw new Error("Le hash est manquant");

  const complet = searchParams.complet === "oui";

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

  const { solutions, nbSolutions, isRcuEligible } = await fetchSolutions({
    informationBatiment,
    travauxNiveauIsolation,
    complet,
  });

  return (
    <>
      <SyncStore hash={searchParams.hash} />

      <Resultat
        informationBatiment={formData.data}
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
