import { fr } from "@codegouvfr/react-dsfr";
import { type PropsWithChildren } from "react";

import { Box, P } from "@/dsfr";

import styles from "./Banner.module.scss";

type Props = {
  title: React.ReactElement;
};

export const Banner = (props: PropsWithChildren<Props>) => {
  return (
    <Box className={styles.banner}>
      <i className={fr.cx("fr-icon-info-fill")} aria-hidden={true} />
      <P className={fr.cx("fr-text--sm")}>{props.title}</P>
      {/* <TallyButton size="small" /> */}
    </Box>
  );
};
