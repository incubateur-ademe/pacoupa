import { type PropsWithChildren } from "react";

import { H2, Text } from "@/dsfr/base/typography";

import styles from "./HCard.module.scss";

type Props = {
  desc: string;
  image: JSX.Element;
  title: string;
};

export const HCard = ({ desc, image, title }: PropsWithChildren<Props>) => {
  return (
    <>
      <div className={styles.box}>
        <div className={styles.image}>{image}</div>
        <div className={styles.text}>
          <H2>{title}</H2>
          <Text>{desc}</Text>
        </div>
      </div>
    </>
  );
};
