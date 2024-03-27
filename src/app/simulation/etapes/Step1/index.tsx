import { fr } from "@codegouvfr/react-dsfr";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { useWizard } from "react-use-wizard";

import { Box, P } from "@/dsfr";
import { H4 } from "@/dsfr/base/typography";

export const Step1 = () => {
  const { handleStep, previousStep, nextStep } = useWizard();

  return (
    <>
      <H4>Où se situe le bâtiment ?</H4>

      <Box>
        <Input iconId="fr-icon-map-pin-2-fill" label="" nativeInputProps={{ placeholder: "Adresse du bâtiment" }} />
      </Box>

      <P className={fr.cx("fr-mt-8v", "fr-text--sm")}>
        <i className={fr.cx("fr-icon-info-fill", "fr-mr-2v")} aria-hidden={true} />
        L’adresse nous permet d’avoir quelques renseignements sur le bâtiment.
      </P>
    </>
  );
};
