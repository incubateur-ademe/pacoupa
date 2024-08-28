"use client";

import { push } from "@socialgouv/matomo-next";
import { type PropsWithChildren } from "react";

import { config } from "@/config";

import { Button } from "./Button";

export interface CTAProps {
  href?: string;
  source: string;
}
export const CTA = ({ source, children = config.ctaTitle, href = config.formUrl }: PropsWithChildren<CTAProps>) => {
  const onClick = () => push(["trackEvent", "CTA", "Click", source]);
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
