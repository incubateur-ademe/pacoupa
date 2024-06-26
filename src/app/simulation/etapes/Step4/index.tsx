"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { z } from "zod";

import { Box, P } from "@/dsfr";

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
          <Box>
            <Input
              label={
                <>
                  Combien y a t-il de <strong>logements</strong> dans le bâtiment ?
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
          </Box>
        )}
      />

      <P className={fr.cx("fr-mt-8v", "fr-text--sm")}>
        <i className={fr.cx("fr-icon-info-fill", "fr-mr-2v")} aria-hidden={true} />
        Plutôt autour de 10, 50, 100, 200 ?
      </P>
    </>
  );
};
