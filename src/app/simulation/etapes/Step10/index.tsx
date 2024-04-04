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
  typeChauffage: z.string({ required_error }).min(1, required_error),
});

export const Step10 = () => {
  let initialState: ReturnType<typeof store.get>;

  useEffect(() => {
    initialState = store.get();
  }, []);

  return (
    <ClientOnly>
      <Box>
        <HeaderFunnel />

        <P>Pour l’eau, il s’agit d’un chauffage...</P>

        <WizardForm
          schema={schema}
          render={({ errors }) => (
            <Box>
              <RadioButtons
                // legend="Légende pour l’ensemble de champs"
                name="typeChauffage"
                options={[
                  {
                    illustration: <PersonneImage />,

                    label: "Individuel",
                    nativeInputProps: {
                      defaultChecked: initialState.typeChauffage === "individuel",
                      value: "individuel",
                    },
                  },
                  {
                    illustration: <GroupeImage />,
                    label: "Collectif",
                    nativeInputProps: {
                      defaultChecked: initialState.typeChauffage === "collectif",
                      value: "collectif",
                    },
                  },
                ]}
                state={errors?.typeChauffage?._errors ? "error" : "default"}
                stateRelatedMessage={errors?.typeChauffage?._errors}
              />
            </Box>
          )}
        />
      </Box>
    </ClientOnly>
  );
};
