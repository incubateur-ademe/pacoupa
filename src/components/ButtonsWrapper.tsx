import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { type PropsWithChildren } from "react";

import styles from "./ButtonsWrapper.module.scss";

type Props = {
  align?: "center" | "left" | "right";
};

/**
 * Wrapper for buttons to ensure invariant spaces.
 *
 * Example:
 *
 * <ButtonsWrapper>
 *   <Button>Suivant</Button>
 *   <Button priority="secondary">Annuler</Button>
 * </ButtonsWrapper>
 *
 */
export const ButtonsWrapper = (props: PropsWithChildren<Props>) => {
  return (
    <>
      <div
        className={cx(
          styles.buttons,
          props.align === "right" ? "justify-end" : props.align === "center" ? "justify-between" : "",
        )}
      >
        {props.children}
      </div>
    </>
  );
};
