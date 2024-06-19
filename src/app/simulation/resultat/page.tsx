import { fr } from "@codegouvfr/react-dsfr";
import { Badge } from "@codegouvfr/react-dsfr/Badge";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { Base64 } from "js-base64";
import { type Metadata } from "next";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { HighlightText } from "@/components/HighlightText";
import { NoDataImage } from "@/components/img/NoDataImage";
import { TravauxNiveauIsolationSegmentedControl } from "@/components/IsolationSegmentedControl";
import { Box, Container, Grid, GridCol } from "@/dsfr";
import { H2 } from "@/dsfr/base/typography";
import { informationBatimentSchema } from "@/lib/common/domain/InformationBatiment";
import { type TravauxNiveauIsolation } from "@/lib/common/domain/values/TravauxNiveauIsolation";

import { sharedMetadata } from "../../shared-metadata";
import { CardRcu } from "./CardRcu";
import { DebugButton } from "./DebugButton";
import { Evaluation } from "./Evaluation";
import { FranceRenovBlock } from "./FranceRenovBlock";
import { familleImageMap, fetchSolutions, typeMap } from "./helper";
import { NouvelleSimulation } from "./NouvelleSimulation";
import { Recommandation } from "./Recommandation";
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

  const unparsedFormData: unknown = JSON.parse(Base64.decode(searchParams.hash));
  const formData = informationBatimentSchema.safeParse(unparsedFormData);

  if (!formData.success) {
    const errors = formData.error.format();
    throw new Error(`Erreur de formatage du hash ${JSON.stringify(errors)}`);
  }

  const { solutions, nbSolutions, isRcuEligible } = await fetchSolutions(formData.data);

  return (
    <>
      <SyncStore hash={searchParams.hash} />
      <Container className={fr.cx("fr-mt-4w")}>
        <Grid>
          <GridCol sm={8} xl={6}>
            <Card
              desc={<span className={fr.cx("fr-text--md")}>{formData.data.adresse}</span>}
              horizontal
              size="small"
              title="Adresse"
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
          <DebugButton formData={formData} solutions={solutions} />
        </H2>

        <p>Dépendent des travaux d’isolations</p>

        <TravauxNiveauIsolationSegmentedControl />

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
          {solutions.slice(0, complet ? nbSolutions : isRcuEligible ? 2 : 3).map(solution => (
            <GridCol key={solution.id} base={12} sm={6} xl={4}>
              <Card
                desc={
                  <>
                    {/* <Box className={fr.cx("fr-mt-2w")}>
                      <Text>{solution.description}</Text>
                    </Box> */}

                    <Recommandation solution={solution} />

                    <Box className={cx("flex", "flex-col", "gap-4")}>
                      <Evaluation categorie="environnement" solution={solution} />
                      <Evaluation categorie="cout" solution={solution} />
                      <Evaluation categorie="difficulte" solution={solution} />
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
                      <br />
                      <Badge>{typeMap[solution.type]}</Badge>
                    </Box>
                  </Box>
                }
                titleAs="h3"
                end={
                  <Button
                    priority="tertiary no outline"
                    iconId="ri-arrow-right-line"
                    linkProps={{
                      href: `/solutions/${solution.id}?noteCout=${solution.cout.note}&noteDifficulte=${solution.difficulte.note}&noteTravauxCollectif=${solution.travauxCollectif.note}&noteTravauxIndividuel=${solution.travauxIndividuel.note}&hash=${searchParams.hash}`,
                    }}
                  >
                    En savoir plus
                  </Button>
                }
              />
            </GridCol>
          ))}
        </Grid>
        {!complet && nbSolutions > 3 && (
          <Box className={cx("flex", fr.cx("fr-mt-4w"))}>
            <Button
              priority="tertiary"
              className={cx("grow", "md:grow-0", "justify-center")}
              linkProps={{
                href: `/simulation/resultat?complet=oui&hash=${searchParams.hash}`,
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

export default ResultatsPage;
