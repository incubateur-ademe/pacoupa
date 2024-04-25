import { fr } from "@codegouvfr/react-dsfr";
import { Badge } from "@codegouvfr/react-dsfr/Badge";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { Base64 } from "js-base64";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { HighlightText } from "@/components/HighlightText";
import { NoDataImage } from "@/components/img/NoDataImage";
import { Box, Container, Grid, GridCol } from "@/dsfr";
import { H4, Text } from "@/dsfr/base/typography";
import {
  getSolutionsParCriteres,
  type GetSolutionsParCriteresReturnType,
} from "@/lib/server/useCases/getSolutionsParCriteres";
import { fetchBAN } from "@/lib/services/ban";
import { fetchFcuEligibility } from "@/lib/services/fcu";

import { simulationSchema } from "../schema";
import { DebugButton } from "./DebugButton";
import {
  createRecommandations,
  imageForFamille,
  labelForType,
  noteCoutHelper,
  noteDifficulteHelper,
  noteEnvironmentHelper,
} from "./helper";
import { JaugeCoutlImage } from "./JaugeCoutlImage";
import { JaugeDifficulteImage } from "./JaugeDifficulteImage";
import { JaugeEnvironnementalImage } from "./JaugeEnvironnementalImage";
import { NouvelleSimulation } from "./NouvelleSimulation";
import { SyncStore } from "./SyncStore";

const rcuSolution = {
  id: "fcu",
  name: "RCU",
  familleSolution: "RCU",
  type: "COL",
  descriptionSolution:
    "Le réseau de chaleur fonctionne en acheminant de l'eau chaude à travers un réseau de canalisations souterraines.",
  noteCout: "A",
  noteDifficulte: "A",
  noteEnvironnemental: "A",
  usageCH: "Oui",
  usageECS: "Oui",
  usageFr: "Non",
} satisfies Partial<GetSolutionsParCriteresReturnType[number]>;

