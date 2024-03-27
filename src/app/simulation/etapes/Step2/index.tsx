import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { useWizard } from "react-use-wizard";

import { Button } from "@/components/Button";
import { Box, P } from "@/dsfr";

import { Batiment1946a1974Image } from "./Batiment1946a1974Image";
import { Batiment1975a1989Image } from "./Batiment1975a1989Image";
import { BatimentPost1990Image } from "./BatimentPost1990Image";
import { BatimentPre1945Image } from "./BatimentPre1945Image";

export const Step2 = () => {
  const { handleStep, previousStep, nextStep } = useWizard();

  return (
    <>
      <P>
        Quelle est <strong>l’année</strong> de construction du bâtiment ?
      </P>

      <Box>
        <RadioButtons
          // legend="Légende pour l’ensemble de champs"
          name="radio"
          options={[
            {
              illustration: <BatimentPre1945Image />,
              label: "Avant 1945",
              hintText: "Façade ornementée",
              nativeInputProps: {
                value: "pre-1945",
              },
            },
            {
              illustration: <Batiment1946a1974Image />,
              label: "Entre 1946 et 1974",
              hintText: "Utilisation du béton",
              nativeInputProps: {
                value: "1946-1974",
              },
            },
            {
              illustration: <Batiment1975a1989Image />,
              label: "Entre 1975 et 1989",
              hintText: "Les années HLM",
              nativeInputProps: {
                value: "1975-1989",
              },
            },
            {
              illustration: <BatimentPost1990Image />,
              label: "Après 1990",
              hintText: "Bâtiments modernes",
              nativeInputProps: {
                value: "post-1990",
              },
            },
          ]}
          // state="default"
          stateRelatedMessage=""
        />
      </Box>

      <Button priority="secondary">Je ne sais pas</Button>
    </>
  );
};
