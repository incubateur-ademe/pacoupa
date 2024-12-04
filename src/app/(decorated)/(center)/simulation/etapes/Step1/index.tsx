"use client";

import { z } from "zod";

import { AutocompleteBan } from "@/components/AutocompleteBan";
import { Callout } from "@/components/Callout";
import { Text } from "@/dsfr/base/typography";

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
            <div>
              <AutocompleteBan defaultInputValue={store.adresse} errors={errors?.adresse?._errors} />
            </div>
            <div className="mt-8">
              <Callout
                type="pacoupa"
                content={
                  <Text className="mb-0">
                    L’adresse nous permet de connaître votre éligibilité à un réseau de chaleur ainsi que votre zone
                    climatique.
                  </Text>
                }
              />
            </div>
          </>
        )}
      />
    </>
  );
};
