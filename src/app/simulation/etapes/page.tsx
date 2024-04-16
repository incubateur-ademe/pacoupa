"use client";

import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { useRef } from "react";

import { AnimatedStep } from "@/components/AnimatedStep";
import { Wizard } from "@/components/Wizard";
import { Box } from "@/dsfr";

import styles from "./page.module.scss";
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

const SimulationPage = () => {
  const previousStep = useRef<number>(0);

  return (
    // With flex, we can use justify-between to approximatively align the footer at the bottom of the page
    <Box className={cx(styles.wizard, "flex flex-col justify-between")}>
      {/* <Wizard startIndex={10}> */}
      <Wizard>
        <AnimatedStep previousStep={previousStep}>
          <Step1 />
        </AnimatedStep>
        <AnimatedStep previousStep={previousStep}>
          <Step2 />
        </AnimatedStep>
        <AnimatedStep previousStep={previousStep}>
          <Step3 />
        </AnimatedStep>
        <AnimatedStep previousStep={previousStep}>
          <Step4 />
        </AnimatedStep>
        <AnimatedStep previousStep={previousStep}>
          <Step5 />
        </AnimatedStep>
        <AnimatedStep previousStep={previousStep}>
          <Step6 />
        </AnimatedStep>
        <AnimatedStep previousStep={previousStep}>
          <Step7 />
        </AnimatedStep>
        <AnimatedStep previousStep={previousStep}>
          <Step8 />
        </AnimatedStep>
        <AnimatedStep previousStep={previousStep}>
          <Step9 />
        </AnimatedStep>
        <AnimatedStep previousStep={previousStep}>
          <Step10 />
        </AnimatedStep>
        <AnimatedStep previousStep={previousStep}>
          <Step11 />
        </AnimatedStep>
      </Wizard>
    </Box>
  );
};

export default SimulationPage;
