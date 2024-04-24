"use client";

import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { z } from "zod";

import { Box, P } from "@/dsfr";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";
import { GroupeImage } from "./GroupeImage";
import { PersonneImage } from "./PersonneImage";

const required_error = "Le type de chauffage est obligatoire";

const schema = z.object({
  typeCH: z
    .string({
      required_error,
    })
    .min(1, required_error),
});

export const Step7 = () => {
  return (
    <>
      <HeaderFunnel />
      <P>S’agit-il d’un chauffage...</P>

      <WizardForm
        schema={schema}
        render={({ errors, store }) => (
          <>
            <Box>
              <RadioButtons
                name="typeCH"
                aria-required
                aria-invalid={Boolean(errors?.typeCH?._errors)}
                options={[
                  {
                    illustration: <PersonneImage />,
                    label: "Individuel",
                    nativeInputProps: {
                      defaultChecked: store.typeCH === "individuel",
                      value: "individuel",
                    },
                  },
                  {
                    illustration: <GroupeImage />,
                    label: "Collectif",
                    nativeInputProps: {
                      defaultChecked: store.typeCH === "collectif",
                      value: "collectif",
                    },
                  },
                ]}
                state={errors?.typeCH?._errors ? "error" : "default"}
                stateRelatedMessage={<div aria-live="polite">{errors?.typeCH?._errors}</div>}
              />
            </Box>
          </>
        )}
      />
    </>
  );
};
