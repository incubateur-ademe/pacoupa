import { fr } from "@codegouvfr/react-dsfr";
import { type PropsWithChildren } from "react";

import { Box } from "@/dsfr";

import styles from "./Banner.module.scss";

type Props = {
  title: string;
};

export const Banner = (props: PropsWithChildren<Props>) => {
  return (
    <Box className={styles.banner}>
      <i className={fr.cx("fr-icon-info-fill")} aria-hidden={true} />
      {props.title}

      {/* <TallyButton size="small" /> */}
    </Box>
  );
};
