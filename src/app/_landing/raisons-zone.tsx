import Card from "@codegouvfr/react-dsfr/Card";

import { Box, Container, Grid, GridCol } from "@/dsfr";
import { H2 } from "@/dsfr/base/typography";

import styles from "./raisons-zone.module.scss";

export const RaisonsZone = () => {
  return (
    <Box className={styles.cards}>
      <Container>
        <H2 mt="10w">On a tous une bonne raison</H2>

        <Grid haveGutters>
          <GridCol base={4}>
            <Card
              border
              shadow
              desc="C’est le bon moment pour vous renseigner sur les solutions durables, spécifiquement adaptées à votre immeuble."
              imageAlt="texte alternatif de l’image"
              size="small"
              title="Chaudière en panne&nbsp;?"
              titleAs="h4"
            />
          </GridCol>

          <GridCol base={4}>
            <Card
              border
              shadow
              desc="Les solutions “renouvelables” sont souvent moins gourmandes, et donc moins exposées aux augmentations de prix."
              imageAlt="texte alternatif de l’image"
              // imageUrl="/img/chaudiere-cassee.svg"
              size="small"
              title="Facture trop élevée&nbsp;?"
              titleAs="h4"
            />
          </GridCol>

          <GridCol base={4}>
            <Card
              border
              shadow
              desc="Réseau de chaleur ? pompe à chaleur ? solaire thermique ? biomasse ? Késako ? Les solutions sont nombreuses, laissez nous vous guider pas à pas."
              imageAlt="texte alternatif de l’image"
              // imageUrl="/img/chaudiere-cassee.svg"
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
