"use client";

import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { useWizard } from "react-use-wizard";

import { Box, P } from "@/dsfr";

import { HeaderFunnel } from "../HeaderFunnel";
import { AucuneRenovationImage } from "./AucuneRenovationImage";
import { RenovationGlobaleImage } from "./RenovationGlobaleImage";
import { RenovationsPartiellesImage } from "./RenovationsPartiellesImage";

export const Step3 = () => {
  const { handleStep, previousStep, nextStep } = useWizard();

  return (
    <Box>
      <HeaderFunnel />
      <P>
        Quelles <strong>rénovations</strong> ont été effectuées sur votre bâtiment ?
      </P>

      <Box>
        <RadioButtons
          // legend="Légende pour l’ensemble de champs"
          name="radio"
          options={[
            {
              illustration: <AucuneRenovationImage />,
              label: "Pas de rénovation",
              nativeInputProps: {
                value: "aucune rénovation",
              },
            },
            {
              illustration: <RenovationsPartiellesImage />,
              label: "Partielles",
              hintText: "Toiture ou murs ou double vitrage, ...",
              nativeInputProps: {
                value: "rénovations partielles",
              },
            },
            {
              illustration: <RenovationGlobaleImage />,
              label: "Globale",
              hintText: "Toiture, murs, double vitrage et plancher bas",
              nativeInputProps: {
                value: "rénovation globale",
              },
            },
          ]}
          // state="default"
          stateRelatedMessage=""
        />
      </Box>
    </Box>
  );
};
