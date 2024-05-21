"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Tooltip } from "react-tooltip";

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
            <HesitationImage width={450} />
          </GridCol>

          <GridCol base={6} className={fr.cx("fr-mt-6w")}>
            <Box>
              <H2>PAC, RCU: c'est quoi ?</H2>
              <p>Vous hésitez entre une chaudière à gaz ou des radiateurs électriques ?</p>
              <p className={styles.questions}>
                <strong className="pac">
                  Et pourquoi pas une <UnderlineText>pompe à chaleur</UnderlineText> (PAC){" "}
                  <span className={fr.cx("fr-icon--sm", "ri-information-line")} aria-hidden="true"></span>
                </strong>
                <br />
                <strong className="rcu">
                  ou un raccordement au <UnderlineText>réseau de chaleur urbain</UnderlineText> (RCU){" "}
                  <span className={fr.cx("fr-icon--sm", "ri-information-line")} aria-hidden="true"></span> ?
                </strong>
              </p>
            </Box>
          </GridCol>
        </Grid>
      </Container>

      {/* TODO: utiliser Material UI tooltip à la place */}
      <Tooltip anchorSelect=".pac" place="top">
        Une PAC est un système qui prélève de la chaleur dans une source froide (sol, air, nappe), <br />
        augmente son niveau de tempéraure et la restitue dans le bâtiment.
      </Tooltip>

      <Tooltip anchorSelect=".rcu" place="top">
        Un réseau de chaleur est un système de canalisations souterraines qui permettent d'acheminer <br />
        vers des bâtiments de la chaleur produite localement, avec une part d'énergies renouvelables <br />
        et de récupération (incinération des ordures ménagères, biomasse, géothermie...).
      </Tooltip>
    </>
  );
};
