import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { useWizard } from "react-use-wizard";

import { Box, P } from "@/dsfr";

import { GroupeImage } from "./GroupeImage";
import { PersonneImage } from "./PersonneImage";

export const Step7 = () => {
  const { handleStep, previousStep, nextStep } = useWizard();

  return (
    <>
      <P>S’agit-il d’un chauffage...</P>

      <Box>
        <RadioButtons
          // legend="Légende pour l’ensemble de champs"
          name="radio"
          options={[
            {
              illustration: <PersonneImage />,
              label: "Individuel",
              nativeInputProps: {
                value: "individuel",
              },
            },
            {
              illustration: <GroupeImage />,
              label: "Collectif",
              nativeInputProps: {
                value: "collectif",
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
