"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { z } from "zod";

import { Box, P } from "@/dsfr";
import { useStore } from "@/lib/store";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";

const schema = z.object({
  adresse: z.string().min(1, "L'adresse est obligatoire"),
});

export const Step1 = () => {
  const [initialState, sessionStorageOK] = useStore();

  return (
    <>
      {sessionStorageOK && (
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
                    defaultValue: initialState?.adresse,
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
      )}
    </>
  );
};
