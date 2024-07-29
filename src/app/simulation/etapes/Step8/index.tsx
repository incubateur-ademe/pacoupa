"use client";

import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import assert from "assert";
import { useEffect, useState } from "react";
import { z } from "zod";

import { Callout } from "@/components/Callout";
import { Box } from "@/dsfr";
import { usePacoupaSessionStorage } from "@/lib/client/usePacoupaSessionStorage";
import { type InformationBatiment } from "@/lib/common/domain/InformationBatiment";
import { getEnergieChPossibles } from "@/lib/server/useCases/getCasPossibles";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";

const required_error = "Le type d'énergie de chauffage est obligatoire";

const schema = z.object({
  energieCH: z.string({ required_error }).min(1, required_error),
});

export const Step8 = () => {
  const { store } = usePacoupaSessionStorage();
  const [valeursPossibles, setValeursPossibles] = useState<Array<InformationBatiment["energieCH"]>>([]);

  const { typeCH } = store;

  assert(typeCH, "typeCH is required");

  useEffect(() => {
    getEnergieChPossibles({
      typeCh: typeCH,
    })
      .then(valeurs => setValeursPossibles(valeurs))
      .catch(console.error);
  }, [typeCH]);

  return (
    <>
      <HeaderFunnel />

      <WizardForm
        schema={schema}
        render={({ errors, store }) => (
          <>
            <Box>
              <RadioButtons
                name="energieCH"
                legend={
                  <>
                    Quelle <strong>énergie principale</strong> utilisez-vous pour vous chauffer ?
                  </>
                }
                aria-required
                aria-invalid={Boolean(errors?.energieCH?._errors)}
                options={[
                  {
                    label: "Fioul",
                    nativeInputProps: {
                      defaultChecked: store.energieCH === "fioul",
                      value: "fioul",
                      disabled: !valeursPossibles.includes("fioul"),
                    },
                  },
                  {
                    label: "Gaz",
                    nativeInputProps: {
                      defaultChecked: store.energieCH === "gaz",
                      value: "gaz",
                      disabled: !valeursPossibles.includes("gaz"),
                    },
                  },
                  {
                    label: "Électricité",
                    nativeInputProps: {
                      defaultChecked: store.energieCH === "electricite",
                      value: "electricite",
                      disabled: !valeursPossibles.includes("electricite"),
                    },
                  },
                ]}
                state={errors?.energieCH?._errors ? "error" : "default"}
                stateRelatedMessage={<div aria-live="polite">{errors?.energieCH?._errors}</div>}
              />
            </Box>

            {valeursPossibles.length < 3 && (
              <Box>
                <Callout
                  type="pacoupa"
                  content={
                    <>
                      Certaines énergies pour le chauffage ne sont pas disponibles, étant donné les renseignements
                      précédents.
                    </>
                  }
                />
              </Box>
            )}
          </>
        )}
      />
    </>
  );
};
