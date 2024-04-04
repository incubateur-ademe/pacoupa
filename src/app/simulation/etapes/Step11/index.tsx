"use client";

import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { z } from "zod";

import { Box, P } from "@/dsfr";
import { store } from "@/lib/store";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";

const required_error = "Le type d'énergie pour chauffer l'eau est obligatoire";

const schema = z.object({
  energieECS: z.string({ required_error }).min(1, required_error),
});

export const Step11 = () => {
  const initialState = store.get();

  return (
    <Box>
      <HeaderFunnel />

      <P>
        Quel <strong>énergie principale</strong> utilisez-vous pour chauffer l’eau ?
      </P>

      <WizardForm
        schema={schema}
        render={({ errors }) => (
          <Box>
            <RadioButtons
              // legend="Légende pour l’ensemble de champs"
              name="energieECS"
              options={[
                {
                  label: "Fioul",
                  nativeInputProps: {
                    defaultChecked: initialState.energieECS === "fioul",
                    value: "fioul",
                  },
                },
                {
                  label: "Gaz",
                  nativeInputProps: {
                    defaultChecked: initialState.energieECS === "gaz",
                    value: "gaz",
                  },
                },
                {
                  label: "Ballon électrique",
                  nativeInputProps: {
                    defaultChecked: initialState.energieECS === "ballon electrique",
                    value: "ballon electrique",
                  },
                },
              ]}
              state={errors?.energieECS?._errors ? "error" : "default"}
              stateRelatedMessage={errors?.energieECS?._errors}
            />
          </Box>
        )}
      />
    </Box>
  );
};
