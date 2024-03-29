import { fr } from "@codegouvfr/react-dsfr";

import { HCard } from "@/components/HCard";
import { ChaudiereCasseeImage } from "@/components/img/ChaudiereCasseeImage";
import { MonnaieImage } from "@/components/img/MonnaieImage";
import { SoleilImage } from "@/components/img/SoleilImage";
import { Box, Container, Grid, GridCol } from "@/dsfr";
import { H2 } from "@/dsfr/base/typography";

import styles from "./raisons-zone.module.scss";

export const RaisonsZone = () => {
  return (
    <Box className={styles.cards}>
      <Container>
        <H2 mt="10w">On a tous une bonne raison</H2>

        <Grid>
          <GridCol base={9}>
            <HCard
              title="Chaudière en panne&nbsp;?"
              desc="C’est le bon moment pour vous renseigner sur les solutions durables, spécifiquement adaptées à votre immeuble."
              image={<ChaudiereCasseeImage width={100} />}
            />
          </GridCol>
        </Grid>

        <Grid className={fr.cx("fr-mt-4w")}>
          <GridCol base={9} offset={2}>
            <HCard
              title="Facture trop élevée&nbsp;?"
              desc="Les solutions “renouvelables” sont souvent moins gourmandes, et donc moins exposées aux augmentations de prix."
              image={<MonnaieImage width={100} />}
            />
          </GridCol>
        </Grid>

        <Grid className={fr.cx("fr-mt-4w")}>
          <GridCol base={9} offset={4}>
            <HCard
              desc="Réseau de chaleur ? pompe à chaleur ? solaire thermique ? biomasse ? Késako ? Les solutions sont nombreuses, laissez nous vous guider pas à pas."
              title="Envie de passer au vert&nbsp;?"
              image={<SoleilImage width={100} />}
            />
          </GridCol>
        </Grid>
      </Container>
    </Box>
  );
};
