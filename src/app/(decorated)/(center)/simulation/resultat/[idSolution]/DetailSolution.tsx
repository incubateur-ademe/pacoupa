"use client";

import { breakpoints } from "@codegouvfr/react-dsfr/fr/breakpoints";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Snackbar from "@mui/material/Snackbar";
import { push } from "@socialgouv/matomo-next";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useWindowSize } from "usehooks-ts";

import { Evaluation } from "@/app/(decorated)/(center)/simulation/resultat/Evaluation";
import { FranceRenovBlock } from "@/app/(decorated)/(center)/simulation/resultat/FranceRenovBlock";
import { familleImageMap } from "@/app/(decorated)/(center)/simulation/resultat/helper";
import { Button } from "@/components/Button";
import { EstimationCouts } from "@/components/EstimationCouts";
import { EstimationGains } from "@/components/EstimationGains";
import { H2, Text } from "@/dsfr/base/typography";
import { useScrollTop } from "@/lib/client/useScrollTop";
import { type SolutionAvecEnergieCoutAide } from "@/lib/common/domain/values/SolutionAvecEnergieCoutAide";
import { matomoCategory } from "@/lib/matomo-events";

import { Isolation } from "../Isolation";
import { calculeIsolationsManquantes as calculeIsolationsManquantes } from "../ShowIsolationImages";
import { Usage } from "../Usage";
import { FicheReferenceList } from "./FicheReferenceList";

type Props = {
  solution: SolutionAvecEnergieCoutAide;
};

export const DetailSolution = ({ solution }: Props) => {
  useScrollTop();
  const [showToast, setShowToast] = useState(false);
  const [showAllEvaluations, setShowAllEvaluations] = useState(false);
  const searchParams = useSearchParams();
  const [animationParent] = useAutoAnimate();

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
            <H2 className="!text-base !font-bold">{solution.nom}</H2>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Text>{solution.description}</Text>
      </div>

      <div className="mt-4">
        <Usage solution={solution} withTitle />
      </div>

      <hr />

      <div>
        <Isolation gestes={gestes} />
      </div>

      <hr className="mt-8" />

      <EstimationGains withTitle solution={solution} avecMessage />

      <EstimationCouts withTitle withTooltip solution={solution} />

      <Text className="font-medium mt-10 mb-0">Autres estimations</Text>

      <div className="flex flex-col gap-6 mt-4">
        <Evaluation categorie="difficulte" solution={solution} withDetails />

        <Evaluation categorie="travauxCollectif" solution={solution} withDetails />

        <Evaluation categorie="travauxIndividuel" solution={solution} withDetails />

        <Button
          priority="tertiary"
          iconId={showAllEvaluations ? "ri-arrow-up-s-line" : "ri-arrow-right-s-line"}
          iconPosition="right"
          onClick={() => setShowAllEvaluations(!showAllEvaluations)}
        >
          {!showAllEvaluations ? "Voir plus d'estimations" : "Voir moins d'estimations"}
        </Button>

        <div ref={animationParent}>
          {showAllEvaluations && (
            <>
              <Evaluation categorie="acoustique" solution={solution} withDetails />

              <Evaluation categorie="espaceExterieur" solution={solution} withDetails />

              <Evaluation categorie="maturite" solution={solution} withDetails />
            </>
          )}
        </div>
      </div>

      <hr className="my-4" />

      <div className="mb-8">
        <FicheReferenceList solution={solution} />
      </div>

      <FranceRenovBlock withWorkflow={true} showToast={setShowToast} />
    </div>
  );
};
