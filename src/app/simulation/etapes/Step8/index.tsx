"use client";

import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { z } from "zod";

import { Box, P } from "@/dsfr";
import { useStore } from "@/lib/client/store";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";

const required_error = "Le type d'énergie de chauffage est obligatoire";

const schema = z.object({
  energieCH: z.string({ required_error }).min(1, required_error),
});

export const Step8 = () => {
  const [initialState, sessionStorageOK] = useStore();

  return (
    <>
      {sessionStorageOK && (
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
                    name="energieCH"
                    options={[
                      {
                        label: "Fioul",
                        nativeInputProps: {
                          defaultChecked: initialState?.energieCH === "fioul",
                          value: "fioul",
                        },
                      },
                      {
                        label: "Gaz",
                        nativeInputProps: {
                          defaultChecked: initialState?.energieCH === "gaz",
                          value: "gaz",
                        },
                      },
                      {
                        label: "Électricité",
                        nativeInputProps: {
                          defaultChecked: initialState?.energieCH === "electricite",
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
        </Box>
      )}
    </>
  );
};
