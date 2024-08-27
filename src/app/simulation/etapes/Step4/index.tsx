"use client";

import { Input } from "@codegouvfr/react-dsfr/Input";
import { z } from "zod";

import { Callout } from "@/components/Callout";
import { Text } from "@/dsfr/base/typography";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";

const schema = z.object({
  nbLogements: z.coerce
    .number({
      invalid_type_error: "Le nombre de logements doit être un nombre entier",
    })
    .int()
    .min(1, "Le nombre de logements est obligatoire et supérieur à zéro"),
});

export const Step4 = () => {
  return (
    <>
      <HeaderFunnel />

      <WizardForm
        schema={schema}
        render={({ errors, store }) => (
          <>
            <div>
              <Input
                label={
                  <>
                    Combien y a-t-il de <strong>logements</strong> dans le bâtiment&nbsp;?
                  </>
                }
                nativeInputProps={{
                  "aria-required": true,
                  "aria-invalid": Boolean(errors?.nbLogements?._errors),
                  placeholder: "Nombre de logements",
                  name: "nbLogements",
                  defaultValue: store.nbLogements,
                  type: "number",
                  onBlur: e => {
                    e.target.value = String(Math.round(Number(e.target.value)));
                  },
                }}
                state={errors?.nbLogements?._errors ? "error" : "default"}
                stateRelatedMessage={<div aria-live="polite">{errors?.nbLogements?._errors}</div>}
              />
            </div>
            <div className="mt-8">
              <Callout
                type="pacoupa"
                content={
                  <Text className="mb-0">
                    Plutôt autour de 10, 50, 100, 200 ? Cela nous permettra de mieux estimer les coûts et les gains
                    moyens.
                  </Text>
                }
              />
            </div>
          </>
        )}
      />
    </>
  );
};
