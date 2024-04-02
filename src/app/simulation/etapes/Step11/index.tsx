import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { useWizard } from "react-use-wizard";

import { Box, P } from "@/dsfr";

export const Step11 = () => {
  const { handleStep, previousStep, nextStep } = useWizard();

  return (
    <>
      <P>
        Quel <strong>énergie principale</strong> utilisez-vous pour chauffer l’eau ?
      </P>

      <Box>
        <RadioButtons
          // legend="Légende pour l’ensemble de champs"
          name="radio"
          options={[
            {
              label: "Fioul",
              nativeInputProps: {
                value: "fioul",
              },
            },
            {
              label: "Gaz",
              nativeInputProps: {
                value: "gaz",
              },
            },
            {
              label: "Ballon électrique",
              nativeInputProps: {
                value: "ballon electrique",
              },
            },
          ]}
          // state="default"
          stateRelatedMessage=""
        />
      </Box>
    </>
  );
};
