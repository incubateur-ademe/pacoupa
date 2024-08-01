import { fr } from "@codegouvfr/react-dsfr";
import { type PropsWithChildren } from "react";

import { Text } from "@/dsfr/base/typography";

import styles from "./Banner.module.scss";

type Props = {
  title: React.ReactElement;
};

export const Banner = (props: PropsWithChildren<Props>) => {
  return (
    <div className={styles.banner}>
      <i className={fr.cx("fr-icon-info-fill")} aria-hidden={true} />
      <Text variant="sm">{props.title}</Text>
    </div>
  );
};
