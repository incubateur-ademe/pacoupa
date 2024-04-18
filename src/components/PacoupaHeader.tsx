import Header from "@codegouvfr/react-dsfr/Header";

import { config } from "@/config";

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
          <span className={styles.title}>{config.name}</span>
        </>
      }
    />
  );
};
