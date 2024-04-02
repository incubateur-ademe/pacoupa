import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { useWizard } from "react-use-wizard";

import { Box, P } from "@/dsfr";

export const Step8 = () => {
  const { handleStep, previousStep, nextStep } = useWizard();

  return (
    <>
      <P>
        Quelle <strong>énergie principale</strong> utilisez-vous pour vous chauffer ?
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
              label: "Électricité",
              nativeInputProps: {
                value: "electricite",
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
