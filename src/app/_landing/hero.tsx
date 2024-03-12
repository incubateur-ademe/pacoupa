"use client";

import HeroTitleContent from "@__content/landing/hero_title.mdx";

import { Button } from "@/components/Button";
import { TallyButton } from "@/components/TallyButton";
import { Box, Container, Grid, GridCol } from "@/dsfr";

import { HeroImage } from "../../components/img/HeroImage";
import styles from "./hero.module.scss";

export interface LandingHeroProps {
  metadata: PacoupaHeroMDXMetadata;
}

export const LandingHero = () => (
  <>
    <LandingHeroMobile />
    <LandingHeroDesktop />
  </>
);

const LandingHeroDesktop = () => (
  <Container className="hidden md:flex">
    <Grid haveGutters>
      <GridCol base={6}>
        <HeroTitleContent />
        <Box className={styles.cta}>
          <TallyButton source="Premier bouton Tally" />

          <Button
            priority="secondary"
            linkProps={{
              href: "/solutions",
            }}
          >
            Parcourir les solutions
          </Button>
        </Box>
      </GridCol>
      <GridCol base={6} className="fr-mx-auto">
        <HeroImage />
      </GridCol>
    </Grid>
  </Container>
);

const LandingHeroMobile = () => (
  <Container className="md:hidden">
    <Grid haveGutters>
      <GridCol>
        <HeroTitleContent />
      </GridCol>
    </Grid>
    <Grid haveGutters>
      <GridCol base={10} offset={1}>
        <HeroImage />
      </GridCol>
      <GridCol>{/* <HeroBlocContent /> */}</GridCol>
    </Grid>

    <TallyButton source="Premier bouton Tally" />
  </Container>
);
