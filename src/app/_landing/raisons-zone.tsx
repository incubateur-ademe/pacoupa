import { HCard } from "@/components/HCard";
import { ChaudiereCasseeImage } from "@/components/img/ChaudiereCasseeImage";
import { MonnaieImage } from "@/components/img/MonnaieImage";
import { SoleilImage } from "@/components/img/SoleilImage";
import { Container, Grid, GridCol } from "@/dsfr";
import { H2 } from "@/dsfr/base/typography";

import styles from "./raisons-zone.module.scss";

export const RaisonsZone = () => {
  return (
    <div className={styles.cards}>
      <Container>
        <H2>On a tous une bonne raison</H2>

        <Grid>
          <GridCol base={12}>
            <HCard
              title="Chaudière en panne&nbsp;?"
              desc="C’est le bon moment pour vous renseigner sur les solutions durables, spécifiquement adaptées à votre immeuble."
              image={<ChaudiereCasseeImage width={100} />}
            />
          </GridCol>
        </Grid>

        <Grid className="mt-8">
          <GridCol base={12} offsetMd={2}>
            <HCard
              title="Facture trop élevée&nbsp;?"
              desc="Les solutions “renouvelables” sont souvent moins gourmandes, et donc moins exposées aux augmentations de prix."
              image={<MonnaieImage width={100} />}
            />
          </GridCol>
        </Grid>

        <Grid className="mt-8">
          <GridCol base={12} offsetMd={4}>
            <HCard
              desc="Réseau de chaleur ? pompe à chaleur ? solaire thermique ? biomasse ? Késako ? Les solutions sont nombreuses, laissez nous vous guider pas à pas."
              title="Envie de passer au vert&nbsp;?"
              image={<SoleilImage width={100} />}
            />
          </GridCol>
        </Grid>
      </Container>
    </div>
  );
};
