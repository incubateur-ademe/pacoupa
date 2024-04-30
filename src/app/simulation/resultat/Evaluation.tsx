import { fr } from "@codegouvfr/react-dsfr";
import { type AlertProps } from "@codegouvfr/react-dsfr/Alert";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { type PropsWithChildren } from "react";

import { Box } from "@/dsfr";

type Props = {
  contenu: string;
  emoji?: string;
  severity: AlertProps.Severity;
  titre: string;
};

export const Evaluation = ({ contenu, emoji, severity, titre }: PropsWithChildren<Props>) => {
  return (
    <Box>
      <Box className={fr.cx("fr-mt-1w", "fr-mb-1v")}>
        <span className={cx("inline-block", "w-[20px]")} aria-hidden>
          {emoji ?? ""}
        </span>
        <span className={cx("pl-0")}>{titre}</span>
      </Box>

      <Box>
        <span className={cx("inline-block", "w-[20px]")}></span>
        <Badge noIcon severity={severity}>
          {contenu}
        </Badge>
      </Box>
    </Box>
  );
};
