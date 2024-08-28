"use client";

import { type ButtonProps } from "@codegouvfr/react-dsfr/Button";

import { Button } from "@/components/Button";
import { config } from "@/config";

type Props = ButtonProps.AsAnchor &
  ButtonProps.Common &
  (ButtonProps.IconOnly | ButtonProps.WithIcon | ButtonProps.WithoutIcon);

export const StartSimulationButton = (props: Props) => {
  return (
    <>
      <Button
        {...props}
        linkProps={{
          href: "/simulation",
        }}
      >
        {config.ctaTitle}
      </Button>
    </>
  );
};
