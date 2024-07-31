"use client";

import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import assert from "assert";
import { useEffect, useState } from "react";
import { z } from "zod";

import { Callout } from "@/components/Callout";
import { usePacoupaSessionStorage } from "@/lib/client/usePacoupaSessionStorage";
import { getTypeEcsPossibles } from "@/lib/server/useCases/getCasPossibles";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";
import { GroupeImage } from "./GroupeImage";
import { PersonneImage } from "./PersonneImage";

const required_error = "Le sytème de production d'eau chaude est obligatoire";

const schema = z.object({
  typeECS: z.string({ required_error }).min(1, required_error),
});

export const Step10 = () => {
  const { store } = usePacoupaSessionStorage();
  const [valeursPossibles, setValeursPossibles] = useState<Array<"collectif" | "individuel">>([]);

  const { typeCH, energieCH } = store;

  assert(typeCH, "typeCH is required");
  assert(energieCH, "energieCH is required");

  useEffect(() => {
    getTypeEcsPossibles({
      typeCh: typeCH,
      energieCh: energieCH,
    })
      .then(valeurs => setValeursPossibles(valeurs))
      .catch(console.error);
  }, [energieCH, typeCH]);

  return (
    <>
      <HeaderFunnel />

      <WizardForm
        schema={schema}
        render={({ errors, store }) => (
          <div>
            <RadioButtons
              name="typeECS"
              legend={<>Le système de production d'eau chaude est ...</>}
              aria-required
              aria-invalid={Boolean(errors?.typeECS?._errors)}
              options={[
                {
                  illustration: <PersonneImage />,

                  label: "Individuel",
                  nativeInputProps: {
                    defaultChecked: store.typeECS === "individuel",
                    value: "individuel",
                    disabled: !valeursPossibles.includes("individuel"),
                  },
                },
                {
                  illustration: <GroupeImage />,
                  label: "Collectif",
                  nativeInputProps: {
                    defaultChecked: store.typeECS === "collectif",
                    value: "collectif",
                    disabled: !valeursPossibles.includes("collectif"),
                  },
                },
              ]}
              state={errors?.typeECS?._errors ? "error" : "default"}
              stateRelatedMessage={<div aria-live="polite">{errors?.typeECS?._errors}</div>}
            />

            {valeursPossibles.length < 2 && (
              <div>
                <Callout
                  type="pacoupa"
                  content={
                    <>Le type d'eau chaude collectif n'est pas disponible, étant donné les renseignements précédents.</>
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
