import { fr } from "@codegouvfr/react-dsfr";
import { Badge } from "@codegouvfr/react-dsfr/Badge";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { Base64 } from "js-base64";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Box, Container, Grid, GridCol } from "@/dsfr";
import { H4, Text } from "@/dsfr/base/typography";
import { getSolutionsParCriteres } from "@/lib/server/useCases/getSolutionsParCriteres";

import { simulationSchema } from "../schema";
import { createRecommandations, labelForType } from "./helper";

const ResultatsPage = async ({ searchParams }: { searchParams: { hash: string } }) => {
  if (!searchParams.hash) throw new Error("Le hash est manquant");

  const unparsedFormData: unknown = JSON.parse(Base64.decode(searchParams.hash));
  const formData = simulationSchema.safeParse(unparsedFormData);

  if (!formData.success) {
    const errors = formData.error.format();
    throw new Error(`Erreur de formatage du hash ${JSON.stringify(errors)}`);
  }

  const solutions = await getSolutionsParCriteres(formData.data);

  return (
    <>
      <Container className={fr.cx("fr-mt-4w")}>
        <Grid>
          <GridCol sm={8} xl={6}>
            <Card
              desc={formData.data.adresse}
              enlargeLink
              horizontal
              linkProps={{
                href: "/simulation/etapes",
              }}
              size="small"
              // title="Intitulé de la carte (sur lequel se trouve le lien)"
              title=""
              titleAs="h3"
              end={<>Modifier</>}
            />
          </GridCol>
        </Grid>
      </Container>

      <Container className={fr.cx("fr-mt-4w")}>
        <H4>Solutions compatibles</H4>

        <Text>
          Nous avons trouvé <strong>{solutions.data.length} solutions</strong> de chauffage adaptées à votre bâtiment.
        </Text>

        <Box className={cx("flex gap-8 flex-col xl:flex-row")}>
          {solutions.data.slice(0, 3).map(solution => (
            <Card
              key={solution.id}
              desc={
                <>
                  {
                    <>
                      <Box>
                        <Badge>{labelForType(solution.type)}</Badge>
                      </Box>
                      <Box>
                        <Box>Score env: {solution.noteEnvironnemental}</Box>
                        <Box>Coût: {solution.noteCout}</Box>
                        <Box>Difficulté: {solution.noteDifficulte}</Box>
                        <Box>Order: {solution.ordre}</Box>
                      </Box>
                      <Box className={fr.cx("fr-mt-6w")}>
                        <Text>{solution.descriptionSolution}</Text>
                      </Box>

                      <span className={fr.cx("fr-text--bold")}>Recommandé pour</span>
                      <Box className={cx("flex", "justify-start", "gap-4", "fr-mt-1w")}>
                        {createRecommandations(solution).map((recommandation, index) => (
                          <Badge key={index} severity="info">
                            {recommandation}
                          </Badge>
                        ))}
                      </Box>
                    </>
                  }
                </>
              }
              enlargeLink
              horizontal
              linkProps={{
                href: `/solutions/${solution.id}`,
              }}
              size="small"
              // title="Intitulé de la carte (sur lequel se trouve le lien)"
              title={solution.name}
              titleAs="h3"
              end={<>En savoir plus</>}
            />
          ))}
        </Box>
        <Box className={cx("flex", fr.cx("fr-mt-4w"))}>
          <Button priority="tertiary" className={cx("grow", "md:grow-0", "justify-center")}>
            Voir d’autres solutions
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default ResultatsPage;
