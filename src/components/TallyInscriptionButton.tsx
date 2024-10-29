"use client";

import type ButtonDsfr from "@codegouvfr/react-dsfr/Button";
import { push } from "@socialgouv/matomo-next";

import { config } from "@/config";
import { matomoCategory } from "@/lib/matomo-events";

import { Button } from "./Button";

type Props = { size?: Parameters<typeof ButtonDsfr>[0]["size"]; source?: string };

const defaultSource = "Landing page";

/**
 * Custom button for Tally button
 */
export const TallyInscriptionButton = ({ source, size: initialSize }: Props) => {
  const onClick = () => push(["trackEvent", matomoCategory.accueil, "Click Tally button", source || defaultSource]);

  const size = initialSize || "medium";

  return (
    <>
      <Button
        onClick={onClick}
        data-tally-open={config.tally.inscription.id}
        data-tally-emoji-text="👋"
        data-tally-emoji-animation="wave"
        size={size}
      >
        {config.tally.inscription.label}
      </Button>
    </>
  );
};
