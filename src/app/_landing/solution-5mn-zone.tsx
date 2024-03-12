import { cx } from "@codegouvfr/react-dsfr/tools/cx";

import { Card } from "@/components/Card";
import { Box, Container, Grid, GridCol } from "@/dsfr";
import { H2 } from "@/dsfr/base/typography";

import styles from "./solution-5mn-zone.module.scss";

export const Solution5mnZone = () => {
  return (
    <Box className={cx(styles.cards)}>
      <Container>
        <H2 mt="16w">La solution qui vous correspond en moins de 5min</H2>

        <Grid haveGutters>
          <GridCol base={4}>
            <Card
              border
              shadow
              desc="Répondez à seulement quelques questions."
              imageAlt="texte alternatif de l’image"
              imageUrl="/img/questionnaire.svg"
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
              imageUrl="/img/crayon.svg"
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
              imageUrl="/img/comprehensible.svg"
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
