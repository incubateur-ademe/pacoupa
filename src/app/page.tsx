import { fr } from "@codegouvfr/react-dsfr";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { type Metadata } from "next";

import { AccelerateurAdemeImage } from "@/components/img/AccelerateurAdemeImage";
import { AdemeImage } from "@/components/img/AdemeImage";
import { BetaGouvImage } from "@/components/img/BetaGouvImage";
import { HesitationImage } from "@/components/img/HesitationImage";
import { MarianneImage } from "@/components/img/MarianneImage";
import { PlanteImage } from "@/components/img/PlanteImage";
import { config } from "@/config";
import { Box, Container, Grid, GridCol } from "@/dsfr";

import { LandingHero } from "./_landing/hero";
import { CTA } from "./CTA";
import { ErrorDisplay } from "./ErrorDisplay";
import styles from "./index.module.scss";
import { sharedMetadata } from "./shared-metadata";

const url = "/";
const DEFAULT_CTA_SOURCE = "hero";

export const metadata: Metadata = {
  ...sharedMetadata,
  openGraph: {
    ...sharedMetadata.openGraph,
    url,
  },
  alternates: {
    canonical: url,
  },
};

const Home = () => {
  if (config.env === "prod") {
    return <ErrorDisplay code="construction" noRedirect />;
  }

  return (
    <>
      <Box as="section" pb="4w" className={fr.cx("fr-pt-md-9w", "fr-pt-2w", "fr-mb-0")}>
        <LandingHero />
      </Box>

      <Box as="section" pb="4w" className={cx(styles.logos, fr.cx("fr-mt-md-4w", "fr-pt-2w", "fr-mb-0"))}>
        <MarianneImage />
        <AdemeImage />
        <BetaGouvImage />
        <AccelerateurAdemeImage />
      </Box>

      <Box as="section" className={fr.cx("fr-hr", "fr-mt-10w", "fr-pt-10w")}>
        <Container>
          <Grid className={fr.colors.decisions.text.actionHigh.redMarianne.default}>
            <GridCol base={6} className={"flex justify-center content-center"}>
              <HesitationImage width={350} />
            </GridCol>

            <GridCol base={6} className={"flex flex-col justify-center content-center"}>
              <Box>
                <h2>PAC, RCU: c'est quoi ?</h2>
                <p>Vous hésitez entre une chaudière à gaz ou des radiateurs électriques ?</p>
                <p>
                  Et pourquoi pas une <u>Pompe À Chaleur</u>
                  <br />
                  ou un raccordement au <u>Réseau de Chaleur Urbain</u> ?
                </p>
              </Box>
            </GridCol>
          </Grid>
        </Container>
      </Box>
      <Box as="section" className={fr.cx("fr-hr", "fr-mt-10w", "fr-pt-10w")}>
        <Container>
          <Grid className={fr.colors.decisions.text.actionHigh.redMarianne.default}>
            <GridCol base={6} className={"flex flex-col justify-center content-center"}>
              <Box>
                <h2>Quelles solutions écologiques pour votre immeuble ?</h2>
                <p>
                  Ce simulateur détermine, selon les caractéristiques de votre immeuble, les différents types de
                  chauffage et leur pertinence écologique et économique.
                </p>
                <CTA source={DEFAULT_CTA_SOURCE} title={"S'inscrire"} href="/mentions-legales">
                  S'inscrire
                </CTA>
              </Box>
            </GridCol>

            <GridCol base={6} className={"flex justify-center content-center"}>
              <PlanteImage width={350} />
            </GridCol>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
export default Home;
