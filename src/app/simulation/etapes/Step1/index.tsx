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
      <HeaderFunnel />

      <WizardForm
        schema={schema}
        render={({ errors, store }) => (
          <Box>
            <AutocompleteBan defaultValue={store.adresse} errors={errors?.adresse?._errors} />
          </Box>
        )}
      />

      <P className={fr.cx("fr-mt-8v", "fr-text--sm")}>
        <i className={fr.cx("fr-icon-info-fill", "fr-mr-2v")} aria-hidden={true} />
        L’adresse nous permet d’avoir quelques renseignements sur le bâtiment.
      </P>
    </>
  );
};
