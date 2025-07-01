"use client";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { push } from "@socialgouv/matomo-next";
import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/Badge";
import { Bust } from "@/components/img/twemoji/Bust";
import { Busts } from "@/components/img/twemoji/Busts";
import { Clock } from "@/components/img/twemoji/Clock";
import { Eyes } from "@/components/img/twemoji/Eyes";
import { Package } from "@/components/img/twemoji/Package";
import { Speaker } from "@/components/img/twemoji/Speaker";
import { Text } from "@/dsfr/base/typography";
import { type Solution } from "@/lib/common/domain/values/Solution";
import { matomoCategory } from "@/lib/matomo-events";

import { acoustiqueMap, faciliteMap, maturiteMap, travauxMap } from "./helper";

type SolutionEvaluation = keyof Pick<
  Solution,
  "acoustique" | "difficulte" | "espaceExterieur" | "maturite" | "travauxCollectif" | "travauxIndividuel"
>;

type EvaluationProps = {
  categorie: SolutionEvaluation;
  solution: Pick<Solution, SolutionEvaluation>;
  withDetails?: boolean;
};

const config = {
  difficulte: {
    emoji: <Package />,
    titre: "Facilité d'installation",
    mapper: faciliteMap,
  },
  travauxCollectif: {
    emoji: <Busts />,
    titre: "Impact des travaux sur les parties communes",
    mapper: travauxMap,
  },
  travauxIndividuel: {
    emoji: <Bust />,
    titre: "Impact des travaux dans les appartements",
    mapper: travauxMap,
  },
  acoustique: {
    emoji: <Speaker />,
    titre: "Impact sonore",
    mapper: acoustiqueMap,
  },
  espaceExterieur: {
    emoji: <Eyes />,
    titre: "Impact espace extérieur",
    mapper: travauxMap,
  },
  maturite: {
    emoji: <Clock />,
    titre: "Maturité",
    mapper: maturiteMap,
  },
} satisfies Record<SolutionEvaluation, { emoji?: JSX.Element; mapper: unknown; titre: string }>;

export const EvaluationCoachCopro = ({ categorie, solution, withDetails }: EvaluationProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    push(["trackEvent", matomoCategory.solutionDetails, "Clic Info critère", `Infobulle ${categorie}`]);
    setIsExpanded(!isExpanded);
  };

  const { emoji, titre, mapper } = config[categorie];

  const note = solution[categorie].note;
  const text = solution[categorie].texte || [];
  const image = solution[categorie].image;

  if (note === "dynamic") return null;

  const { label } = mapper[note];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-5 leading-[0rem]" aria-hidden>
            {emoji ?? ""}
          </span>
          <span className="pl-2">{titre}</span>
          <Badge label={label} type="coachcopro" />
        </div>

        <div className="flex items-center gap-2">
          {withDetails && (text.length !== 0 || image) && (
            <button
              onClick={handleToggleExpand}
              className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
              aria-label={isExpanded ? "Réduire les détails" : "Voir les détails"}
            >
              {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
            </button>
          )}
        </div>
      </div>

      {withDetails && isExpanded && (text.length !== 0 || image) && (
        <div className="mt-4 pl-7 border-l-2 border-gray-200">
          {image && (
            <div className="mb-6">
              <Image
                src={`/img/solutions/${image}`}
                alt="Illustration de la solution"
                width={1200}
                height={900}
                layout="responsive"
              />
            </div>
          )}

          {text.map((chunk, index) => (
            <div key={index} className="mb-2 last:mb-0">
              <Text variant="sm" className="font-bold mb-1">
                {chunk.titre}
              </Text>
              <Text variant="sm" className="text-gray-700">
                {chunk.contenu}
              </Text>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
