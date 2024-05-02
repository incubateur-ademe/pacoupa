import { fr } from "@codegouvfr/react-dsfr";
import { type AlertProps } from "@codegouvfr/react-dsfr/Alert";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { type PropsWithChildren } from "react";

import { Box } from "@/dsfr";
import { type Solution } from "@/lib/enums";

import { acoustiqueMap, coutMap, environnementMap, faciliteMap, maturiteMap, travauxMap } from "./helper";

type InnerEvaluationProps = {
  emoji?: string;
  label: string;
  severity: AlertProps.Severity;
  titre: string;
};

export const InnerEvaluation = ({ label, emoji, severity, titre }: PropsWithChildren<InnerEvaluationProps>) => {
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
          {label}
        </Badge>
      </Box>
    </Box>
  );
};

type SolutionEvaluation = keyof Pick<
  Solution,
  | "acoustique"
  | "cout"
  | "difficulte"
  | "environnement"
  | "espaceExterieur"
  | "maturite"
  | "travauxCollectif"
  | "travauxIndividuel"
>;

type EvaluationProps = {
  categorie: SolutionEvaluation;
  solution: Pick<Solution, SolutionEvaluation>;
};

const config = {
  environnement: {
    emoji: "🌿",
    titre: "Bénéfice environnemental",
    mapper: environnementMap,
  },
  cout: {
    emoji: "💰",
    titre: "Coût",
    mapper: coutMap,
  },
  difficulte: {
    emoji: "📦",
    titre: "Facilité d’installation",
    mapper: faciliteMap,
  },
  travauxCollectif: {
    emoji: "👥",
    titre: "Impact des travaux sur les parties communes",
    mapper: travauxMap,
  },
  travauxIndividuel: {
    emoji: "👤",
    titre: "Impact des travaux dans les appartements",
    mapper: travauxMap,
  },
  acoustique: {
    emoji: "🔊",
    titre: "Impact sonore",
    mapper: acoustiqueMap,
  },
  espaceExterieur: {
    emoji: "👀",
    titre: "Impact espace extérieur",
    mapper: travauxMap,
  },
  maturite: {
    emoji: "🕗",
    titre: "Maturité",
    mapper: maturiteMap,
  },
} satisfies Record<SolutionEvaluation, { emoji?: string; mapper: unknown; titre: string }>;

export const Evaluation = ({ categorie, solution }: EvaluationProps) => {
  const { emoji, titre, mapper } = config[categorie];

  const note = solution[categorie].note;

  if (note === "dynamic") return null;

  return <InnerEvaluation emoji={emoji} titre={titre} label={mapper[note].label} severity={mapper[note].severity} />;
};
