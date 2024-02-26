import { CTA } from "@/app/CTA";
import { ImgCard } from "@/components/img/ImgCard";
import { Container, Grid, GridCol } from "@/dsfr";

import { type MDXBlocProps } from "./blocs/type";

const DEFAULT_CTA_SOURCE = "hero";

export interface LandingHeroProps {
  blocComponent: MDXBlocProps["titleComponent"];
  metadata: CarteVerteHeroMDXMetadata;
  titleComponent: MDXBlocProps["titleComponent"];
}

export const LandingHero = ({
  blocComponent: bloc,
  titleComponent: title,
  metadata,
  mobile,
}: LandingHeroProps & { mobile?: boolean }) => (
  <>
    {mobile ? (
      <LandingHeroMobile metadata={metadata} blocComponent={bloc} titleComponent={title} />
    ) : (
      <LandingHeroDesktop metadata={metadata} blocComponent={bloc} titleComponent={title} />
    )}
  </>
);

const LandingHeroDesktop = ({
  blocComponent: Bloc,
  titleComponent: Title,
  metadata: { cta } = {},
}: LandingHeroProps) => (
  <Container className="hidden md:flex">
    <Grid haveGutters>
      <GridCol base={7} className="fr-my-auto">
        <Title />
        <Bloc />
        <CTA source={cta?.source ?? DEFAULT_CTA_SOURCE} title={cta?.title} href={cta?.href}>
          {cta?.title}
        </CTA>
      </GridCol>
      <GridCol base={5} className="fr-mx-auto">
        <ImgCard />
      </GridCol>
    </Grid>
  </Container>
);

const LandingHeroMobile = ({
  blocComponent: Bloc,
  titleComponent: Title,
  metadata: { cta } = {},
}: LandingHeroProps) => (
  <Container className="md:hidden">
    <Grid haveGutters>
      <GridCol>
        <Title />
      </GridCol>
      <GridCol base={10} offset={1}>
        <ImgCard />
      </GridCol>
      <GridCol>
        <Bloc />
      </GridCol>
    </Grid>
    <CTA source={cta?.source ?? DEFAULT_CTA_SOURCE} title={cta?.title} href={cta?.href} asGroup>
      {cta?.title}
    </CTA>
  </Container>
);
