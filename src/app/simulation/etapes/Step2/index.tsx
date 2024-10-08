"use client";

import Input from "@codegouvfr/react-dsfr/Input";
import { useState } from "react";
import { z } from "zod";

import { Callout } from "@/components/Callout";
import { Text } from "@/dsfr/base/typography";
import { usePacoupaSessionStorage } from "@/lib/client/usePacoupaSessionStorage";

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
  const { store } = usePacoupaSessionStorage();
  const [annee, setAnnee] = useState(store.annee);

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
                    Quelle est <strong>l’année</strong> de construction du bâtiment&nbsp;?
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
                  onChange: e => {
                    setAnnee(Number(e.target.value));
                  },
                }}
                state={errors?.annee?._errors ? "error" : "default"}
                stateRelatedMessage={<span aria-live="polite">{errors?.annee?._errors}</span>}
              />
            </div>
            <div className="mt-8">
              <Callout
                type="pacoupa"
                content={
                  annee !== undefined && annee >= 2000 ? (
                    <Text className="mb-0">
                      Tous les bâtiments construits après les années 2000 sont <strong>correctement isolés</strong>.
                    </Text>
                  ) : (
                    <Text className="mb-0">
                      Tous les bâtiments construits avant 1945 sont traités identiquement au niveau de leur isolation
                      d’origine. Vous n’avez donc pas besoin d’être précis sur l’année dans ce cas (1930, 1900 ou 1870
                      auront les mêmes résultats).
                    </Text>
                  )
                }
              />
            </div>
          </>
        )}
      />
    </>
  );
};
