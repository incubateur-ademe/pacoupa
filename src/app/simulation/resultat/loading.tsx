import { fr } from "@codegouvfr/react-dsfr";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { CircularProgress } from "@mui/material";

import { Box } from "@/dsfr";
import { Text } from "@/dsfr/base/typography";

export default function Loading() {
  return (
    <>
      <Box className={cx(fr.cx("fr-mt-8w"), "text-center")}>
        <CircularProgress color="inherit" size={50} />
        <Text variant="xl" className={fr.cx("fr-mt-4w")}>
          Chargement...
        </Text>
      </Box>
    </>
  );
}
