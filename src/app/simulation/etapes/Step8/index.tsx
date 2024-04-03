"use client";

import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { z } from "zod";

import { Box, P } from "@/dsfr";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";

const schema = z.object({
  energieChauffage: z.string().min(1, "Le type d'énergie de chauffage est obligatoire"),
});

export const Step8 = () => {
  return (
    <Box>
      <HeaderFunnel />
      <P>
        Quelle <strong>énergie principale</strong> utilisez-vous pour vous chauffer ?
      </P>

      <WizardForm
        schema={schema}
        render={({ errors }) => (
          <>
            <Box>
              <RadioButtons
                // legend="Légende pour l’ensemble de champs"
                name="energieChauffage"
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
                state={errors?.energieChauffage?._errors ? "error" : "default"}
                stateRelatedMessage={errors?.energieChauffage?._errors}
              />
            </Box>
          </>
        )}
      />
    </Box>
  );
};
