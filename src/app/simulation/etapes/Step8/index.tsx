"use client";

import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { z } from "zod";

import { Box, P } from "@/dsfr";
import { store } from "@/lib/store";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";

const required_error = "Le type d'énergie de chauffage est obligatoire";

const schema = z.object({
  energieChauffage: z.string({ required_error }).min(1, required_error),
});

export const Step8 = () => {
  const initialState = store.get();

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
                      defaultChecked: initialState.energieChauffage === "fioul",
                      value: "fioul",
                    },
                  },
                  {
                    label: "Gaz",
                    nativeInputProps: {
                      defaultChecked: initialState.energieChauffage === "gaz",
                      value: "gaz",
                    },
                  },
                  {
                    label: "Électricité",
                    nativeInputProps: {
                      defaultChecked: initialState.energieChauffage === "electricite",
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
