"use client";

declare global {
  interface Window {
    Tally?: Any;
  }
}

import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { Snackbar } from "@mui/material";
import { push } from "@socialgouv/matomo-next";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/Button";
import { Callout } from "@/components/Callout";
import { Card } from "@/components/Card";
import { HighlightText } from "@/components/HighlightText";
import { NoDataImage } from "@/components/img/NoDataImage";
import { RaisingHands } from "@/components/img/twemoji/RaisingHands";
import { TravauxNiveauIsolationSegmentedControl } from "@/components/IsolationSegmentedControl";
import { config } from "@/config";
import { Grid, GridCol } from "@/dsfr";
import { H2, Text } from "@/dsfr/base/typography";
import { useTallyPopupOnTimeout } from "@/lib/client/useTallyPopup";
import { estGlobalementRenove, type InformationBatiment } from "@/lib/common/domain/InformationBatiment";
import { type SolutionAvecEnergieCoutAide } from "@/lib/common/domain/values/SolutionAvecEnergieCoutAide";
import { type TravauxNiveauIsolation } from "@/lib/common/domain/values/TravauxNiveauIsolation";
import { matomoCategory } from "@/lib/matomo-events";
import { createSearchParams } from "@/utils/searchParams";
import { type Any } from "@/utils/types";

import { CardRcu } from "./CardRcu";
import { DebugButton } from "./DebugButton";
import { FranceRenovBlock } from "./FranceRenovBlock";
import { NouvelleSimulation } from "./NouvelleSimulation";
import { calculeIsolationsManquantes } from "./ShowIsolationImages";
import { SolutionCard } from "./SolutionCard";

type Props = {
  complet: boolean;
  informationBatiment: InformationBatiment;
  isRcuEligible: boolean;
  nbSolutions: number;
  solutions: SolutionAvecEnergieCoutAide[];
  travauxNiveauIsolation: TravauxNiveauIsolation;
};
/**
 * Composant qui affiche le résultat des solutions par défaut.
 */
export const Resultat = ({
  informationBatiment,
  solutions,
  nbSolutions,
  isRcuEligible,
  travauxNiveauIsolation,
  complet,
}: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  useTallyPopupOnTimeout(config.tally.feedback.id, 45_000);

  const handleClose = (event: Event | React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setShowToast(false);
  };

  return (
    <>
      <div>
        <H2 as="h6" className="mb-2">
          Copropriété
        </H2>
        <Card
          content={
            <div className="flex justify-between items-baseline">
              <div className="text-base font-bold">{informationBatiment.adresse}</div>
              <Button
                linkProps={{
                  href: "/simulation/etapes",
                  onClick: () => {
                    push(["trackEvent", matomoCategory.resultats, "Clic Modifier formulaire", "Modifier formulaire"]);
                  },
                }}
                priority="tertiary"
                iconId="ri-pencil-line"
                iconPosition="right"
              >
                {"Modifier"}
              </Button>
            </div>
          }
        />
      </div>

      {estGlobalementRenove(informationBatiment) && (
        <div className="mt-8 flex justify-center gap-8">
          <Callout
            type="pacoupa"
            content={
              <Text variant="sm" className="leading-6 mb-0">
                <strong>Super nouvelle !</strong>
                <br /> Vous habitez dans un immeuble qui est énergiquement déjà très performant ! Il n’y a plus qu’à
                changer le chauffage.&nbsp;
                <span className="inline-block w-[20px] align-middle">
                  <RaisingHands />
                </span>
              </Text>
            }
          />
        </div>
      )}

      <H2 as="h6" className="mt-4 mb-0">
        Chauffages compatibles
        <DebugButton formData={informationBatiment} solutions={solutions} />
      </H2>

      <Text variant="sm">Dépendent des travaux d’isolations</Text>

      {!estGlobalementRenove(informationBatiment) && (
        <TravauxNiveauIsolationSegmentedControl travauxNiveauIsolation={travauxNiveauIsolation} />
      )}

      <div>
        {nbSolutions === 0 ? (
          <div>
            <div className="text-center my-16">
              <NoDataImage />
            </div>
            <p>
              Nous n’avons trouvé <strong>aucune solution</strong> ENR compatible pour votre bâtiment.
            </p>
          </div>
        ) : (
          <>
            Nous avons trouvé{" "}
            <strong>
              <HighlightText>
                {nbSolutions} solution{nbSolutions > 1 ? "s" : ""}
              </HighlightText>
            </strong>{" "}
            de chauffage adaptées à votre bâtiment.
          </>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
        {isRcuEligible && <CardRcu />}
        {solutions.slice(0, complet ? nbSolutions : isRcuEligible ? 2 : 3).map((solution, index) => {
          const gestes = calculeIsolationsManquantes(solution);
          const marker = !isRcuEligible && index === 0 ? "Meilleure solution" : "";

          return (
            <div key={solution.id}>
              <Link href={`/simulation/resultat/${solution.id}?${searchParams.toString()}`}>
                <SolutionCard
                  solution={solution}
                  gestes={gestes}
                  marker={marker}
                  informationBatiment={informationBatiment}
                />
              </Link>
            </div>
          );
        })}
      </div>

      {!complet && nbSolutions > 3 && (
        <div className="flex mt-8">
          <Button
            priority="tertiary no outline"
            className={cx("grow", "md:grow-0", "justify-center")}
            onClick={() => {
              push(["trackEvent", matomoCategory.resultats, "Clic Voir plus de solutions", "Voir plus de solutions"]);

              router.push(
                `/simulation/resultat?${createSearchParams({
                  searchParams,
                  name: "complet",
                  value: "oui",
                })}`,
                { scroll: false },
              );
            }}
          >
            Voir plus de solutions
          </Button>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <Button
          priority="secondary"
          iconId="ri-share-fill"
          iconPosition="right"
          onClick={() => {
            push(["trackEvent", matomoCategory.solutionDetails, "Clic Partager", "Partager"]);

            navigator.clipboard.writeText(window.location.href).catch(console.error);
            setShowToast(true);
          }}
        >
          Partager tous les résultats
        </Button>

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={showToast}
          onClose={handleClose}
          autoHideDuration={4000}
          message="L'URL a bien été copiée 🚀."
        ></Snackbar>
      </div>

      <Grid>
        <GridCol className="mt-8">
          <NouvelleSimulation />
        </GridCol>
      </Grid>

      <FranceRenovBlock />
    </>
  );
};
