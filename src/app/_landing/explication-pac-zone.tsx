import { fr } from "@codegouvfr/react-dsfr";

import { HesitationImage } from "@/components/img/HesitationImage";
import { UnderlineText } from "@/components/UnderlineText";
import { Box, Container, Grid, GridCol } from "@/dsfr";
import { H2 } from "@/dsfr/base/typography";

import styles from "./explication-pac-zone.module.scss";

export const ExplicationPacZone = () => {
  return (
    <>
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
                Et pourquoi pas une <UnderlineText>pompe à chaleur</UnderlineText> ?
                <br />
                Ou un raccordement au <UnderlineText>réseau de chaleur urbain</UnderlineText> ?
              </p>
            </Box>
          </GridCol>
        </Grid>
      </Container>
    </>
  );
};
