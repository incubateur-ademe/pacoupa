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
                Et pourquoi pas une{" "}
                <strong className="pac">
                  <UnderlineText>pompe à chaleur</UnderlineText>{" "}
                  <span className={fr.cx("fr-icon--sm", "ri-information-line")} aria-hidden="true"></span> ?
                </strong>
                <br />
                Ou un raccordement au{" "}
                <strong className="rcu">
                  <UnderlineText>réseau de chaleur urbain</UnderlineText>{" "}
                  <span className={fr.cx("fr-icon--sm", "ri-information-line")} aria-hidden="true"></span> ?
                </strong>
              </p>
            </Box>
          </GridCol>
        </Grid>
      </Container>

      <Tooltip anchorSelect=".pac" place="top">
        Une pompe à chaleur est un dispositif thermodynamique capable de transférer la chaleur <br />
        d'un endroit à un autre, généralement utilisé pour chauffer ou refroidir un espace en exploitant <br />
        les différences de température entre deux milieux.
      </Tooltip>

      <Tooltip anchorSelect=".rcu" place="top">
        Le réseau de chaleur urbain est un système de distribution centralisé de chaleur produite <br />
        à partir de sources diverses telles que la biomasse, la géothermie, etc.. alimentant plusieurs <br />
        bâtiments dans une zone urbaine pour le chauffage et parfois le refroidissement.
      </Tooltip>
    </>
  );
};
