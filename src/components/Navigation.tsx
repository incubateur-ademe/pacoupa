import { Badge } from "@codegouvfr/react-dsfr/Badge";
import Header, { type HeaderProps } from "@codegouvfr/react-dsfr/Header";

import { config } from "@/config";

import { Brand } from "./Brand";

const operatorLogo: HeaderProps["operatorLogo"] = {
  imgUrl: "/img/ademe-logo-2022-1.svg",
  alt: "ADEME",
  orientation: "vertical",
};

export const Navigation = () => {
  return (
    <Header
      brandTop={<Brand />}
      homeLinkProps={{
        href: "/",
        title: `Accueil - ${config.name}`,
      }}
      serviceTitle={
        <>
          {config.name}{" "}
          <Badge as="span" noIcon severity="success">
            Beta
          </Badge>
        </>
      }
      // serviceTagline={config.tagline}
      operatorLogo={operatorLogo}
      navigation={[
        {
          isActive: true,
          linkProps: {
            href: "#",
            target: "_self",
          },
          text: "Simulateur",
        },
        {
          linkProps: {
            href: "#",
            target: "_self",
          },
          text: "Solutions",
        },
        {
          linkProps: {
            href: "#",
            target: "_self",
          },
          text: "À propos",
        },
      ]}
    />
  );
};
