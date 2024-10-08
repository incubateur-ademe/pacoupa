"use client";

import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { z } from "zod";

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

      <WizardForm
        schema={schema}
        render={({ errors, store }) => (
          <>
            <div>
              <RadioButtons
                legend={<>S’agit-il d’un chauffage...</>}
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
                stateRelatedMessage={<span aria-live="polite">{errors?.typeCH?._errors}</span>}
              />
            </div>
          </>
        )}
      />
    </>
  );
};
