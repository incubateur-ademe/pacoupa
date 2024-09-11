"use client";

import { push } from "@socialgouv/matomo-next";
import { type PropsWithChildren } from "react";

import { config } from "@/config";
import { matomoCategory } from "@/lib/matomo-events";

import { Button } from "./Button";

const defaultEventCategory = matomoCategory.accueil;

export interface CTAProps {
  eventCategory?: (typeof matomoCategory)[keyof typeof matomoCategory];
  eventName: "Bouton bas" | "Bouton haut" | "Bouton intermédiaire";
  href?: string;
}
export const CTA = ({
  eventCategory,
  eventName,
  children = config.ctaTitle,
  href = config.formUrl,
}: PropsWithChildren<CTAProps>) => {
  const onClick = () => push(["trackEvent", eventCategory ?? defaultEventCategory, "Click CTA", eventName]);
  return (
    <Button
      linkProps={{
        onClick,
        href: href as never,
      }}
    >
      {children}
    </Button>
  );
};
