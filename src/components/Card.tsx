import CardDsfr from "@codegouvfr/react-dsfr/Card";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";

import styles from "./Card.module.scss";

type Props = Parameters<typeof CardDsfr>[0];

/**
 * Custom button for Pacoupa
 */
export const Card = (props: Props) => {
  return (
    <>
      <CardDsfr {...props} className={cx(styles.card, props.className)} />
    </>
  );
};
