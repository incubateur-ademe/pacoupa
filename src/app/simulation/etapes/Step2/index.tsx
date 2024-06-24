"use client";

import Input from "@codegouvfr/react-dsfr/Input";
import { z } from "zod";

import { CalloutPacoupa } from "@/components/CalloutPacoupa";
import { Box } from "@/dsfr";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";

const currentYear = new Date().getFullYear();

const schema = z.object({
  annee: z.coerce
    .number({
      invalid_type_error: "L'année doit être un nombre entier",
    })
    .int()
    .min(1, "L'année doit être supérieure à zéro")
    .max(currentYear, "L'année doit être inférieure ou égale à l'année en cours"),
});

export const Step2 = () => {
  return (
    <>
      <HeaderFunnel />

      <WizardForm
        schema={schema}
        render={({ errors, store }) => (
          <>
            <Box>
              <Input
                label={
                  <>
                    Quelle est <strong>l’année</strong> de construction du bâtiment ?
                  </>
                }
                nativeInputProps={{
                  "aria-required": true,
                  "aria-invalid": Boolean(errors?.annee?._errors),
                  placeholder: "Ex: 1983",
                  name: "annee",
                  defaultValue: store.annee,
                  type: "number",
                  onBlur: e => {
                    e.target.value = String(Math.round(Number(e.target.value)));
                  },
                }}
                state={errors?.annee?._errors ? "error" : "default"}
                stateRelatedMessage={<div aria-live="polite">{errors?.annee?._errors}</div>}
              />
            </Box>
            <Box className="mt-8">
              <CalloutPacoupa>
                Tous les bâtiments construits avant 1945 sont identiques au niveau de leur isolation d’origine.
              </CalloutPacoupa>
            </Box>
          </>
        )}
      />
    </>
  );
};
