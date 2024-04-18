"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { z } from "zod";

import { AutocompleteBan } from "@/components/AutocompleteBan";
import { Box, P } from "@/dsfr";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";

const schema = z.object({
  adresse: z.string().min(1, "L'adresse est obligatoire"),
});
export const Step1 = () => {
  return (
    <>
      {
        <Box>
          <HeaderFunnel />

          <P>Où se situe le bâtiment ?</P>

          <WizardForm
            schema={schema}
            render={({ errors, store }) => (
              <Box>
                <AutocompleteBan defaultValue={store.adresse} error={errors?.adresse?._errors} />
              </Box>
            )}
          />

          <P className={fr.cx("fr-mt-8v", "fr-text--sm")}>
            <i className={fr.cx("fr-icon-info-fill", "fr-mr-2v")} aria-hidden={true} />
            L’adresse nous permet d’avoir quelques renseignements sur le bâtiment.
          </P>
        </Box>
      }
    </>
  );
};
