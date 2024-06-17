import Header from "@codegouvfr/react-dsfr/Header";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";

import { config } from "@/config";

import { Brand } from "./Brand";
import { Logo } from "./img/Logo";
import styles from "./PacoupaHeader.module.scss";

export const PacoupaHeader = () => {
  return (
    <Header
      brandTop={<Brand />}
      homeLinkProps={{
        href: "/",
        title: `Accueil - ${config.name}`,
      }}
      operatorLogo={{
        alt: "Logo de l'opérateur",
        imgUrl: "/img/ademe.svg",
        orientation: "vertical",
      }}
      serviceTitle={
        <div className={cx("flex", "items-center")}>
          <Logo />
          <span className={cx(styles.title, "ml-1")}>{config.name}</span>
        </div>
      }
    />
  );
};
