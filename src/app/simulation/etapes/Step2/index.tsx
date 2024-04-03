"use client";

import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { useState } from "react";
import { useWizard } from "react-use-wizard";
import { z, type ZodFormattedError } from "zod";

import { Button } from "@/components/Button";
import { Box, P } from "@/dsfr";
import { handleForm, type HandleFormResult } from "@/lib/form";

import { ButtonsFunnel } from "../FooterFunnel";
import { HeaderFunnel } from "../HeaderFunnel";
import { Batiment1946a1974Image } from "./Batiment1946a1974Image";
import { Batiment1975a1989Image } from "./Batiment1975a1989Image";
import { BatimentPost1990Image } from "./BatimentPost1990Image";
import { BatimentPre1945Image } from "./BatimentPre1945Image";

const schema = z.object({
  annee: z.string({ required_error: "L'année du bâtiment est obligatoire" }),
});

export const Step2 = () => {
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
        Quelle est <strong>l’année</strong> de construction du bâtiment ?
      </P>

      <form onSubmit={handleForm(schema, formAction)}>
        <Box>
          <RadioButtons
            // legend="Légende pour l’ensemble de champs"
            name="annee"
            options={[
              {
                illustration: <BatimentPre1945Image />,
                label: "Avant 1945",
                hintText: "Façade ornementée",
                nativeInputProps: {
                  value: "pre-1945",
                },
              },
              {
                illustration: <Batiment1946a1974Image />,
                label: "Entre 1946 et 1974",
                hintText: "Utilisation du béton",
                nativeInputProps: {
                  value: "1946-1974",
                },
              },
              {
                illustration: <Batiment1975a1989Image />,
                label: "Entre 1975 et 1989",
                hintText: "Les années HLM",
                nativeInputProps: {
                  value: "1975-1989",
                },
              },
              {
                illustration: <BatimentPost1990Image />,
                label: "Après 1990",
                hintText: "Bâtiments modernes",
                nativeInputProps: {
                  value: "post-1990",
                },
              },
            ]}
            state={errors?.annee?._errors ? "error" : "default"}
            stateRelatedMessage={errors?.annee?._errors}
          />
        </Box>

        <ButtonsFunnel />
      </form>

      <Button priority="secondary">Je ne sais pas</Button>
    </Box>
  );
};
