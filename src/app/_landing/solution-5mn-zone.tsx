import Card from "@codegouvfr/react-dsfr/Card";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";

import { Box, Container, Grid, GridCol } from "@/dsfr";
import { H3 } from "@/dsfr/base/typography";

import styles from "./solution-5mn-zone.module.scss";

export const Solution5mnZone = () => {
  return (
    <Box className={cx(styles.cards)}>
      <Container>
        <H3 mt="10w">La solution qui vous correspond en moins de 5min</H3>

        <Grid haveGutters>
          <GridCol base={4}>
            <Card
              border
              shadow
              desc="Répondez à seulement quelques questions."
              imageAlt="texte alternatif de l’image"
              // imageUrl="/img/chaudiere-cassee.svg"
              size="small"
              title="Simple"
              titleAs="h4"
            />
          </GridCol>

          <GridCol base={4}>
            <Card
              border
              shadow
              desc="Déterminez la solution faites pour votre copropriété."
              imageAlt="texte alternatif de l’image"
              // imageUrl="/img/chaudiere-cassee.svg"
              size="small"
              title="Personnalisée"
              titleAs="h4"
            />
          </GridCol>

          <GridCol base={4}>
            <Card
              border
              shadow
              desc="Bénéficiez de conseils d’experts accessibles pour tous."
              imageAlt="texte alternatif de l’image"
              // imageUrl="/img/chaudiere-cassee.svg"
              size="small"
              title="Compréhensible"
              titleAs="h4"
            />
          </GridCol>
        </Grid>
      </Container>
    </Box>
  );
};
