import ButtonDsfr from "@codegouvfr/react-dsfr/Button";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";

import styles from "./Button.module.scss";

type Props = Parameters<typeof ButtonDsfr>[0];

/**
 * Custom button for Pacoupa
 */
export const Button = (props: Props) => {
  return (
    <>
      <ButtonDsfr
        {...props}
        className={cx(
          props.priority === "secondary"
            ? styles.secondaryButton
            : props.priority === "tertiary" || props.priority === "tertiary no outline"
              ? styles.tertiaryButton
              : styles.primaryButton,
          props.className,
        )}
      >
        {props.children}
      </ButtonDsfr>
    </>
  );
};
