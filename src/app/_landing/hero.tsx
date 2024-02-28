import HeroTitleContent, { metadata as heroMetadata } from "@__content/landing/hero_title.mdx";
import Button from "@codegouvfr/react-dsfr/Button";

import { CTA } from "@/app/CTA";
import { Container, Grid, GridCol } from "@/dsfr";

import { HeroImage } from "./HeroImage";

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
      <GridCol base={6} className="">
        <HeroTitleContent />
        {/* <HeroBlocContent /> */}
        <CTA source={cta?.source ?? DEFAULT_CTA_SOURCE} title={cta?.title} href={cta?.href}>
          {cta?.title}
        </CTA>
        <Button priority="tertiary">Parcourir les solutions</Button>
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
      <GridCol base={10} offset={1}>
        <HeroImage />
      </GridCol>
      <GridCol>{/* <HeroBlocContent /> */}</GridCol>
    </Grid>
    <CTA source={cta?.source ?? DEFAULT_CTA_SOURCE} title={cta?.title} href={cta?.href} asGroup>
      {cta?.title} xxxxxx
    </CTA>
  </Container>
);
