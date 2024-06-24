import { fr } from "@codegouvfr/react-dsfr";
import { type Metadata } from "next";

import { Button } from "@/components/Button";
import { ButtonsWrapper } from "@/components/ButtonsWrapper";
import { CalloutPacoupa } from "@/components/CalloutPacoupa";
import { Maison2Image } from "@/components/img/Maison2";
import { Grid, GridCol, P } from "@/dsfr";
import { H1 } from "@/dsfr/base/typography";

import { sharedMetadata } from "../shared-metadata";

const title = "Simulation";
const description = "Début de la simulation";
const url = "/simulation";

export const metadata: Metadata = {
  ...sharedMetadata,
  title,
  description,
  openGraph: {
    ...sharedMetadata.openGraph,
    title,
    description,
    url,
  },
  alternates: {
    canonical: url,
  },
};

const SimulationLandingPage = () => {
  return (
    <>
      <H1 className={fr.cx("fr-mt-4w")}>👋 Bienvenue</H1>

      <Grid>
        <GridCol base={4} className="">
          <Maison2Image width={300} />
        </GridCol>
      </Grid>

      <P>
        L’objectif de ce simulateur est de vous proposer <strong>la meilleure solution</strong> de chauffage{" "}
        <strong>adaptée</strong> à votre copropriété.
      </P>

      <P>
        En moins de <strong>3 minutes</strong>, découvrez les systèmes de chauffage compatibles avec votre logement.
      </P>

      <CalloutPacoupa>
        Les informations que nous allons vous demander sont <strong>anonymes</strong> et ne sont{" "}
        <strong>pas stockées</strong>.
      </CalloutPacoupa>

      <ButtonsWrapper align="right">
        <Button
          linkProps={{
            href: "./simulation/etapes",
          }}
        >
          Commencer
        </Button>
      </ButtonsWrapper>
    </>
  );
};

export default SimulationLandingPage;
