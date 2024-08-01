"use client";

import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { useRouter, useSearchParams } from "next/navigation";

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
import { createSearchParams } from "@/utils/searchParams";

import { CardRcu } from "./CardRcu";
import { DebugButton } from "./DebugButton";
import { DetailSolution } from "./DetailSolution";
import { FranceRenovBlock } from "./FranceRenovBlock";
import { familleImageMap } from "./helper";
import { Isolation } from "./Isolation";
import { NouvelleSimulation } from "./NouvelleSimulation";
import { type ResultatsPageSearchParamsProps } from "./page";
import { calculeIsolationsManquantes } from "./ShowIsolationImages";
import { Usage } from "./Usage";

type Props = {
  complet: boolean;
  idSolution?: string;
  informationBatiment: InformationBatiment;
  isRcuEligible: boolean;
  nbSolutions: number;
  solutions: SolutionAvecEnergieCoutAide[];
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
  nbSolutions,
  idSolution,
  isRcuEligible,
  travauxNiveauIsolation,
  complet,
}: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  let detailSolution: SolutionAvecEnergieCoutAide | null = null;

  if (idSolution) {
    detailSolution = solutions.find(s => s.id === idSolution) || null;
  }

  if (detailSolution)
    return (
      <DetailSolution
        solution={detailSolution}
        informationBatiment={informationBatiment}
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
      <div className="mt-8">
        <div className="my-8">
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

        <H2 as="h6" className="mb-0">
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
          <div className="flex mt-8">
            <Button
              priority="tertiary no outline"
              className={cx("grow", "md:grow-0", "justify-center")}
              linkProps={{
                href: `/simulation/resultat?${createSearchParams<ResultatsPageSearchParamsProps["complet"]>({
                  searchParams,
                  name: "complet",
                  value: "oui",
                })}`,
              }}
            >
              Voir plus de solutions
            </Button>
          </div>
        )}

        <Grid>
          <GridCol className="mt-12">
            <NouvelleSimulation />
          </GridCol>
        </Grid>

        <FranceRenovBlock />
      </div>
    </>
  );
};
