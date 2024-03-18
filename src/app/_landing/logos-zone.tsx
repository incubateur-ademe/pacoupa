import { AccelerateurAdemeImage } from "@/components/img/AccelerateurAdemeImage";
import { AdemeImage } from "@/components/img/AdemeImage";
import { BetaGouvImage } from "@/components/img/BetaGouvImage";
import { Box } from "@/dsfr";

import styles from "./logos-zone.module.scss";

export const LogosZone = () => {
  return (
    <Box className={styles.logos}>
      <AdemeImage />
      <BetaGouvImage />
      <AccelerateurAdemeImage />
    </Box>
  );
};
