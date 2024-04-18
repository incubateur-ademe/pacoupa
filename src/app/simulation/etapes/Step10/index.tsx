"use client";

import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { z } from "zod";

import { Box, P } from "@/dsfr";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";
import { GroupeImage } from "./GroupeImage";
import { PersonneImage } from "./PersonneImage";

const required_error = "Le sytème de production d'eau chaude est obligatoire";

const schema = z.object({
  typeECS: z.string({ required_error }).min(1, required_error),
});

export const Step10 = () => {
  return (
    <>
      <HeaderFunnel />

      <P>Le système de production d'eau chaude est ...</P>

      <WizardForm
        schema={schema}
        render={({ errors, store }) => (
          <Box>
            <RadioButtons
              name="typeECS"
              options={[
                {
                  illustration: <PersonneImage />,

                  label: "Individuel",
                  nativeInputProps: {
                    defaultChecked: store.typeECS === "individuel",
                    value: "individuel",
                  },
                },
                {
                  illustration: <GroupeImage />,
                  label: "Collectif",
                  nativeInputProps: {
                    defaultChecked: store.typeECS === "collectif",
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
    </>
  );
};
