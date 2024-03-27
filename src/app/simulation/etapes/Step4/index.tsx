import { fr } from "@codegouvfr/react-dsfr";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { useWizard } from "react-use-wizard";

import { Box, P } from "@/dsfr";

export const Step4 = () => {
  const { handleStep, previousStep, nextStep } = useWizard();

  return (
    <>
      <P>
        Combien y’a t-il de <strong>logements</strong> dans le bâtiment ?
      </P>

      <Box>
        <Input label="" nativeInputProps={{ placeholder: "Nombre de logements" }} />
      </Box>

      <P className={fr.cx("fr-mt-8v", "fr-text--sm")}>
        <i className={fr.cx("fr-icon-info-fill", "fr-mr-2v")} aria-hidden={true} />
        Plutôt autour de 10, 50, 100, 200 ?
      </P>
    </>
  );
};