const ResultatsPage = async ({ searchParams }: { searchParams: { complet: "non" | "oui"; hash: string } }) => {
  if (!searchParams.hash) throw new Error("Le hash est manquant");

  const complet = searchParams.complet === "oui";

  const unparsedFormData: unknown = JSON.parse(Base64.decode(searchParams.hash));
  const formData = simulationSchema.safeParse(unparsedFormData);

  if (!formData.success) {
    const errors = formData.error.format();
    throw new Error(`Erreur de formatage du hash ${JSON.stringify(errors)}`);
  }

  const solutions = await getSolutionsParCriteres(formData.data);

  const adresses = (await fetchBAN(formData.data.adresse)).features;

  const {
    geometry: { coordinates },
  } = adresses[0];

  const [lon, lat] = coordinates;

  const rcuEligibility = await fetchFcuEligibility({ lon, lat });

  if (rcuEligibility.isEligible) {
    solutions.data = [rcuSolution as GetSolutionsParCriteresReturnType[number], ...solutions.data];
  }

  return (
    <>
      <SyncStore hash={searchParams.hash} />
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
              title=""
              titleAs="h3"
              end={<>Modifier</>}
            />
          </GridCol>
        </Grid>
      </Container>

      <Container className={fr.cx("fr-mt-4w")}>
        <H4>
          Solutions compatibles
          <DebugButton formData={formData} solutions={solutions.data} />
        </H4>

        <Box>
          {solutions.data.length === 0 ? (
            <Box>
              <Box className={cx("text-center", fr.cx("fr-my-8w"))}>
                <NoDataImage />
              </Box>
              <p>
                Nous n’avons trouvé <strong>aucune solution</strong> ENR compatible pour votre bâtiment.
              </p>
              <p>Vous pouvez cependant contacter France Renov’ pour plus d'informations sur la rénovation.</p>
            </Box>
          ) : (
            <>
              Nous avons trouvé{" "}
              <strong>
                <HighlightText>
                  {solutions.data.length} solution{solutions.data.length > 1 ? "s" : ""}
                </HighlightText>
              </strong>{" "}
              de chauffage adaptées à votre bâtiment.
            </>
          )}
        </Box>

        <Grid haveGutters className={fr.cx("fr-mt-3w")}>
          {solutions.data.slice(0, complet ? solutions.data.length : 3).map(solution => (
            <GridCol key={solution.id} base={12} sm={6} xl={4}>
              <Card
                desc={
                  <>
                    <Box className={fr.cx("fr-mt-3w", "fr-mb-1v")}>Impact écologique 🌿</Box>

                    <Box className={cx("flex", "justify-between", "items-center")}>
                      <strong>{noteEnvironmentHelper(solution.noteEnvironnemental).label}</strong>

                      <Box className={cx("flex")}>
                        {Array(noteEnvironmentHelper(solution.noteEnvironnemental).number)
                          .fill("")
                          .map((_elt, index) => (
                            <JaugeEnvironnementalImage key={index} height={16} width={16} />
                          ))}
                      </Box>
                    </Box>

                    <Box className={fr.cx("fr-mt-3w", "fr-mb-1v")}>Coût d’investissement 💰</Box>

                    <Box className={cx("flex", "justify-between", "items-center")}>
                      <strong>{noteCoutHelper(solution.noteCout).label}</strong>
                      <Box className={cx("flex")}>
                        {Array(noteCoutHelper(solution.noteCout).number)
                          .fill("")
                          .map((_elt, index) => (
                            <JaugeCoutlImage key={index} height={16} width={16} />
                          ))}
                      </Box>
                    </Box>

                    <Box className={fr.cx("fr-mt-3w", "fr-mb-1v")}>Difficulté mise en place 🚧</Box>

                    <Box className={cx("flex", "justify-between", "items-center")}>
                      <strong>{noteDifficulteHelper(solution.noteDifficulte).label}</strong>

                      <Box className={cx("flex")}>
                        {Array(noteDifficulteHelper(solution.noteDifficulte).number)
                          .fill("")
                          .map((_elt, index) => (
                            <JaugeDifficulteImage key={index} height={16} width={16} />
                          ))}
                      </Box>
                    </Box>

                    <Box className={fr.cx("fr-mt-6w")}>
                      <Text>{solution.descriptionSolution}</Text>
                    </Box>

                    <span className={fr.cx("fr-text--bold")}>Recommandé pour</span>
                    <Box className={cx("flex", "flex-wrap", "justify-start", "gap-4", "fr-mt-1w")}>
                      {createRecommandations(solution).map((recommandation, index) => (
                        <Badge key={index} severity={recommandation[1] || "error"}>
                          {recommandation[0]}
                        </Badge>
                      ))}
                    </Box>
                  </>
                }
                enlargeLink
                horizontal
                linkProps={{
                  href: `/solutions/${solution.id}`,
                }}
                size="small"
                title={
                  <Box className={cx("flex items-start gap-4")}>
                    <Box>{imageForFamille(solution.familleSolution)}</Box>
                    <Box>
                      <span className={cx("mb-0", fr.cx("fr-text--lg"))}>{solution.name}</span>
                      <br />
                      <Badge>{labelForType(solution.type)}</Badge>
                    </Box>
                  </Box>
                }
                titleAs="h3"
                end={<>En savoir plus</>}
              />
            </GridCol>
          ))}
        </Grid>
        {!complet && solutions.data.length > 3 && (
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

        <Grid>
          <GridCol className={fr.cx("fr-mt-6w")}>
            Préparez votre projet de rénovation sur <HighlightText>France Rénov’</HighlightText>.
          </GridCol>
        </Grid>

        <Button
          linkProps={{
            href: "https://france-renov.gouv.fr/preparer-projet/trouver-conseiller",
          }}
          className={fr.cx("fr-m-2w", "fr-mb-4w")}
        >
          Préparer mon projet
        </Button>
      </Container>
    </>
  );
};

export default ResultatsPage;
