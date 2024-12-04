"use client";

import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { z } from "zod";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";

const required_error = "Le type d'émetteur est obligatoire";

const schema = z.object({
  emetteur: z.string({ required_error }).min(1, required_error),
});

export const Step9 = () => {
  return (
    <>
      <HeaderFunnel />

      <WizardForm
        schema={schema}
        render={({ errors, store }) => (
          <>
            <div>
              <RadioButtons
                name="emetteur"
                legend={<>Vous vous chauffez grâce à...</>}
                aria-required
                aria-invalid={Boolean(errors?.emetteur?._errors)}
                options={[
                  {
                    label: "Des radiateurs",
                    nativeInputProps: {
                      defaultChecked: store.emetteur === "radiateurs",
                      value: "radiateurs",
                    },
                  },
                  {
                    label: "Un plancher chauffant",
                    nativeInputProps: {
                      defaultChecked: store.emetteur === "plancher chauffant",
                      value: "plancher chauffant",
                    },
                  },
                ]}
                state={errors?.emetteur?._errors ? "error" : "default"}
                stateRelatedMessage={<span aria-live="polite">{errors?.emetteur?._errors}</span>}
              />
            </div>
          </>
        )}
      />
    </>
  );
};
