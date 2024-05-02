import { fr } from "@codegouvfr/react-dsfr";

import { CTA } from "@/components/CTA";
import { PlanteImage } from "@/components/img/PlanteImage";
import { Container, Grid, GridCol } from "@/dsfr";
import { H2 } from "@/dsfr/base/typography";

export const LaisserGuider = () => {
  return (
    <>
      <Container>
        <Grid className={fr.colors.decisions.text.actionHigh.redMarianne.default} valign="middle">
          <GridCol base={6} className={"flex flex-col justify-center content-center"}>
            <H2>Laissez-vous guider</H2>
            <p>
              Ce simulateur détermine, selon les caractéristiques de votre immeuble, les différents types de chauffage
              et leur pertinence écologique et économique.
            </p>

            <CTA source="landing" />
          </GridCol>

          <GridCol base={6} className={"flex justify-center items-center"}>
            <PlanteImage width={350} />
          </GridCol>
        </Grid>
      </Container>
    </>
  );
};
