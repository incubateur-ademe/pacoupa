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
    <div className="flex flex-col mt-6 md:mt-12 gap-12 md:gap-24">
      <section>
        <LandingHero />
      </section>

      {/* <section mt="14w">
        <LogosZone />
      </section> */}

      <section>
        <RaisonsZone />
      </section>

      <section>
        <ExplicationPacZone />
      </section>

      <section>
        <LaisserGuider />
      </section>

      <section>
        <Solution5mnZone />
      </section>

      <section>
        <DecarbonnonsZone />
      </section>

      <div className="md:mb-30"></div>
    </div>
  );
};

export default Home;
