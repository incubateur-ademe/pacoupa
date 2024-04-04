"use client";

import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { useEffect } from "react";
import { z } from "zod";

import { ClientOnly } from "@/components/ClientOnly";
import { Box, P } from "@/dsfr";
import { store } from "@/lib/store";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";
import { GroupeImage } from "./GroupeImage";
import { PersonneImage } from "./PersonneImage";

const required_error = "Le type de chauffage est obligatoire";

const schema = z.object({
  chauffage: z
    .string({
      required_error,
    })
    .min(1, required_error),
});

export const Step7 = () => {
  let initialState: ReturnType<typeof store.get>;

  useEffect(() => {
    initialState = store.get();
  }, []);

  return (
    <ClientOnly>
      <Box>
        <HeaderFunnel />
        <P>S’agit-il d’un chauffage...</P>

        <WizardForm
          schema={schema}
          render={({ errors }) => (
            <>
              <Box>
                <RadioButtons
                  name="chauffage"
                  options={[
                    {
                      illustration: <PersonneImage />,
                      label: "Individuel",
                      nativeInputProps: {
                        defaultChecked: initialState.chauffage === "individuel",
                        value: "individuel",
                      },
                    },
                    {
                      illustration: <GroupeImage />,
                      label: "Collectif",
                      nativeInputProps: {
                        defaultChecked: initialState.chauffage === "collectif",
                        value: "collectif",
                      },
                    },
                  ]}
                  state={errors?.chauffage?._errors ? "error" : "default"}
                  stateRelatedMessage={errors?.chauffage?._errors}
                />
              </Box>
            </>
          )}
        />
      </Box>
    </ClientOnly>
  );
};
