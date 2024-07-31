import { type Metadata } from "next";

import { Button } from "@/components/Button";
import { ButtonsWrapper } from "@/components/ButtonsWrapper";
import { Callout } from "@/components/Callout";
import { Maison2Image } from "@/components/img/Maison2";
import { Grid, GridCol } from "@/dsfr";
import { H1, Text } from "@/dsfr/base/typography";

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
      <H1 className="mt-8">👋 Bienvenue</H1>

      <Grid>
        <GridCol base={4} className="">
          <Maison2Image width={300} />
        </GridCol>
      </Grid>

      <Text>
        En seulement 11 questions, ce simulateur vous propose <strong>la meilleure solution</strong> de chauffage{" "}
        <strong>adaptée</strong> à votre copropriété
      </Text>

      <Callout
        type="pacoupa"
        content={
          <>
            Les informations que nous allons vous demander sont <strong>anonymes</strong> et ne sont{" "}
            <strong>pas stockées</strong>.
          </>
        }
      />

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
