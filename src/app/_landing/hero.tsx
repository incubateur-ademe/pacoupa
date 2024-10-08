"use client";

import { ButtonsWrapper } from "@/components/ButtonsWrapper";
import { CTA } from "@/components/CTA";
import { Grid, GridCol } from "@/dsfr";
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
  <div className="hidden md:flex">
    <Grid haveGutters>
      <GridCol base={6}>
        <H1>Trouvez la meilleure solution de chauffage écologique, adaptée à votre copropriété</H1>
        <ButtonsWrapper>
          <CTA eventName="Bouton haut" />

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
      <GridCol base={6} className="mx-auto">
        <HeroImage />
      </GridCol>
    </Grid>
  </div>
);

const LandingHeroMobile = () => (
  <div className="md:hidden">
    <Grid haveGutters>
      <GridCol>
        <H1>Trouvez la meilleure solution de chauffage écologique, adaptée à votre copropriété</H1>
      </GridCol>
    </Grid>

    <CTA eventName="Bouton haut" />

    <Grid haveGutters className="mt-8">
      <GridCol base={10} offset={1}>
        <HeroImage />
      </GridCol>
    </Grid>
  </div>
);
