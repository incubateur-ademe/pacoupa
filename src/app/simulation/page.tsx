import { Button } from "@/components/Button";
import { ButtonsWrapper } from "@/components/ButtonsWrapper";
import { Maison2Image } from "@/components/img/Maison2";
import { Grid, GridCol, P } from "@/dsfr";
import { H1 } from "@/dsfr/base/typography";

const SimulationLandingPage = () => {
  return (
    <>
      <H1>👋 Bienvenue</H1>

      <P>
        Découvrez les systèmes de chauffage <strong>compatibles</strong> avec votre logement en seulement{" "}
        <strong>10 questions</strong>.
      </P>

      <Grid>
        <GridCol base={4} className="">
          <Maison2Image width={300} />
        </GridCol>
      </Grid>

      <ButtonsWrapper align="right">
        <Button
          linkProps={{
            href: "./simulation/etapes",
          }}
        >
          Commencer
        </Button>
      </ButtonsWrapper>
    </>
  );
};

export default SimulationLandingPage;
