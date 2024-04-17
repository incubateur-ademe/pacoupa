import { fr } from "@codegouvfr/react-dsfr";

import { Box } from "@/dsfr";
import { Text } from "@/dsfr/base/typography";

export default function Loading() {
  return (
    <Box className={fr.cx("fr-mt-8w")}>
      <Text variant="xl">Chargement...</Text>
    </Box>
  );
}
