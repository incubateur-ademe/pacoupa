"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { useWizard } from "react-use-wizard";

import { Box, P } from "@/dsfr";

import { HeaderFunnel } from "../HeaderFunnel";

export const Step1 = () => {
  const { handleStep, previousStep, nextStep } = useWizard();

  const handleForm = (data: FormData) => {
    console.log("data", data);
  };

  return (
    <Box>
      <HeaderFunnel />

      <P>Où se situe le bâtiment ?</P>

      <form action={handleForm}>
        <Box>
          <Input iconId="fr-icon-map-pin-2-fill" label="" nativeInputProps={{ placeholder: "Adresse du bâtiment" }} />
        </Box>
      </form>

      <P className={fr.cx("fr-mt-8v", "fr-text--sm")}>
        <i className={fr.cx("fr-icon-info-fill", "fr-mr-2v")} aria-hidden={true} />
        L’adresse nous permet d’avoir quelques renseignements sur le bâtiment.
      </P>
    </Box>
  );
};
