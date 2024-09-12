import { type Metadata } from "next";

import { Wizard } from "@/components/Wizard";

import { sharedMetadata } from "../../shared-metadata";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { Step5 } from "./Step5";
import { Step6 } from "./Step6";
import { Step7 } from "./Step7";
import { Step8 } from "./Step8";
import { Step9 } from "./Step9";
import { Step10 } from "./Step10";
import { Step11 } from "./Step11";

const title = "Étapes simulation";
const description = "Étapes simulation";
const url = "/simulation/etapes";

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

const SimulationPage = () => {
  return (
    // With flex, we can use justify-between to approximatively align the footer at the bottom of the page
    <div className="flex flex-col justify-start w-[288px] sm:w-[400px] md:w-[600px] xl:w-[800px]">
      {/* MatomoPush causes a bug in Chrome when used here. I don't know why. */}
      {/* <MatomoPush event={["trackEvent", matomoCategory.formulaire, "Clic Commencer", "Commencer"]} /> */}

      {/* <Wizard startIndex={10}> */}
      <Wizard>
        <Step1 />
        <Step2 />
        <Step3 />
        <Step4 />
        <Step5 />
        <Step6 />
        <Step7 />
        <Step8 />
        <Step9 />
        <Step10 />
        <Step11 />
      </Wizard>
    </div>
  );
};

export default SimulationPage;
