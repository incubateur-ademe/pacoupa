import ButtonDsfr from "@codegouvfr/react-dsfr/Button";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";

import styles from "./Button.module.scss";

/**
 * Custom button for Pacoupa
 */
export const Button = (props: Parameters<typeof ButtonDsfr>[0]) => {
  return (
    <>
      <ButtonDsfr {...props} className={cx(styles.button, props.className)}>
        {props.children}
      </ButtonDsfr>
    </>
  );
};
