import { type Metadata } from "next";

import { config } from "@/config";

import { ExplicationPacZone } from "./_landing/explication-pac-zone";
import { LandingHero } from "./_landing/hero";
import { RaisonsZone } from "./_landing/raisons-zone";
import { sharedMetadata } from "./shared-metadata";

const title = `Accueil - ${config.name}`;
const url = "/";

export const metadata: Metadata = {
  ...sharedMetadata,
  title,
  openGraph: {
    ...sharedMetadata.openGraph,
    title,
    url,
  },
  alternates: {
    canonical: url,
  },
};

const Home = () => {
  // if (config.env === "prod") {
  //   return <ErrorDisplay code="construction" noRedirect />;
  // }

  return (
    <>
      <section className="mt-8 md:mt-16">
        <LandingHero />
      </section>

      {/* <section mt="14w">
        <LogosZone />
      </section> */}

      <section className="mt-12 md:mt-20">
        <RaisonsZone />
      </section>

      <section className="mt-12 md:mt-20">
        <ExplicationPacZone />
      </section>

      {/*<section className="mt-32">
        <LaisserGuider />
      </section>

      <section className="mt-12">
        <Solution5mnZone />
      </section>

      <section className="mt-12">
        <DecarbonnonsZone />
      </section> */}
    </>
  );
};

export default Home;
