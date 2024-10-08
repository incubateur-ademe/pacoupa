"use client";

import { breakpoints } from "@codegouvfr/react-dsfr/fr/breakpoints";
import Snackbar from "@mui/material/Snackbar";
import { push } from "@socialgouv/matomo-next";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useWindowSize } from "usehooks-ts";

import { Evaluation } from "@/app/simulation/resultat/Evaluation";
import { FranceRenovBlock } from "@/app/simulation/resultat/FranceRenovBlock";
import { familleImageMap } from "@/app/simulation/resultat/helper";
import { Button } from "@/components/Button";
import { EstimationCouts } from "@/components/EstimationCouts";
import { EstimationGains } from "@/components/EstimationGains";
import { H2, Text } from "@/dsfr/base/typography";
import { type InformationBatiment } from "@/lib/common/domain/InformationBatiment";
import { type SolutionAvecEnergieCoutAide } from "@/lib/common/domain/values/SolutionAvecEnergieCoutAide";
import { type TravauxNiveauIsolation } from "@/lib/common/domain/values/TravauxNiveauIsolation";
import { matomoCategory } from "@/lib/matomo-events";

import { Isolation } from "../Isolation";
import { calculeIsolationsManquantes as calculeIsolationsManquantes } from "../ShowIsolationImages";
import { Usage } from "../Usage";
import { FicheReference } from "./FicheReference";

type Props = {
  informationBatiment: InformationBatiment;
  solution: SolutionAvecEnergieCoutAide;
  travauxNiveauIsolation: TravauxNiveauIsolation;
};

export const DetailSolution = ({ solution, informationBatiment, travauxNiveauIsolation }: Props) => {
  const [showToast, setShowToast] = useState(false);
  const searchParams = useSearchParams();

  const { width = 0 } = useWindowSize({ debounceDelay: 100, initializeWithValue: false });

  const gestes = calculeIsolationsManquantes(solution);

  const handleClose = (event: Event | React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setShowToast(false);
  };

  return (
    <div>
      <div className="sticky top-0 bg-white z-10 pb-4 pt-2">
        <div className="flex justify-between">
          <Button
            priority="tertiary"
            iconId="ri-arrow-go-back-line"
            linkProps={{
              href: `/simulation/resultat?${searchParams.toString()}`,

              onClick: () => {
                push(["trackEvent", matomoCategory.solutionDetails, "Clic Retour", "Retour"]);
              },
            }}
          >
            {width > breakpoints.getPxValues().sm ? "Retour à la liste" : "Retour"}
          </Button>
          <Button
            priority="tertiary"
            iconId="ri-share-fill"
            iconPosition="right"
            onClick={() => {
              push(["trackEvent", matomoCategory.solutionDetails, "Clic Partager", "Partager"]);

              navigator.clipboard.writeText(window.location.href).catch(console.error);
              setShowToast(true);
            }}
          >
            {width > breakpoints.getPxValues().sm ? "Partager la solution" : "Partager"}
          </Button>

          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={showToast}
            onClose={handleClose}
            autoHideDuration={4000}
            message="L'URL a bien été copiée 🚀."
          ></Snackbar>
        </div>

        <div className="flex items-start gap-4 mt-8">
          <div>{familleImageMap[solution.familleSolution]}</div>
          <div>
            <H2 as="h5">{solution.nom}</H2>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Text>{solution.description}</Text>
      </div>

      <div className="mt-4">
        <Usage solution={solution} withTitle={true} />
      </div>

      <hr />

      <div>
        <Isolation gestes={gestes} travauxNiveauIsolation={travauxNiveauIsolation} />
      </div>

      <hr className="mt-8" />

      <EstimationGains solution={solution} informationBatiment={informationBatiment} avecMessage />

      <EstimationCouts solution={solution} informationBatiment={informationBatiment} />

      <Text className="font-medium mt-8 mb-0">Autres estimations</Text>

      <div className="flex flex-col gap-6 mt-4 mb-8">
        <Evaluation categorie="environnement" solution={solution} withDetails />

        <Evaluation categorie="cout" solution={solution} withDetails />

        <Evaluation categorie="difficulte" solution={solution} withDetails />

        <Evaluation categorie="travauxCollectif" solution={solution} withDetails />

        <Evaluation categorie="travauxIndividuel" solution={solution} withDetails />

        <Evaluation categorie="acoustique" solution={solution} withDetails />

        <Evaluation categorie="espaceExterieur" solution={solution} withDetails />

        <Evaluation categorie="maturite" solution={solution} withDetails />
      </div>

      <div className="mb-8">
        <FicheReference solution={solution} />
      </div>

      <FranceRenovBlock withWorkflow={true} showToast={setShowToast} />
    </div>
  );
};
