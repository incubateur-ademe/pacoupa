"use client";

import Button from "@codegouvfr/react-dsfr/Button";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import { Dialog, DialogContent, DialogContentText, DialogTitle, Tooltip } from "@mui/material";
import MuiButton from "@mui/material/Button";
import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/Badge";
import { Text } from "@/dsfr/base/typography";
import { type Solution } from "@/lib/common/domain/values/Solution";

import { acoustiqueMap, coutMap, environnementMap, faciliteMap, maturiteMap, travauxMap } from "./helper";

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
  withDetails?: boolean;
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

export const Evaluation = ({ categorie, solution, withDetails }: EvaluationProps) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { emoji, titre, mapper } = config[categorie];

  const note = solution[categorie].note;
  const text = solution[categorie].texte || [];
  const image = solution[categorie].image;

  if (note === "dynamic") return null;

  return (
    <div>
      <div className="mt-2 mb-1">
        <span className="inline-block w-[20px]" aria-hidden>
          {emoji ?? ""}
        </span>
        <span className="pl-0">{titre}</span>
      </div>

      <div className="flex">
        <span className="inline-block w-[20px]"></span>
        <div className="grow">
          <Badge type={mapper[note].severity} label={mapper[note].label} />
        </div>
        {withDetails && (text.length !== 0 || image) && (
          <div>
            <Tooltip title={"En savoir +"} arrow>
              <Button
                priority="tertiary no outline"
                iconId="ri-information-line"
                nativeButtonProps={{
                  onClick: handleClickOpen,
                }}
              >
                {""}
              </Button>
            </Tooltip>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" className="!mt-6">
                {emoji && `${emoji} `}
                {titre}
              </DialogTitle>

              <MuiButton
                variant="text"
                endIcon={<CloseIcon />}
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: theme => theme.palette.grey[500],
                }}
              >
                Fermer
              </MuiButton>

              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {image && (
                    <div className="mb-8">
                      <Image src={`/img/solutions/${image}`} alt="test" width={1200} height={900} layout="responsive" />
                    </div>
                  )}

                  {text.map((chunk, index) => (
                    <div key={index}>
                      <div className="flex items-stretch">
                        <div className="w-[30px] mt-1">
                          <InfoIcon sx={{ fontSize: 20 }} />
                        </div>

                        <Text variant="sm" className="mb-0 font-bold shrink-0 grow-0">
                          {chunk.titre}
                        </Text>
                      </div>

                      <div className="flex">
                        <div className="w-[30px] shrink-0 grow-0"></div>
                        <Text variant="sm" className="pl-0">
                          {chunk.contenu}
                        </Text>
                      </div>
                    </div>
                  ))}
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
};
