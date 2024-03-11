"use client";

import { push } from "@socialgouv/matomo-next";
import { type PropsWithChildren } from "react";

import { config } from "@/config";

import { Button } from "./Button";

const DEFAULT_CTA_HREF = config.formUrl;
const DEFAULT_CTA_TITLE = "S'inscrire";

export interface CTAProps {
  href?: string;
  source: string;
}
export const CTA = ({ source, children = DEFAULT_CTA_TITLE, href = DEFAULT_CTA_HREF }: PropsWithChildren<CTAProps>) => {
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
