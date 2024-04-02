import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { useWizard } from "react-use-wizard";

import { Box, P } from "@/dsfr";

import { HeaderFunnel } from "../HeaderFunnel";

export const Step9 = () => {
  const { handleStep, previousStep, nextStep } = useWizard();

  return (
    <Box>
      <HeaderFunnel />

      <P>Vous vous chauffez grâce à...</P>

      <Box>
        <RadioButtons
          // legend="Légende pour l’ensemble de champs"
          name="radio"
          options={[
            {
              label: "Des radiateurs",
              nativeInputProps: {
                value: "radiateurs",
              },
            },
            {
              label: "Un plancher chauffant",
              nativeInputProps: {
                value: "plancher chauffant",
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
