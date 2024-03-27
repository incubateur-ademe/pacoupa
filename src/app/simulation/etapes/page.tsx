"use client";

import { Wizard } from "react-use-wizard";

import { Container } from "@/dsfr";

import { FooterFunnel } from "./FooterFunnel";
import { HeaderFunnel } from "./HeaderFunnel";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";

const titles = [
  "Adresse du bâtiment",
  "Année de construction du bâtiment",
  "La rénovation du bâtiment",
  "Nombre de logements",
  "Espaces extérieurs communs",
  "Espaces extérieurs personnels",
  "Énergie principale de chauffage",
  "Émetteur de chauffage",
  "Énergie de production d’eau chaude",
  "Émetteur d’eau chaude",
];

const SimulationPage = () => {
  return (
    <Container>
      <Wizard header={<HeaderFunnel titles={titles} />} footer={<FooterFunnel />}>
        <Step1 />
        <Step2 />
        <Step3 />
        <Step4 />
      </Wizard>
    </Container>
  );
};

export default SimulationPage;
