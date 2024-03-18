import { type PropsWithChildren } from "react";

import { Text } from "@/dsfr/base/typography";

import styles from "./UnderlineText.module.scss";

export const UnderlineText = ({ children }: PropsWithChildren) => {
  return (
    <Text inline className={styles.text}>
      {children}
    </Text>
  );
};
