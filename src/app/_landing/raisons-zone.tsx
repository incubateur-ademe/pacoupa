import { fr } from "@codegouvfr/react-dsfr";

import { Card } from "@/components/Card";
import { ChaudiereCasseeImage } from "@/components/img/ChaudiereCasseeImage";
import { Box, Container, Grid, GridCol } from "@/dsfr";
import { H2, Text } from "@/dsfr/base/typography";

import styles from "./raisons-zone.module.scss";

export const RaisonsZone = () => {
  return (
    <Box className={styles.cards}>
      <Container>
        <H2 mt="10w">On a tous une bonne raison</H2>

        <Grid>
          <GridCol base={9}>
            <Box className={styles.box}>
              <Box className={styles.image}>
                <ChaudiereCasseeImage width={100} />
              </Box>
              <Box className={styles.text}>
                <H2>Chaudière en panne&nbsp;?</H2>
                <Text>
                  C’est le bon moment pour vous renseigner sur les solutions durables, spécifiquement adaptées à votre
                  immeuble.
                </Text>
              </Box>
            </Box>
          </GridCol>
        </Grid>

        <Grid className={fr.cx("fr-mt-4w")}>
          <GridCol base={9} offset={2}>
            <Card
              border
              shadow
              desc="Les solutions “renouvelables” sont souvent moins gourmandes, et donc moins exposées aux augmentations de prix."
              imageAlt="texte alternatif de l’image"
              imageUrl="/img/monnaie.svg"
              horizontal
              size="large"
              title="Facture trop élevée&nbsp;?"
              titleAs="h4"
            />
          </GridCol>
        </Grid>

        <Grid className={fr.cx("fr-mt-4w")}>
          <GridCol base={9} offset={4}>
            <Card
              border
              shadow
              desc="Réseau de chaleur ? pompe à chaleur ? solaire thermique ? biomasse ? Késako ? Les solutions sont nombreuses, laissez nous vous guider pas à pas."
              imageAlt="texte alternatif de l’image"
              imageUrl="/img/soleil.svg"
              horizontal
              size="small"
              title="Envie de passer au vert&nbsp;?"
              titleAs="h4"
            />
          </GridCol>
        </Grid>
      </Container>
    </Box>
  );
};
