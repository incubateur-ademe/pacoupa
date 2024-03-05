import { AccelerateurAdemeImage } from "@/components/img/AccelerateurAdemeImage";
import { AdemeImage } from "@/components/img/AdemeImage";
import { BetaGouvImage } from "@/components/img/BetaGouvImage";
import { MarianneImage } from "@/components/img/MarianneImage";
import { Box } from "@/dsfr";

import styles from "./logos-zone.module.scss";

export const LogosZone = () => {
  return (
    <Box className={styles.logos}>
      <MarianneImage />
      <AdemeImage />
      <BetaGouvImage />
      <AccelerateurAdemeImage />
    </Box>
  );
};
