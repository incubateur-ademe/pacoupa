"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { Tooltip } from "react-tooltip";

import { HesitationImage } from "@/components/img/HesitationImage";
import { UnderlineText } from "@/components/UnderlineText";
import { H2, Text } from "@/dsfr/base/typography";

import styles from "./explication-pac-zone.module.scss";

export const ExplicationPacZone = () => {
  return (
    <>
      <div className={cx(styles.hesitation, "rounded-none md:rounded-lg")}>
        <div>
          <ExplicationDesktop />
          <ExplicationMobile />
        </div>
      </div>

      {/* TODO: utiliser Material UI tooltip à la place */}
      <Tooltip anchorSelect=".pac" place="top">
        Une PAC est un système qui prélève de la chaleur dans une source froide (sol, air, nappe), <br />
        augmente son niveau de tempéraure et la restitue dans le bâtiment.
      </Tooltip>

      <Tooltip anchorSelect=".rcu" place="top">
        Un réseau de chaleur est un système de canalisations souterraines qui permettent d'acheminer <br />
        vers des bâtiments de la chaleur produite localement, avec une part d'énergies renouvelables <br />
        et de récupération (incinération des ordures ménagères, biomasse, géothermie...).
      </Tooltip>
    </>
  );
};

const ExplicationDesktop = () => (
  <div className="hidden md:flex">
    <div className="basis-[300px] grow order-first -translate-y-12">
      <HesitationImage />
    </div>

    <div className="grow-[2]">
      <H2>PAC, RCU: c'est quoi&nbsp;?</H2>
      <Text>Vous hésitez entre une chaudière à gaz ou des radiateurs électriques&nbsp;?</Text>
      <Text className={styles.questions}>
        <strong className="pac">
          Et pourquoi pas une <UnderlineText>pompe à chaleur</UnderlineText> (PAC){" "}
          <span className={fr.cx("fr-icon--sm", "ri-information-line")} aria-hidden="true"></span>
        </strong>
        <br />
        <strong className="rcu">
          ou un raccordement au <UnderlineText>réseau de chaleur urbain</UnderlineText> (RCU){" "}
          <span className={fr.cx("fr-icon--sm", "ri-information-line")} aria-hidden="true"></span>&nbsp;?
        </strong>
      </Text>
    </div>
  </div>
);

const ExplicationMobile = () => (
  <div className="flex md:hidden flex-col rounded-none">
    <div className="relative basis-[300px] grow order-last md:order-first md:-translate-y-12">
      <HesitationImage />
    </div>

    <div className="grow-[2]">
      <H2>PAC, RCU: c'est quoi&nbsp;?</H2>
      <Text>Vous hésitez entre une chaudière à gaz ou des radiateurs électriques&nbsp;?</Text>
      <Text className={styles.questions}>
        <strong className="pac">
          Et pourquoi pas une <UnderlineText>pompe à chaleur</UnderlineText> (PAC){" "}
          <span className={fr.cx("fr-icon--sm", "ri-information-line")} aria-hidden="true"></span>
        </strong>
        <br />
        <strong className="rcu">
          ou un raccordement au <UnderlineText>réseau de chaleur urbain</UnderlineText> (RCU){" "}
          <span className={fr.cx("fr-icon--sm", "ri-information-line")} aria-hidden="true"></span>&nbsp;?
        </strong>
      </Text>
    </div>
  </div>
);
