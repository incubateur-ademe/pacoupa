"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { useState } from "react";
import { useWizard } from "react-use-wizard";
import { z } from "zod";

import { Box, P } from "@/dsfr";

import { FooterFunnel } from "../FooterFunnel";
import { HeaderFunnel } from "../HeaderFunnel";

const schema = z.object({
  adresse: z.string().min(1, "L'adresse est obligatoire"),
});

export const Step1 = () => {
  const { nextStep } = useWizard();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data);

    const validation = schema.safeParse(values);

    if (validation.success) {
      sessionStorage.setItem("step1", JSON.stringify(validation.data));
      nextStep().catch(() => {
        console.log("error dans la navigation");
      });
    } else {
      console.log("error", validation.error);
      setErrors({ adresse: validation.error.errors[0].message });
    }
  };

  return (
    <Box>
      <HeaderFunnel />

      <P>Où se situe le bâtiment ?</P>

      <form onSubmit={handleSubmit}>
        <Box>
          <Input
            iconId="fr-icon-map-pin-2-fill"
            label="Adresse"
            nativeInputProps={{ placeholder: "Adresse du bâtiment", name: "adresse" }}
            state={errors.adresse ? "error" : "default"}
            stateRelatedMessage={errors.adresse}
          />
        </Box>

        <FooterFunnel />
      </form>

      <P className={fr.cx("fr-mt-8v", "fr-text--sm")}>
        <i className={fr.cx("fr-icon-info-fill", "fr-mr-2v")} aria-hidden={true} />
        L’adresse nous permet d’avoir quelques renseignements sur le bâtiment.
      </P>
    </Box>
  );
};
