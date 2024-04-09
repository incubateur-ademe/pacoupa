"use client";

import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { z } from "zod";

import { Button } from "@/components/Button";
import { Box, P } from "@/dsfr";
import { useStore } from "@/lib/client/store";

import { HeaderFunnel } from "../HeaderFunnel";
import { WizardForm } from "../WizardForm";
import { Batiment1946a1974Image } from "./Batiment1946a1974Image";
import { Batiment1975a1989Image } from "./Batiment1975a1989Image";
import { BatimentPost1990Image } from "./BatimentPost1990Image";
import { BatimentPre1945Image } from "./BatimentPre1945Image";

const schema = z.object({
  annee: z.string({ required_error: "L'année du bâtiment est obligatoire" }),
});

export const Step2 = () => {
  const [initialState, sessionStorageOK] = useStore();

  return (
    <>
      {sessionStorageOK && (
        <Box>
          <HeaderFunnel />
          <P>
            Quelle est <strong>l’année</strong> de construction du bâtiment ?
          </P>

          <WizardForm
            schema={schema}
            render={({ errors }) => (
              <Box>
                <RadioButtons
                  // legend="Légende pour l’ensemble de champs"
                  name="annee"
                  options={[
                    {
                      illustration: <BatimentPre1945Image />,
                      label: "Avant 1945",
                      hintText: "Façade ornementée",
                      nativeInputProps: {
                        defaultChecked: initialState?.annee === "pre-1945",
                        value: "pre-1945",
                      },
                    },
                    {
                      illustration: <Batiment1946a1974Image />,
                      label: "Entre 1946 et 1974",
                      hintText: "Utilisation du béton",
                      nativeInputProps: {
                        defaultChecked: initialState?.annee === "1946-1974",
                        value: "1946-1974",
                      },
                    },
                    {
                      illustration: <Batiment1975a1989Image />,
                      label: "Entre 1975 et 1989",
                      hintText: "Les années HLM",
                      nativeInputProps: {
                        defaultChecked: initialState?.annee === "1975-1989",
                        value: "1975-1989",
                      },
                    },
                    {
                      illustration: <BatimentPost1990Image />,
                      label: "Après 1990",
                      hintText: "Bâtiments modernes",
                      nativeInputProps: {
                        defaultChecked: initialState?.annee === "post-1990",
                        value: "post-1990",
                      },
                    },
                  ]}
                  state={errors?.annee?._errors ? "error" : "default"}
                  stateRelatedMessage={errors?.annee?._errors}
                />
              </Box>
            )}
          />

          <Button priority="secondary">Je ne sais pas</Button>
        </Box>
      )}
    </>
  );
};
