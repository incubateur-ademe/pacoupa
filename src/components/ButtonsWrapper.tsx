import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { type PropsWithChildren } from "react";

import { Box } from "@/dsfr";

import styles from "./ButtonsWrapper.module.scss";

type Props = {
  align?: "left" | "right";
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
      <Box className={cx(styles.buttons, props.align === "right" && "justify-end")}>{props.children}</Box>
    </>
  );
};
