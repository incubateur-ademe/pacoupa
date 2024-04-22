import { type PropsWithChildren } from "react";

import styles from "./HighlightText.module.scss";

export const HighlightText = ({ children }: PropsWithChildren) => {
  return <span className={styles.highlight}>{children}</span>;
};
