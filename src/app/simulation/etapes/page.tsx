"use client";

import { Wizard } from "react-use-wizard";

import { Container } from "@/dsfr";

import { FooterFunnel } from "./FooterFunnel";
import { HeaderFunnel } from "./HeaderFunnel";
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
  return (
    <Container>
      <Wizard header={<HeaderFunnel />} footer={<FooterFunnel />}>
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
    </Container>
  );
};

export default SimulationPage;
