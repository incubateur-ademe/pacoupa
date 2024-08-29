import { type Metadata } from "next";

import { config } from "@/config";

import { DecarbonnonsZone } from "./_landing/decarbonnons-zone";
import { ExplicationPacZone } from "./_landing/explication-pac-zone";
import { LandingHero } from "./_landing/hero";
import { LaisserGuider } from "./_landing/laisser-guider-zone";
import { RaisonsZone } from "./_landing/raisons-zone";
import { Solution5mnZone } from "./_landing/solution-5mn-zone";
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
    // <div className="flex flex-col mt-6 md:mt-12 gap-12 md:gap-24">
    <>
      <section className="col-start-2">
        <LandingHero />
      </section>

      {/* <section mt="14w">
        <LogosZone />
      </section> */}

      <section className="col-start-2">
        <RaisonsZone />
      </section>

      <section className="col-start-1 col-span-3">
        <ExplicationPacZone />
      </section>

      <section className="col-start-2">
        <LaisserGuider />
      </section>

      <section className="col-start-2">
        <Solution5mnZone />
      </section>

      <section className="col-start-2">
        <DecarbonnonsZone />
      </section>
    </>
  );
};

export default Home;
