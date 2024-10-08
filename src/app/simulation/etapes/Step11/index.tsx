"use client";

import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import assert from "assert";
import { useEffect, useState } from "react";
import { z } from "zod";

import { Callout } from "@/components/Callout";
import { Text } from "@/dsfr/base/typography";
import { usePacoupaSessionStorage } from "@/lib/client/usePacoupaSessionStorage";
import { type InformationBatiment } from "@/lib/common/domain/InformationBatiment";
import { getEnergieEcsPossibles } from "@/lib/server/useCases/getCasPossibles";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";

const required_error = "Le type d'énergie pour chauffer l'eau est obligatoire";

const schema = z.object({
  energieECS: z.string({ required_error }).min(1, required_error),
});

export const Step11 = () => {
  const { store } = usePacoupaSessionStorage();
  const [valeursPossibles, setValeursPossibles] = useState<Array<InformationBatiment["energieCH"]>>([]);

  const { typeCH, energieCH, typeECS } = store;

  assert(typeCH, "typeCH is required");
  assert(energieCH, "energieCH is required");
  assert(typeECS, "typeECS is required");

  useEffect(() => {
    setValeursPossibles(
      getEnergieEcsPossibles({
        typeCh: typeCH,
        energieCh: energieCH,
        typeEcs: typeECS,
      }),
    );
  }, [energieCH, typeCH, typeECS]);

  return (
    <>
      <HeaderFunnel />

      <WizardForm
        schema={schema}
        render={({ errors, store }) => (
          <div>
            <RadioButtons
              name="energieECS"
              legend={
                <>
                  Quel <strong>énergie principale</strong> utilisez-vous pour chauffer l’eau&nbsp;?
                </>
              }
              aria-required
              aria-invalid={Boolean(errors?.energieECS?._errors)}
              options={[
                {
                  label: "Fioul",
                  nativeInputProps: {
                    defaultChecked: store.energieECS === "fioul",
                    value: "fioul",
                    disabled: !valeursPossibles.includes("fioul"),
                  },
                },
                {
                  label: "Gaz",
                  nativeInputProps: {
                    defaultChecked: store.energieECS === "gaz",
                    value: "gaz",
                    disabled: !valeursPossibles.includes("gaz"),
                  },
                },
                {
                  label: "Ballon électrique",
                  nativeInputProps: {
                    defaultChecked: store.energieECS === "ballon electrique",
                    value: "ballon electrique",
                    disabled: !valeursPossibles.includes("electricite"),
                  },
                },
              ]}
              state={errors?.energieECS?._errors ? "error" : "default"}
              stateRelatedMessage={<span aria-live="polite">{errors?.energieECS?._errors}</span>}
            />

            {valeursPossibles.length < 3 && (
              <div>
                <Callout
                  type="pacoupa"
                  content={
                    <Text className="mb-0">
                      Certaines énergies pour l'eau chaude ne sont pas disponibles, étant donné les renseignements
                      précédents.
                    </Text>
                  }
                />
              </div>
            )}
          </div>
        )}
      />
    </>
  );
};
