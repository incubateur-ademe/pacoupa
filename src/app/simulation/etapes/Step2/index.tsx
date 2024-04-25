"use client";

import { fr } from "@codegouvfr/react-dsfr";
import Input from "@codegouvfr/react-dsfr/Input";
import { z } from "zod";

import { Box, P } from "@/dsfr";

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
      <P>
        Quelle est <strong>l’année</strong> de construction du bâtiment ?
      </P>

      <WizardForm
        schema={schema}
        render={({ errors, store }) => (
          <Box>
            <Input
              label=""
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
        )}
      />

      <P className={fr.cx("fr-mt-8v", "fr-text--sm")}>
        <i className={fr.cx("fr-icon-info-fill", "fr-mr-2v")} aria-hidden={true} />
        Cela va nous permettre d’avoir une première idée de l’isolation de base du bâtiment.
      </P>
    </>
  );
};
