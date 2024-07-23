"use client";

import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { z } from "zod";

import { Callout } from "@/components/Callout";
import { Box } from "@/dsfr";

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

      <WizardForm
        schema={schema}
        render={({ errors, store }) => (
          <Box>
            <RadioButtons
              name="typeECS"
              legend={<>Le système de production d'eau chaude est ...</>}
              aria-required
              aria-invalid={Boolean(errors?.typeECS?._errors)}
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
                    disabled: store.typeCH === "individuel" && store.energieCH === "gaz",
                  },
                },
              ]}
              state={errors?.typeECS?._errors ? "error" : "default"}
              stateRelatedMessage={<div aria-live="polite">{errors?.typeECS?._errors}</div>}
            />

            {store.typeCH === "individuel" && store.energieCH === "gaz" && (
              <Box>
                <Callout
                  type="pacoupa"
                  content={<>En chauffage individuel gaz, seul le gaz peut être utilisé pour l'eau chaude.</>}
                />
              </Box>
            )}
          </Box>
        )}
      />
    </>
  );
};
