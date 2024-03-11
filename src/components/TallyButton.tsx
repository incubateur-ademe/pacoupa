"use client";

import { push } from "@socialgouv/matomo-next";

import { config } from "@/config";

import { Button } from "./Button";

type Props = { source?: string };

const defaultSource = "Landing page";

/**
 * Custom button for Tally button
 */
export const TallyButton = ({ source }: Props) => {
  const onClick = () => push(["trackEvent", "Tally button", "Click", source || defaultSource]);

  return (
    <>
      <Button
        onClick={onClick}
        data-tally-open={config.tallyId}
        data-tally-emoji-text="👋"
        data-tally-emoji-animation="wave"
      >
        {config.tallyButtonLabel}
      </Button>
    </>
  );
};
