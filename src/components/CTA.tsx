"use client";

import { push } from "@socialgouv/matomo-next";
import { type PropsWithChildren } from "react";

import { config } from "@/config";

import { Button } from "./Button";

const defaultEventCategory = "Page d'accueil";

export interface CTAProps {
  eventCategory?: string;
  eventName: string;
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
