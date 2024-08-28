"use client";

import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Dialog, DialogContent, DialogContentText, DialogTitle, Tooltip } from "@mui/material";
import MuiButton from "@mui/material/Button";
import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/Badge";
import { Bust } from "@/components/img/twemoji/Bust";
import { Busts } from "@/components/img/twemoji/Busts";
import { Clock } from "@/components/img/twemoji/Clock";
import { Eyes } from "@/components/img/twemoji/Eyes";
import { Herb } from "@/components/img/twemoji/Herb";
import { MoneyBag } from "@/components/img/twemoji/MoneyBag";
import { Package } from "@/components/img/twemoji/Package";
import { Speaker } from "@/components/img/twemoji/Speaker";
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
    emoji: <Herb />,
    titre: "Bénéfice environnemental",
    mapper: environnementMap,
  },
  cout: {
    emoji: <MoneyBag />,
    titre: "Coût",
    mapper: coutMap,
  },
  difficulte: {
    emoji: <Package />,
    titre: "Facilité d’installation",
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
      <div className="flex items-center">
        <span className="inline-block w-[20px] leading-[0rem]" aria-hidden>
          {emoji ?? ""}
        </span>
        <span className="pl-[8px]">{titre}</span>
      </div>

      <div className="flex">
        <span className="inline-block w-[28px]"></span>
        <div className="grow">
          <Badge type={mapper[note].severity} label={mapper[note].label} />
        </div>
        {withDetails && (text.length !== 0 || image) && (
          <div>
            <Tooltip title={"En savoir +"} arrow>
              <button onClick={handleClickOpen}>
                <InfoOutlinedIcon />
              </button>
            </Tooltip>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" className="!mt-6">
                <div className="flex mt-2 mb-1 items-center">
                  {emoji && (
                    <span className="inline-block w-[20px] leading-[0rem]" aria-hidden>
                      {emoji ?? ""}
                    </span>
                  )}
                  <span className="pl-[8px]">{titre}</span>
                </div>
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
