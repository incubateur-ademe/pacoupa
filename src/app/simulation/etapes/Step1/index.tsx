"use client";

import { z } from "zod";

import { AutocompleteBan } from "@/components/AutocompleteBan";
import { CalloutPacoupa } from "@/components/CalloutPacoupa";
import { Box } from "@/dsfr";

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
          <>
            <Box>
              <AutocompleteBan defaultValue={store.adresse} errors={errors?.adresse?._errors} />
            </Box>
            <Box className="mt-8">
              <CalloutPacoupa>
                L’adresse nous permet de connaître votre éligibilité à un réseau de chaleur ainsi que votre zone
                climatique.
              </CalloutPacoupa>
            </Box>
          </>
        )}
      />
    </>
  );
};
