"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { useEffect } from "react";
import { z } from "zod";

import { ClientOnly } from "@/components/ClientOnly";
import { Box, P } from "@/dsfr";
import { store } from "@/lib/store";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";

const schema = z.object({
  adresse: z.string().min(1, "L'adresse est obligatoire"),
});

export const Step1 = () => {
  let initialState: ReturnType<typeof store.get>;

  useEffect(() => {
    initialState = store.get();
  }, []);

  return (
    <ClientOnly>
      <Box>
        <HeaderFunnel />

        <P>Où se situe le bâtiment ?</P>

        <WizardForm
          schema={schema}
          render={({ errors }) => (
            <Box>
              <Input
                iconId="fr-icon-map-pin-2-fill"
                label="Adresse"
                nativeInputProps={{
                  placeholder: "Adresse du bâtiment",
                  name: "adresse",
                  defaultValue: initialState.adresse,
                }}
                state={errors?.adresse?._errors ? "error" : "default"}
                stateRelatedMessage={errors?.adresse?._errors}
              />
            </Box>
          )}
        />

        <P className={fr.cx("fr-mt-8v", "fr-text--sm")}>
          <i className={fr.cx("fr-icon-info-fill", "fr-mr-2v")} aria-hidden={true} />
          L’adresse nous permet d’avoir quelques renseignements sur le bâtiment.
        </P>
      </Box>
    </ClientOnly>
  );
};
