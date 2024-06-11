"use client";

import { fr } from "@codegouvfr/react-dsfr";
import Badge from "@codegouvfr/react-dsfr/Badge";
import Button from "@codegouvfr/react-dsfr/Button";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import { Dialog, DialogContent, DialogContentText, DialogTitle, Tooltip } from "@mui/material";
import MuiButton from "@mui/material/Button";
import Image from "next/image";
import { useState } from "react";

import { Box } from "@/dsfr";
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

  console.log({ image });

  if (note === "dynamic") return null;

  return (
    <Box>
      <Box className={fr.cx("fr-mt-1w", "fr-mb-1v")}>
        <span className={cx("inline-block", "w-[20px]")} aria-hidden>
          {emoji ?? ""}
        </span>
        <span className={cx("pl-0")}>{titre}</span>
      </Box>

      <Box className={cx("flex")}>
        <span className={cx("inline-block", "w-[20px]")}></span>
        <Box className={cx("grow")}>
          <Badge noIcon severity={mapper[note].severity}>
            {mapper[note].label}
          </Badge>
        </Box>
        {withDetails && (text.length !== 0 || image) && (
          <Box>
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
              <DialogTitle id="alert-dialog-title" className={fr.cx("fr-mt-4w")}>
                <span className={cx("inline-block", "w-[20px]")} aria-hidden>
                  {emoji ?? ""}
                </span>
                <span className={cx("pl-1")}>{titre}</span>
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
                    <Box className={fr.cx("fr-mb-4w")}>
                      <Image src={`/img/solutions/${image}`} alt="test" width={1200} height={900} layout="responsive" />
                    </Box>
                  )}

                  {text.map(chunk => (
                    <>
                      <Box className={cx("flex")}>
                        <Box className={cx("w-[30px]", "shrink-0", "grow-0", "v-align-middle")}>
                          <InfoIcon sx={{ fontSize: 20 }} />
                        </Box>
                        <h3 className={cx("mb-0", fr.cx("fr-text--sm"))}>{chunk.titre}</h3>
                      </Box>

                      <Box className={cx("flex")}>
                        <Box className={cx("w-[30px]", "shrink-0", "grow-0")}></Box>
                        <Text className={cx("pl-0", fr.cx("fr-text--sm"))}>{chunk.contenu}</Text>
                      </Box>
                    </>
                  ))}
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </Box>
        )}
      </Box>
    </Box>
  );
};
