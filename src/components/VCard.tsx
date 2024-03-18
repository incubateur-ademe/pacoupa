import { type PropsWithChildren } from "react";

import { Box } from "@/dsfr";
import { H2, Text } from "@/dsfr/base/typography";

import styles from "./VCard.module.scss";

type Props = {
  desc: string;
  image: JSX.Element;
  title: string;
};

export const VCard = ({ desc, image, title }: PropsWithChildren<Props>) => {
  return (
    <>
      <Box className={styles.box}>
        <Box className={styles.image}>{image}</Box>
        <Box className={styles.text}>
          <H2>{title}</H2>
          <Text>{desc}</Text>
        </Box>
      </Box>
    </>
  );
};
