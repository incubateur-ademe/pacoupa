import { type Metadata } from "next";

import { ErrorDisplay } from "@/components/ErrorDisplay";
import { config } from "@/config";
import { Section } from "@/dsfr";

import { DecarbonnonsZone } from "./_landing/decarbonnons-zone";
import { ExplicationPacZone } from "./_landing/explication-pac-zone";
import { LandingHero } from "./_landing/hero";
import { LaisserGuider } from "./_landing/laisser-guider-zone";
import { LogosZone } from "./_landing/logos-zone";
import { RaisonsZone } from "./_landing/raisons-zone";
import { Solution5mnZone } from "./_landing/solution-5mn-zone";
import { sharedMetadata } from "./shared-metadata";

const url = "/";

export const metadata: Metadata = {
  ...sharedMetadata,
  openGraph: {
    ...sharedMetadata.openGraph,
    url,
  },
  alternates: {
    canonical: url,
  },
};

const Home = () => {
  if (config.env === "prod") {
    return <ErrorDisplay code="construction" noRedirect />;
  }

  return (
    <>
      <Section mt="8w">
        <LandingHero />
      </Section>

      <Section mt="8w">
        <LogosZone />
      </Section>

      <Section mt="8w">
        <RaisonsZone />
      </Section>

      <Section mt="8w">
        <ExplicationPacZone />
      </Section>

      <Section mt="8w">
        <LaisserGuider />
      </Section>

      <Section mt="8w">
        <Solution5mnZone />
      </Section>

      <Section mt="8w">
        <DecarbonnonsZone />
      </Section>
    </>
  );
};

export default Home;
