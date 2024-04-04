"use client";

import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { useEffect } from "react";
import { z } from "zod";

import { ClientOnly } from "@/components/ClientOnly";
import { Box, P } from "@/dsfr";
import { store } from "@/lib/store";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";

const required_error = "Le type d'émetteur est obligatoire";

const schema = z.object({
  emetteur: z.string({ required_error }).min(1, required_error),
});

export const Step9 = () => {
  let initialState: ReturnType<typeof store.get>;

  useEffect(() => {
    initialState = store.get();
  }, []);

  return (
    <ClientOnly>
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
                        defaultChecked: initialState.emetteur === "radiateurs",
                        value: "radiateurs",
                      },
                    },
                    {
                      label: "Un plancher chauffant",
                      nativeInputProps: {
                        defaultChecked: initialState.emetteur === "plancher chauffant",
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
    </ClientOnly>
  );
};
