import Header from "@codegouvfr/react-dsfr/Header";

import { config } from "@/config";
import { H1 } from "@/dsfr/base/typography";

import { Brand } from "./Brand";
import styles from "./PacoupaHeader.module.scss";

export const PacoupaHeader = () => {
  return (
    <Header
      brandTop={<Brand />}
      homeLinkProps={{
        href: "/",
        title: `Accueil - ${config.name}`,
      }}
      serviceTitle={
        <>
          <H1 className={styles.title}>{config.name}</H1>
        </>
      }
    />
  );
};
