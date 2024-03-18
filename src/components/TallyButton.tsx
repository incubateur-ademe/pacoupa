"use client";

import type ButtonDsfr from "@codegouvfr/react-dsfr/Button";
import { push } from "@socialgouv/matomo-next";

import { config } from "@/config";

import { Button } from "./Button";

type Props = { size?: Parameters<typeof ButtonDsfr>[0]["size"]; source?: string };

const defaultSource = "Landing page";

/**
 * Custom button for Tally button
 */
export const TallyButton = ({ source, size: initialSize }: Props) => {
  const onClick = () => push(["trackEvent", "Tally button", "Click", source || defaultSource]);

  const size = initialSize || "medium";

  return (
    <>
      <Button
        onClick={onClick}
        data-tally-open={config.tallyId}
        data-tally-emoji-text="👋"
        data-tally-emoji-animation="wave"
        size={size}
      >
        {config.tallyButtonLabel}
      </Button>
    </>
  );
};
