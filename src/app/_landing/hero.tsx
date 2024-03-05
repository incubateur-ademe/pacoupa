import HeroTitleContent, { metadata as heroMetadata } from "@__content/landing/hero_title.mdx";
import Button from "@codegouvfr/react-dsfr/Button";

import { CTA } from "@/components/CTA";
import { Box, Container, Grid, GridCol } from "@/dsfr";

import { HeroImage } from "../../components/img/HeroImage";
import styles from "./hero.module.scss";

const DEFAULT_CTA_SOURCE = "hero";

export interface LandingHeroProps {
  metadata: PacoupaHeroMDXMetadata;
}

export const LandingHero = () => (
  <>
    <LandingHeroMobile metadata={heroMetadata} />
    <LandingHeroDesktop metadata={heroMetadata} />
  </>
);

const LandingHeroDesktop = ({ metadata: { cta } = {} }: LandingHeroProps) => (
  <Container className="hidden md:flex">
    <Grid haveGutters>
      <GridCol base={6}>
        <HeroTitleContent />
        <Box className={styles.cta}>
          <CTA source={cta?.source ?? DEFAULT_CTA_SOURCE} title={cta?.title} href={cta?.href}>
            {cta?.title}
          </CTA>
          <Button
            priority="secondary"
            linkProps={{
              href: "/solutions",
            }}
            // style={{ borderBottom: "1px solid #183D2F" }}
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

const LandingHeroMobile = ({ metadata: { cta } = {} }: LandingHeroProps) => (
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
    <CTA source={cta?.source ?? DEFAULT_CTA_SOURCE} title={cta?.title} href={cta?.href} asGroup>
      {cta?.title}
    </CTA>
  </Container>
);
