"use client";

import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { z } from "zod";

import { Box, P } from "@/dsfr";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";

const required_error = "Le type d'émetteur est obligatoire";

const schema = z.object({
  emetteur: z.string({ required_error }).min(1, required_error),
});

export const Step9 = () => {
  return (
    <Box>
      <HeaderFunnel />

      <P>Vous vous chauffez grâce à...</P>

      <WizardForm
        schema={schema}
        render={({ errors }) => (
          <>
            <Box>
              <RadioButtons
                // legend="Légende pour l’ensemble de champs"
                name="emetteur"
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
                state={errors?.emetteur?._errors ? "error" : "default"}
                stateRelatedMessage={errors?.emetteur?._errors}
              />
            </Box>
          </>
        )}
      />
    </Box>
  );
};
