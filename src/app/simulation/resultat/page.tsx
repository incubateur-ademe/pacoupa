import { catalogueSolutions } from "@__content/solutions";
import { fr } from "@codegouvfr/react-dsfr";
import { Badge } from "@codegouvfr/react-dsfr/Badge";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { Base64 } from "js-base64";
import { type Metadata } from "next";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { HighlightText } from "@/components/HighlightText";
import { NoDataImage } from "@/components/img/NoDataImage";
import { Box, Container, Grid, GridCol } from "@/dsfr";
import { H2, Text } from "@/dsfr/base/typography";
import { getSolutionsParCriteres } from "@/lib/server/useCases/getSolutionsParCriteres";
import { fetchBAN } from "@/lib/services/ban";
import { fetchFcuEligibility } from "@/lib/services/fcu";

import { sharedMetadata } from "../../shared-metadata";
import { simulationSchema } from "../schema";
import { CardRcu } from "./CardRcu";
import { DebugButton } from "./DebugButton";
import { Evaluation } from "./Evaluation";
import { FranceRenovBlock } from "./FranceRenovBlock";
import { familleImageMap, typeMap } from "./helper";
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

const ResultatsPage = async ({ searchParams }: { searchParams: { complet: "non" | "oui"; hash: string } }) => {
  if (!searchParams.hash) throw new Error("Le hash est manquant");

  const complet = searchParams.complet === "oui";

  const unparsedFormData: unknown = JSON.parse(Base64.decode(searchParams.hash));
  const formData = simulationSchema.safeParse(unparsedFormData);

  if (!formData.success) {
    const errors = formData.error.format();
    throw new Error(`Erreur de formatage du hash ${JSON.stringify(errors)}`);
  }

  const [baseSolutions, adresses] = await Promise.all([
    getSolutionsParCriteres(formData.data),
    fetchBAN(formData.data.adresse),
  ]);

  const {
    geometry: { coordinates },
  } = adresses.features[0];

  const [lon, lat] = coordinates;

  const { isEligible: isRcuEligible } = await fetchFcuEligibility({ lon, lat });

  const solutions = baseSolutions.data.map(solution => {
    return { ...catalogueSolutions[solution.id], ...solution };
  });

  const nbSolutions = solutions.length + (isRcuEligible ? 1 : 0);

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
          Solutions compatibles
          <DebugButton formData={formData} solutions={solutions} />
        </H2>

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
                    <Box className={fr.cx("fr-mt-2w")}>
                      <Text>{solution.description}</Text>
                    </Box>

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
                      href: `/solutions/${solution.id}?noteCout=${solution.cout.note}&noteDifficulte=${solution.difficulte.note}&noteTravauxCollectif=${solution.travauxCollectif.note}&noteTravauxIndividuel=${solution.travauxIndividuel.note}`,
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
