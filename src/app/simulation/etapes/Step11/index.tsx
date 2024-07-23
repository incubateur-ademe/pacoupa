"use client";

import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { z } from "zod";

import { Callout } from "@/components/Callout";
import { Box } from "@/dsfr";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";

const required_error = "Le type d'énergie pour chauffer l'eau est obligatoire";

const schema = z.object({
  energieECS: z.string({ required_error }).min(1, required_error),
});

export const Step11 = () => {
  return (
    <>
      <HeaderFunnel />

      <WizardForm
        schema={schema}
        render={({ errors, store }) => (
          <Box>
            <RadioButtons
              name="energieECS"
              legend={
                <>
                  Quel <strong>énergie principale</strong> utilisez-vous pour chauffer l’eau ?
                </>
              }
              aria-required
              aria-invalid={Boolean(errors?.energieECS?._errors)}
              options={[
                {
                  label: "Fioul",
                  nativeInputProps: {
                    defaultChecked: store.energieECS === "fioul",
                    value: "fioul",
                    disabled: store.typeCH === "individuel",
                  },
                },
                {
                  label: "Gaz",
                  nativeInputProps: {
                    defaultChecked: store.energieECS === "gaz",
                    value: "gaz",
                    disabled:
                      store.typeCH === "collectif" && store.energieCH === "fioul" && store.typeECS == "collectif",
                  },
                },
                {
                  label: "Ballon électrique",
                  nativeInputProps: {
                    defaultChecked: store.energieECS === "ballon electrique",
                    value: "ballon electrique",
                    disabled:
                      (store.typeCH === "collectif" && store.energieCH === "fioul" && store.typeECS == "collectif") ||
                      (store.typeCH === "individuel" && store.energieCH === "gaz"),
                  },
                },
              ]}
              state={errors?.energieECS?._errors ? "error" : "default"}
              stateRelatedMessage={<div aria-live="polite">{errors?.energieECS?._errors}</div>}
            />

            {store.typeCH === "individuel" && store.energieCH !== "gaz" && (
              <Box>
                <Callout
                  type="pacoupa"
                  content={
                    <>En chauffage individuel électrique, le fioul ne peut pas être utilisé pour l'eau chaude.</>
                  }
                />
              </Box>
            )}

            {store.typeCH === "individuel" && store.energieCH === "gaz" && (
              <Box>
                <Callout
                  type="pacoupa"
                  content={<>En chauffage individuel gaz, seul le gaz peut être utilisé pour l'eau chaude.</>}
                />
              </Box>
            )}

            {store.typeCH === "collectif" && store.energieCH === "fioul" && store.typeECS == "collectif" && (
              <Box>
                <Callout
                  type="pacoupa"
                  content={<>En chauffage collectif fioul, seul le fioul peut être utilisé pour l'eau chaude.</>}
                />
              </Box>
            )}
          </Box>
        )}
      />
    </>
  );
};
