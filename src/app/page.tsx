import { fr } from "@codegouvfr/react-dsfr";
import Card from "@codegouvfr/react-dsfr/Card";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { type Metadata } from "next";

import { AccelerateurAdemeImage } from "@/components/img/AccelerateurAdemeImage";
import { AdemeImage } from "@/components/img/AdemeImage";
import { BetaGouvImage } from "@/components/img/BetaGouvImage";
import { Camembert1Image } from "@/components/img/Camembert1";
import { Camembert2Image } from "@/components/img/Camembert2";
import { HesitationImage } from "@/components/img/HesitationImage";
import { Maison2Image } from "@/components/img/Maison2";
import { MarianneImage } from "@/components/img/MarianneImage";
import { PlanteImage } from "@/components/img/PlanteImage";
import { config } from "@/config";
import { Box, Container, Grid, GridCol, P, Section } from "@/dsfr";
import { H2, H3 } from "@/dsfr/base/typography";

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
      <Section pb="4w" ptmd="8w">
        <LandingHero />
      </Section>

      <Section pb="4w" pt="2w" mtmd="4w" mb="0" className={cx(styles.logos)}>
        <MarianneImage />
        <AdemeImage />
        <BetaGouvImage />
        <AccelerateurAdemeImage />
      </Section>

      <Container>
        <H2 mt="10w">On a tous une bonne raison</H2>

        <Section className={cx(styles.cards)}>
          <Grid haveGutters>
            <GridCol base={4}>
              <Card
                border
                shadow
                desc="C’est le bon moment pour vous renseigner sur les solutions durables, spécifiquement adaptées à votre immeuble."
                enlargeLink
                imageAlt="texte alternatif de l’image"
                // imageUrl="/img/chaudiere-cassee.svg"
                linkProps={{
                  href: "#",
                }}
                size="small"
                title="Chaudière en panne&nbsp;?"
                titleAs="h4"
              />
            </GridCol>

            <GridCol base={4}>
              <Card
                border
                shadow
                desc="Les solutions “renouvelables” sont souvent moins gourmandes, et donc moins exposées aux augmentations de prix."
                enlargeLink
                imageAlt="texte alternatif de l’image"
                // imageUrl="/img/chaudiere-cassee.svg"
                linkProps={{
                  href: "#",
                }}
                size="small"
                title="Facture trop élevée&nbsp;?"
                titleAs="h4"
              />
            </GridCol>

            <GridCol base={4}>
              <Card
                border
                shadow
                desc="Réseau de chaleur ? pompe à chaleur ? solaire thermique ? biomasse ? Késako ? Les solutions sont nombreuses, laissez nous vous guider pas à pas."
                enlargeLink
                imageAlt="texte alternatif de l’image"
                // imageUrl="/img/chaudiere-cassee.svg"
                linkProps={{
                  href: "#",
                }}
                size="small"
                title="Envie de passer au vert&nbsp;?"
                titleAs="h4"
              />
            </GridCol>
          </Grid>
        </Section>
      </Container>

      <Section className={fr.cx("fr-mt-8w")}>
        <Container className={styles.hesitation}>
          <Grid className={fr.colors.decisions.text.actionHigh.redMarianne.default}>
            <GridCol base={6} className={"flex justify-center content-center"}>
              <HesitationImage width={350} />
            </GridCol>

            <GridCol base={6} className={"flex flex-col justify-center content-center"}>
              <Box>
                <H2>PAC, RCU: c'est quoi ?</H2>
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
      </Section>

      <Section className={fr.cx("fr-mt-8w")}>
        <Container>
          <Grid className={fr.colors.decisions.text.actionHigh.redMarianne.default} valign="middle">
            <GridCol base={6} className={"flex flex-col justify-center content-center"}>
              <P>
                <H2>Laissez-vous guider</H2>
                <p>
                  Ce simulateur détermine, selon les caractéristiques de votre immeuble, les différents types de
                  chauffage et leur pertinence écologique et économique.
                </p>
                <CTA source={DEFAULT_CTA_SOURCE} title={"S'inscrire"} href="/mentions-legales">
                  S'inscrire
                </CTA>
              </P>
            </GridCol>

            <GridCol base={6} className={"flex justify-center items-center"}>
              <PlanteImage width={350} />
            </GridCol>
          </Grid>
        </Container>
      </Section>

      <Container>
        <H3 mt="10w">La solution qui vous correspond en moins de 5min</H3>

        <Section className={cx(styles.cards)}>
          <Grid haveGutters>
            <GridCol base={4}>
              <Card
                border
                shadow
                desc="Répondez à seulement quelques questions."
                enlargeLink
                imageAlt="texte alternatif de l’image"
                // imageUrl="/img/chaudiere-cassee.svg"
                linkProps={{
                  href: "#",
                }}
                size="small"
                title="Simple"
                titleAs="h4"
              />
            </GridCol>

            <GridCol base={4}>
              <Card
                border
                shadow
                desc="Déterminez la solution faites pour votre copropriété."
                enlargeLink
                imageAlt="texte alternatif de l’image"
                // imageUrl="/img/chaudiere-cassee.svg"
                linkProps={{
                  href: "#",
                }}
                size="small"
                title="Personnalisée"
                titleAs="h4"
              />
            </GridCol>

            <GridCol base={4}>
              <Card
                border
                shadow
                desc="Bénéficiez de conseils d’experts accessibles pour tous."
                enlargeLink
                imageAlt="texte alternatif de l’image"
                // imageUrl="/img/chaudiere-cassee.svg"
                linkProps={{
                  href: "#",
                }}
                size="small"
                title="Compréhensible"
                titleAs="h4"
              />
            </GridCol>
          </Grid>
        </Section>
      </Container>

      <Container>
        <H3 mt="10w">Décarbonons le bâtiment !</H3>

        <P>
          Nous devons décarboner les deux tiers de notre consommation d’énergie d’origine fossile et importée de l’autre
          bout du monde.
        </P>

        <Section mt="8w">
          <Container>
            <Grid haveGutters valign="top">
              <GridCol base={4} className={"flex flex-col justify-center content-center"}>
                <H3 as="h5">Le secteur du batiment en 2 chiffres</H3>

                <Maison2Image width={300} />
              </GridCol>

              <GridCol base={4} className={"flex flex-col items-center"}>
                <Camembert1Image width={150} />

                <p className={fr.cx("fr-text--sm")}>part de la consommations énergétiques françaises </p>

                <Camembert2Image width={150} />

                <p className={fr.cx("fr-text--sm")}>part des émissions nationales de gaz à effet de serre (GES)</p>
              </GridCol>

              <GridCol base={4} className={"flex flex-col justify-center content-center gap-6"}>
                <Card
                  border
                  shadow
                  desc={
                    <P>
                      Ces émissions sont principalement dues au chauffage et aux besoins thermiques (eau chaude
                      sanitaire, cuisson) qui reposent aujourd’hui encore{" "}
                      <strong>à plus de 50% sur des énergies fossiles</strong> (fioul, gaz fossile).
                    </P>
                  }
                  // imageUrl="/img/chaudiere-cassee.svg"
                  linkProps={{
                    href: "#",
                  }}
                  size="small"
                  title=""
                  titleAs="h4"
                />
                <Card
                  border
                  shadow
                  desc={
                    <>
                      <P>
                        Passer d’une énergie fossile à un vecteur décarboné devrait permettre d’abaisser{" "}
                        <strong>rapidement</strong> et <strong>très significativement</strong> les émissions de CO2.
                      </P>
                      <P>
                        Toutefois, les solutions ne sont pas universelles, pas toutes matures, et ne peuvent s’envisager
                        indépendamment de l’isolation et de la sobriété.
                      </P>

                      <CTA source={DEFAULT_CTA_SOURCE} title={"S'inscrire"} href="/mentions-legales">
                        S'inscrire
                      </CTA>
                    </>
                  }
                  // imageUrl="/img/chaudiere-cassee.svg"
                  linkProps={{
                    href: "#",
                  }}
                  size="small"
                  title=""
                  titleAs="h4"
                />
              </GridCol>
            </Grid>
          </Container>
        </Section>
      </Container>
    </>
  );
};

export default Home;
