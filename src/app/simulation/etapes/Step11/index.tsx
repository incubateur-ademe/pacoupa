"use client";

import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { z } from "zod";

import { Box } from "@/dsfr";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";

const required_error = "Le type d'énergie pour chauffer l'eau est obligatoire";

const schema = z.object({
  energieECS: z.string({ required_error }).min(1, required_error),
});

export const Step11 = () => {
  return (
    <>
      <HeaderFunnel />

      <WizardForm
        schema={schema}
        render={({ errors, store }) => (
          <Box>
            <RadioButtons
              name="energieECS"
              legend={
                <>
                  Quel <strong>énergie principale</strong> utilisez-vous pour chauffer l’eau ?
                </>
              }
              aria-required
              aria-invalid={Boolean(errors?.energieECS?._errors)}
              options={[
                {
                  label: "Fioul",
                  nativeInputProps: {
                    defaultChecked: store.energieECS === "fioul",
                    value: "fioul",
                  },
                },
                {
                  label: "Gaz",
                  nativeInputProps: {
                    defaultChecked: store.energieECS === "gaz",
                    value: "gaz",
                  },
                },
                {
                  label: "Ballon électrique",
                  nativeInputProps: {
                    defaultChecked: store.energieECS === "ballon electrique",
                    value: "ballon electrique",
                  },
                },
              ]}
              state={errors?.energieECS?._errors ? "error" : "default"}
              stateRelatedMessage={<div aria-live="polite">{errors?.energieECS?._errors}</div>}
            />
          </Box>
        )}
      />
    </>
  );
};
