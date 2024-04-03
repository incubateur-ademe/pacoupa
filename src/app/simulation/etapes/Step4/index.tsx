"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { useState } from "react";
import { useWizard } from "react-use-wizard";
import { z, type ZodFormattedError } from "zod";

import { Box, P } from "@/dsfr";
import { handleForm, type HandleFormResult } from "@/lib/form";

import { ButtonsFunnel } from "../FooterFunnel";
import { HeaderFunnel } from "../HeaderFunnel";

const schema = z.object({
  nbLogements: z.coerce.number().min(1, "Le nombre de logements est obligatoire et supérieur à zéro"),
});

export const Step4 = () => {
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
        Combien y’a t-il de <strong>logements</strong> dans le bâtiment ?
      </P>

      <form onSubmit={handleForm(schema, formAction)}>
        <Box>
          <Input
            label=""
            nativeInputProps={{ placeholder: "Nombre de logements", name: "nbLogements" }}
            state={errors?.nbLogements?._errors ? "error" : "default"}
            stateRelatedMessage={errors?.nbLogements?._errors}
          />
        </Box>

        <ButtonsFunnel />
      </form>

      <P className={fr.cx("fr-mt-8v", "fr-text--sm")}>
        <i className={fr.cx("fr-icon-info-fill", "fr-mr-2v")} aria-hidden={true} />
        Plutôt autour de 10, 50, 100, 200 ?
      </P>
    </Box>
  );
};
