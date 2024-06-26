"use client";

import { ButtonsWrapper } from "@/components/ButtonsWrapper";
import { CTA } from "@/components/CTA";
import { Container, Grid, GridCol } from "@/dsfr";
import { H1 } from "@/dsfr/base/typography";

import { HeroImage } from "../../components/img/HeroImage";

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
        <H1>Trouvez la meilleure solution de chauffage écologique, adaptée à votre copropriété</H1>
        <ButtonsWrapper>
          <CTA source="landing" />

          {/* <Button
            priority="secondary"
            linkProps={{
              href: "/solutions",
            }}
          >
            Parcourir les solutions
          </Button> */}
        </ButtonsWrapper>
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
        <H1>Trouvez la meilleure solution de chauffage écologique, adaptée à votre copropriété</H1>
      </GridCol>
    </Grid>
    <Grid haveGutters>
      <GridCol base={10} offset={1}>
        <HeroImage />
      </GridCol>
    </Grid>

    <CTA source="landing" />
  </Container>
);
