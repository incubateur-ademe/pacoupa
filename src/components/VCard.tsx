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
      <div className="flex flex-col items-center p-8 border-2 border-solid border-green-800 shadow rounded-2xl h-full">
        <div>{image}</div>
        <div className="flex flex-col items-center gap-2 text-center">
          <H2 as="h6" className="mb-0">
            {title}
          </H2>
          <Text className="mb-0">{desc}</Text>
        </div>
      </div>
    </>
  );
};
