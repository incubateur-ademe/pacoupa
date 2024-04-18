"use client";

import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { z } from "zod";

import { Box, P } from "@/dsfr";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";

const required_error = "Le type d'énergie de chauffage est obligatoire";

const schema = z.object({
  energieCH: z.string({ required_error }).min(1, required_error),
});

export const Step8 = () => {
  return (
    <>
      <HeaderFunnel />
      <P>
        Quelle <strong>énergie principale</strong> utilisez-vous pour vous chauffer ?
      </P>

      <WizardForm
        schema={schema}
        render={({ errors, store }) => (
          <>
            <Box>
              <RadioButtons
                name="energieCH"
                options={[
                  {
                    label: "Fioul",
                    nativeInputProps: {
                      defaultChecked: store.energieCH === "fioul",
                      value: "fioul",
                    },
                  },
                  {
                    label: "Gaz",
                    nativeInputProps: {
                      defaultChecked: store.energieCH === "gaz",
                      value: "gaz",
                    },
                  },
                  {
                    label: "Électricité",
                    nativeInputProps: {
                      defaultChecked: store.energieCH === "electricite",
                      value: "electricite",
                    },
                  },
                ]}
                state={errors?.energieCH?._errors ? "error" : "default"}
                stateRelatedMessage={errors?.energieCH?._errors}
              />
            </Box>
          </>
        )}
      />
    </>
  );
};
