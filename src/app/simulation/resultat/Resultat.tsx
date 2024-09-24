"use client";

import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { Snackbar } from "@mui/material";
import { push } from "@socialgouv/matomo-next";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EstimationCouts } from "@/components/EstimationCouts";
import { EstimationGains } from "@/components/EstimationGains";
import { HighlightText } from "@/components/HighlightText";
import { NoDataImage } from "@/components/img/NoDataImage";
import { TravauxNiveauIsolationSegmentedControl } from "@/components/IsolationSegmentedControl";
import { Grid, GridCol } from "@/dsfr";
import { H2, Text } from "@/dsfr/base/typography";
import { estGlobalementRenove, type InformationBatiment } from "@/lib/common/domain/InformationBatiment";
import { type SolutionAvecEnergieCoutAide } from "@/lib/common/domain/values/SolutionAvecEnergieCoutAide";
import { type TravauxNiveauIsolation } from "@/lib/common/domain/values/TravauxNiveauIsolation";
import { matomoCategory } from "@/lib/matomo-events";
import { createSearchParams } from "@/utils/searchParams";

import { CardRcu } from "./CardRcu";
import { DebugButton } from "./DebugButton";
import { FranceRenovBlock } from "./FranceRenovBlock";
import { familleImageMap } from "./helper";
import { Isolation } from "./Isolation";
import { NouvelleSimulation } from "./NouvelleSimulation";
import { calculeIsolationsManquantes } from "./ShowIsolationImages";
import { Usage } from "./Usage";

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
          header={<div className="text-base font-bold">{informationBatiment.adresse}</div>}
          headerAlign="left"
          footer={
            <div className="mt-4 mr-4">
              <Button
                linkProps={{
                  href: "/simulation/etapes",
                  onClick: () => {
                    push(["trackEvent", matomoCategory.resultats, "Clic Modifier formulaire", "Modifier formulaire"]);
                  },
                }}
                priority="secondary"
                iconId="ri-pencil-line"
                iconPosition="right"
                className="min-h-0 w-min"
              >
                {"Modifier"}
              </Button>
            </div>
          }
          footerAlign="right"
        />
      </div>

      <H2 as="h6" className="mt-8 mb-0">
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

      <Grid haveGutters className="mt-6">
        {isRcuEligible && (
          <GridCol key="rcu" base={12} sm={6} xl={4}>
            <CardRcu />
          </GridCol>
        )}
        {solutions.slice(0, complet ? nbSolutions : isRcuEligible ? 2 : 3).map((solution, index) => {
          const gestes = calculeIsolationsManquantes(solution);
          const marker = !isRcuEligible && index === 0 && { marker: "Meilleure solution" };

          return (
            <GridCol key={solution.id} base={12} sm={6} xl={4}>
              <Card
                {...marker}
                content={
                  <>
                    <div className="mt-4">
                      <Usage solution={solution} />
                    </div>
                    <hr />
                    <div>
                      <Isolation
                        gestes={gestes}
                        travauxNiveauIsolation={travauxNiveauIsolation}
                        estGlobalementRenove={estGlobalementRenove(informationBatiment)}
                      />
                    </div>
                    <hr className="mt-8" />

                    <EstimationGains solution={solution} informationBatiment={informationBatiment} />

                    <EstimationCouts solution={solution} informationBatiment={informationBatiment} />
                  </>
                }
                header={<Card.CardHeader image={familleImageMap[solution.familleSolution]} title={solution.nom} />}
                footer={
                  <Button
                    priority="primary"
                    linkProps={{
                      href: `/simulation/resultat/${solution.id}?${searchParams.toString()}`,

                      onClick: () => {
                        push(["trackEvent", matomoCategory.resultats, "Clic Découvrir", "Découvrir"]);
                      },
                    }}
                  >
                    Découvrir
                  </Button>
                }
              />
            </GridCol>
          );
        })}
      </Grid>
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
