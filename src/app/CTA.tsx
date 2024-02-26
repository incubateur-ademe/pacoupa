"use client";

import Button from "@codegouvfr/react-dsfr/Button";
import ButtonsGroup from "@codegouvfr/react-dsfr/ButtonsGroup";
import { push } from "@socialgouv/matomo-next";
import { type PropsWithChildren } from "react";

import { config } from "@/config";

const DEFAULT_CTA_HREF = config.formUrl;
const DEFAULT_CTA_TITLE = "Être alerté";

export interface CTAProps {
  asGroup?: boolean;
  href?: string;
  source: string;
  title?: string;
}
export const CTA = ({
  source,
  title = DEFAULT_CTA_TITLE,
  children = DEFAULT_CTA_TITLE,
  asGroup,
  href = DEFAULT_CTA_HREF,
}: PropsWithChildren<CTAProps>) => {
  const onClick = () => push(["trackEvent", "CTA", "Click", source]);
  return asGroup ? (
    <ButtonsGroup
      alignment="center"
      buttonsSize="large"
      inlineLayoutWhen="always"
      buttons={[
        {
          title,
          children,
          linkProps: {
            onClick,
            href: href as never,
          },
        },
      ]}
    />
  ) : (
    <Button
      title={title}
      linkProps={{
        onClick,
        href: href as never,
      }}
    >
      {children}
    </Button>
  );
};
