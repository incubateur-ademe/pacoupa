"use client";

import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { useState } from "react";
import { useWizard } from "react-use-wizard";
import { z, type ZodFormattedError } from "zod";

import { Box, P } from "@/dsfr";
import { handleForm, type HandleFormResult } from "@/lib/form";

import { ButtonsFunnel } from "../FooterFunnel";
import { HeaderFunnel } from "../HeaderFunnel";
import { AucuneRenovationImage } from "./AucuneRenovationImage";
import { RenovationGlobaleImage } from "./RenovationGlobaleImage";
import { RenovationsPartiellesImage } from "./RenovationsPartiellesImage";

const schema = z.object({
  renovation: z.string({ required_error: "Le niveau de rénovation du bâtiment est obligatoire" }),
});

export const Step3 = () => {
  const { handleStep, previousStep, nextStep } = useWizard();
  const [errors, setErrors] = useState<ZodFormattedError<{ [x: string]: unknown }, string>>();

  const formAction = (result: HandleFormResult) => {
    if (result.success) {
      nextStep().catch(() => {
        console.log("erreur dans la navigation");
      });
    } else {
      console.log("error", result.errors);
      setErrors(result.errors);
    }
  };

  return (
    <Box>
      <HeaderFunnel />
      <P>
        Quelles <strong>rénovations</strong> ont été effectuées sur votre bâtiment ?
      </P>

      <form onSubmit={handleForm(schema, formAction)}>
        <Box>
          <RadioButtons
            // legend="Légende pour l’ensemble de champs"
            name="renovation"
            options={[
              {
                illustration: <AucuneRenovationImage />,
                label: "Pas de rénovation",
                nativeInputProps: {
                  value: "aucune rénovation",
                },
              },
              {
                illustration: <RenovationsPartiellesImage />,
                label: "Partielles",
                hintText: "Toiture ou murs ou double vitrage, ...",
                nativeInputProps: {
                  value: "rénovations partielles",
                },
              },
              {
                illustration: <RenovationGlobaleImage />,
                label: "Globale",
                hintText: "Toiture, murs, double vitrage et plancher bas",
                nativeInputProps: {
                  value: "rénovation globale",
                },
              },
            ]}
            state={errors?.renovation?._errors ? "error" : "default"}
            stateRelatedMessage={errors?.renovation?._errors}
          />
        </Box>

        <ButtonsFunnel />
      </form>
    </Box>
  );
};
