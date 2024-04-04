"use client";

import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { z } from "zod";

import { Box, P } from "@/dsfr";
import { useStore } from "@/lib/store";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";
import { AucuneRenovationImage } from "./AucuneRenovationImage";
import { RenovationGlobaleImage } from "./RenovationGlobaleImage";
import { RenovationsPartiellesImage } from "./RenovationsPartiellesImage";

const schema = z.object({
  renovation: z.string({ required_error: "Le niveau de rénovation du bâtiment est obligatoire" }),
});

export const Step3 = () => {
  const [initialState, sessionStorageOK] = useStore();

  return (
    <>
      {sessionStorageOK && (
        <Box>
          <HeaderFunnel />
          <P>
            Quelles <strong>rénovations</strong> ont été effectuées sur votre bâtiment ?
          </P>

          <WizardForm
            schema={schema}
            render={({ errors }) => (
              <Box>
                <RadioButtons
                  // legend="Légende pour l’ensemble de champs"
                  name="renovation"
                  options={[
                    {
                      illustration: <AucuneRenovationImage />,
                      label: "Pas de rénovation",
                      nativeInputProps: {
                        defaultChecked: initialState?.renovation === "aucune rénovation",
                        value: "aucune rénovation",
                      },
                    },
                    {
                      illustration: <RenovationsPartiellesImage />,
                      label: "Partielles",
                      hintText: "Toiture ou murs ou double vitrage, ...",
                      nativeInputProps: {
                        defaultChecked: initialState?.renovation === "rénovations partielles",
                        value: "rénovations partielles",
                      },
                    },
                    {
                      illustration: <RenovationGlobaleImage />,
                      label: "Globale",
                      hintText: "Toiture, murs, double vitrage et plancher bas",
                      nativeInputProps: {
                        defaultChecked: initialState?.renovation === "rénovation globale",
                        value: "rénovation globale",
                      },
                    },
                  ]}
                  state={errors?.renovation?._errors ? "error" : "default"}
                  stateRelatedMessage={errors?.renovation?._errors}
                />
              </Box>
            )}
          />
        </Box>
      )}
    </>
  );
};
