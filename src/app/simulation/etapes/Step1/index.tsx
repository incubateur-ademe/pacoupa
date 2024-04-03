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
  adresse: z.string().min(1, "L'adresse est obligatoire"),
});

export const Step1 = () => {
  const { nextStep } = useWizard();
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

      <P>Où se situe le bâtiment ?</P>

      <form onSubmit={handleForm(schema, formAction)}>
        <Box>
          <Input
            iconId="fr-icon-map-pin-2-fill"
            label="Adresse"
            nativeInputProps={{ placeholder: "Adresse du bâtiment", name: "adresse" }}
            state={errors?.adresse?._errors ? "error" : "default"}
            stateRelatedMessage={errors?.adresse?._errors}
          />
        </Box>

        <ButtonsFunnel />
      </form>

      <P className={fr.cx("fr-mt-8v", "fr-text--sm")}>
        <i className={fr.cx("fr-icon-info-fill", "fr-mr-2v")} aria-hidden={true} />
        L’adresse nous permet d’avoir quelques renseignements sur le bâtiment.
      </P>
    </Box>
  );
};
