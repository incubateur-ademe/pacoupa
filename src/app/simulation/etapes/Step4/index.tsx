"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { z } from "zod";

import { Box, P } from "@/dsfr";
import { useStore } from "@/lib/client/store";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";

const schema = z.object({
  nbLogements: z.coerce
    .number({
      invalid_type_error: "Le nombre de logements doit être un nombre",
    })
    .min(1, "Le nombre de logements est obligatoire et supérieur à zéro"),
});

export const Step4 = () => {
  const [initialState, sessionStorageOK] = useStore();

  return (
    <>
      {sessionStorageOK && (
        <Box>
          <HeaderFunnel />
          <P>
            Combien y’a t-il de <strong>logements</strong> dans le bâtiment ?
          </P>

          <WizardForm
            schema={schema}
            render={({ errors }) => (
              <Box>
                <Input
                  label=""
                  nativeInputProps={{
                    placeholder: "Nombre de logements",
                    name: "nbLogements",
                    defaultValue: initialState?.nbLogements,
                  }}
                  state={errors?.nbLogements?._errors ? "error" : "default"}
                  stateRelatedMessage={errors?.nbLogements?._errors}
                />
              </Box>
            )}
          />

          <P className={fr.cx("fr-mt-8v", "fr-text--sm")}>
            <i className={fr.cx("fr-icon-info-fill", "fr-mr-2v")} aria-hidden={true} />
            Plutôt autour de 10, 50, 100, 200 ?
          </P>
        </Box>
      )}
    </>
  );
};
