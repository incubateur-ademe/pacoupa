import { fr } from "@codegouvfr/react-dsfr";

import { PlanteImage } from "@/components/img/PlanteImage";
import { TallyButton } from "@/components/TallyButton";
import { Container, Grid, GridCol, P } from "@/dsfr";
import { H2 } from "@/dsfr/base/typography";

export const LaisserGuider = () => {
  return (
    <>
      <Container>
        <Grid className={fr.colors.decisions.text.actionHigh.redMarianne.default} valign="middle">
          <GridCol base={6} className={"flex flex-col justify-center content-center"}>
            <P>
              <H2>Laissez-vous guider</H2>
              <p>
                Ce simulateur détermine, selon les caractéristiques de votre immeuble, les différents types de chauffage
                et leur pertinence écologique et économique.
              </p>

              <TallyButton />
            </P>
          </GridCol>

          <GridCol base={6} className={"flex justify-center items-center"}>
            <PlanteImage width={350} />
          </GridCol>
        </Grid>
      </Container>
    </>
  );
};
