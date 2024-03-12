import { type PropsWithChildren } from "react";

import { Box } from "@/dsfr";

import styles from "./ButtonsWrapper.module.scss";

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

export const ButtonsWrapper = (props: PropsWithChildren) => {
  return (
    <>
      <Box className={styles.buttons}>{props.children}</Box>
    </>
  );
};
