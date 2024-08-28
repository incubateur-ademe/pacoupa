import { type Metadata } from "next";

import { Button } from "@/components/Button";
import { ButtonsWrapper } from "@/components/ButtonsWrapper";
import { Callout } from "@/components/Callout";
import { Maison2Image } from "@/components/img/Maison2";
import { Container } from "@/dsfr";
import { Text } from "@/dsfr/base/typography";

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
    <div className="max-w-[800px]">
      <Container>
        <div className="my-8 flex justify-center items-center">
          <div className="max-w-[239px]">
            <Maison2Image />
          </div>
        </div>

        <Text>
          En seulement 11 questions, ce simulateur vous propose <strong>la meilleure solution</strong> de chauffage{" "}
          <strong>adaptée</strong> à votre copropriété
        </Text>

        <Callout
          type="pacoupa"
          content={
            <Text className="mb-0">
              Les informations que nous allons vous demander sont <strong>anonymes</strong> et ne sont{" "}
              <strong>pas stockées</strong>.
            </Text>
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
      </Container>
    </div>
  );
};

export default SimulationLandingPage;
