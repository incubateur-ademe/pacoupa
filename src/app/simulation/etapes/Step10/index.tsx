"use client";

import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { z } from "zod";

import { Box, P } from "@/dsfr";
import { useStore } from "@/lib/client/store";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";
import { GroupeImage } from "./GroupeImage";
import { PersonneImage } from "./PersonneImage";

const required_error = "Le type de chauffage est obligatoire";

const schema = z.object({
  typeECS: z.string({ required_error }).min(1, required_error),
});

export const Step10 = () => {
  const [initialState, sessionStorageOK] = useStore();

  return (
    <>
      {sessionStorageOK && (
        <Box>
          <HeaderFunnel />

          <P>Pour l’eau, il s’agit d’un chauffage...</P>

          <WizardForm
            schema={schema}
            render={({ errors }) => (
              <Box>
                <RadioButtons
                  // legend="Légende pour l’ensemble de champs"
                  name="typeECS"
                  options={[
                    {
                      illustration: <PersonneImage />,

                      label: "Individuel",
                      nativeInputProps: {
                        defaultChecked: initialState?.typeECS === "individuel",
                        value: "individuel",
                      },
                    },
                    {
                      illustration: <GroupeImage />,
                      label: "Collectif",
                      nativeInputProps: {
                        defaultChecked: initialState?.typeECS === "collectif",
                        value: "collectif",
                      },
                    },
                  ]}
                  state={errors?.typeECS?._errors ? "error" : "default"}
                  stateRelatedMessage={errors?.typeECS?._errors}
                />
              </Box>
            )}
          />
        </Box>
      )}
    </>
  );
};
