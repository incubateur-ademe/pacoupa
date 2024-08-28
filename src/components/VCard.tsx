import { type PropsWithChildren } from "react";

import { H2, Text } from "@/dsfr/base/typography";

type Props = {
  desc: string;
  image: JSX.Element;
  title: string;
};

export const VCard = ({ desc, image, title }: PropsWithChildren<Props>) => {
  return (
    <>
      <div className="flex flex-col items-center pt-8 border-2 border-solid border-green-800 shadow  rounded-2xl h-full">
        <div>{image}</div>
        <div className="flex flex-col p-8 items-center gap-3 text-center">
          <H2 as="h5">{title}</H2>
          <Text>{desc}</Text>
        </div>
      </div>
    </>
  );
};
