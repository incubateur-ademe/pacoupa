"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EstimationGains } from "@/components/EstimationGains";
import { HighlightText } from "@/components/HighlightText";
import { NoDataImage } from "@/components/img/NoDataImage";
import { TravauxNiveauIsolationSegmentedControl } from "@/components/IsolationSegmentedControl";
import { Box, Container, Grid, GridCol } from "@/dsfr";
import { H2 } from "@/dsfr/base/typography";
import { type InformationBatiment } from "@/lib/common/domain/InformationBatiment";
import { type Solution } from "@/lib/common/domain/values/Solution";
import { type SolutionEnergie } from "@/lib/common/domain/values/SolutionEnergie";
import { type TravauxNiveauIsolation } from "@/lib/common/domain/values/TravauxNiveauIsolation";
import { createSearchParams } from "@/utils/searchParams";

import { CardRcu } from "./CardRcu";
import { DebugButton } from "./DebugButton";
import { DetailSolution } from "./DetailSolution";
import { FranceRenovBlock } from "./FranceRenovBlock";
import { familleImageMap } from "./helper";
import { Isolation } from "./Isolation";
import { NouvelleSimulation } from "./NouvelleSimulation";
import { type ResultatsPageSearchParamsProps } from "./page";
import { computeIsolations } from "./ShowIsolationImages";
import { Usage } from "./Usage";

type Props = {
  complet: boolean;
  idSolution?: string;
  informationBatiment: InformationBatiment;
  isRcuEligible: boolean;
  solutions: Array<Solution & SolutionEnergie>;
  travauxNiveauIsolation: TravauxNiveauIsolation;
};
/**
 * Composant qui affiche le résultat des solutions par défaut ou bien une solution détaillée.
 *
 * Composant client pour alterner entre les 2 affichages.
 */
export const WrapperResultatDetail = ({
  informationBatiment,
  solutions,
  idSolution,
  isRcuEligible,
  travauxNiveauIsolation,
  complet,
}: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  let detailSolution: (Solution & SolutionEnergie) | null = null;

  if (idSolution) {
    detailSolution = solutions.find(s => s.id === idSolution) || null;
  }

  const nbSolutions = solutions.length;

  if (detailSolution)
    return (
      <DetailSolution
        solution={detailSolution}
        back={() =>
          router.push(
            `/simulation/resultat?${createSearchParams({
              searchParams,
              name: "idSolution",
              value: "",
            })}`,
          )
        }
        travauxNiveauIsolation={travauxNiveauIsolation}
      />
    );

  return (
    <>
      <Container className={fr.cx("fr-mt-4w")}>
        <Grid>
          <GridCol sm={8} xl={6}>
            <Card
              desc={<span className={fr.cx("fr-text--md")}>{informationBatiment.adresse}</span>}
              horizontal
              size="small"
              title="Copropriété"
              titleAs="h3"
              end={
                <Button
                  linkProps={{
                    href: "/simulation/etapes",
                  }}
                  priority="tertiary no outline"
                  iconId="ri-arrow-right-line"
                >
                  Modifier
                </Button>
              }
            />
          </GridCol>
        </Grid>
      </Container>

      <Container className={fr.cx("fr-mt-4w")}>
        <H2 as="h4">
          Chauffages compatibles
          <DebugButton formData={informationBatiment} solutions={solutions} />
        </H2>

        <p>Dépendent des travaux d’isolations</p>

        <TravauxNiveauIsolationSegmentedControl travauxNiveauIsolation={travauxNiveauIsolation} />

        <Box>
          {nbSolutions === 0 ? (
            <Box>
              <Box className={cx("text-center", fr.cx("fr-my-8w"))}>
                <NoDataImage />
              </Box>
              <p>
                Nous n’avons trouvé <strong>aucune solution</strong> ENR compatible pour votre bâtiment.
              </p>
            </Box>
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
        </Box>

        <Grid haveGutters className={fr.cx("fr-mt-3w")}>
          {isRcuEligible && (
            <GridCol key="rcu" base={12} sm={6} xl={4}>
              <CardRcu />
            </GridCol>
          )}
          {solutions.slice(0, complet ? nbSolutions : isRcuEligible ? 2 : 3).map(solution => {
            const gestes = computeIsolations(solution);

            return (
              <GridCol key={solution.id} base={12} sm={6} xl={4}>
                <Card
                  desc={
                    <>
                      <Box className="mt-4">
                        <Usage solution={solution} />
                      </Box>
                      <hr />
                      <Box>
                        <Isolation gestes={gestes} travauxNiveauIsolation={travauxNiveauIsolation} />
                      </Box>
                      <hr className="mt-8" />
                      <Box>
                        <EstimationGains solution={solution} />
                      </Box>
                    </>
                  }
                  horizontal
                  size="small"
                  title={
                    <Box className={cx("flex items-start gap-4")}>
                      <Box>{familleImageMap[solution.familleSolution]}</Box>
                      <Box>
                        <span className={cx("mb-0", fr.cx("fr-text--lg"))}>{solution.nom}</span>
                      </Box>
                    </Box>
                  }
                  titleAs="h3"
                  end={
                    <Button
                      priority="primary"
                      onClick={() =>
                        router.push(
                          `/simulation/resultat?${createSearchParams({
                            searchParams,
                            name: "idSolution",
                            value: solution.id,
                          })}`,
                        )
                      }
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
          <Box className={cx("flex", fr.cx("fr-mt-4w"))}>
            <Button
              priority="tertiary"
              className={cx("grow", "md:grow-0", "justify-center")}
              linkProps={{
                href: `/simulation/resultat?${createSearchParams<ResultatsPageSearchParamsProps["complet"]>({
                  searchParams,
                  name: "complet",
                  value: "oui",
                })}`,
              }}
            >
              Voir d’autres solutions
            </Button>
          </Box>
        )}

        <Grid>
          <GridCol className={fr.cx("fr-mt-6w")}>
            <NouvelleSimulation />
          </GridCol>
        </Grid>

        <FranceRenovBlock />
      </Container>
    </>
  );
};
