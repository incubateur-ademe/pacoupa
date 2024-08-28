import { type PropsWithChildren } from "react";

import { H2, Text } from "@/dsfr/base/typography";

type Props = {
  desc: string;
  image: JSX.Element;
  title: string;
};

export const HCard = ({ desc, image, title }: PropsWithChildren<Props>) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:gap-8 border-2 border-solid border-green-800 shadow p-4 sm:p-8 rounded-2xl">
        <div>{image}</div>
        <div className="flex flex-col gap-3">
          <H2 as="h5" className="text-pretty mb-0">
            {title}
          </H2>
          <Text className="mb-0">{desc}</Text>
        </div>
      </div>
    </>
  );
};
