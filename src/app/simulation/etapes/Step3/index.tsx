"use client";

import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { z } from "zod";

import { Box } from "@/dsfr";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";
import { AucuneRenovationImage } from "./AucuneRenovationImage";
import { RenovationGlobaleImage } from "./RenovationGlobaleImage";
import { RenovationsPartiellesImage } from "./RenovationsPartiellesImage";

const schema = z.object({
  renovation: z.string({ required_error: "Le niveau de rénovation du bâtiment est obligatoire" }),
});

export const Step3 = () => {
  return (
    <>
      <HeaderFunnel />

      <WizardForm
        schema={schema}
        render={({ errors, store }) => (
          <Box>
            <RadioButtons
              name="renovation"
              aria-required
              aria-invalid={Boolean(errors?.renovation?._errors)}
              legend={
                <>
                  Quelles <strong>rénovations</strong> ont été effectuées sur votre bâtiment ?
                </>
              }
              options={[
                {
                  illustration: <AucuneRenovationImage />,
                  label: "Pas de rénovation",
                  nativeInputProps: {
                    defaultChecked: store.renovation === "aucune rénovation",
                    value: "aucune rénovation",
                  },
                },
                {
                  illustration: <RenovationsPartiellesImage />,
                  label: "Partielles",
                  hintText: "Toiture ou murs ou double vitrage, ...",
                  nativeInputProps: {
                    defaultChecked: store.renovation === "rénovations partielles",
                    value: "rénovations partielles",
                  },
                },
                {
                  illustration: <RenovationGlobaleImage />,
                  label: "Globale",
                  hintText: "Toiture, murs, double vitrage et plancher bas",
                  nativeInputProps: {
                    defaultChecked: store.renovation === "rénovation globale",
                    value: "rénovation globale",
                  },
                },
              ]}
              state={errors?.renovation?._errors ? "error" : "default"}
              stateRelatedMessage={errors?.renovation?._errors}
            />
          </Box>
        )}
      />
    </>
  );
};
