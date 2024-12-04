"use client";

import { push } from "@socialgouv/matomo-next";

import { Button } from "@/components/Button";
import { matomoCategory } from "@/lib/matomo-events";

export const CommencerButton = () => {
  return (
    <>
      <Button
        linkProps={{
          href: "/simulation/etapes",
          onClick: () => {
            push(["trackEvent", matomoCategory.formulaire, "Clic Commencer", "Commencer"]);
          },
        }}
      >
        Commencer
      </Button>
    </>
  );
};
