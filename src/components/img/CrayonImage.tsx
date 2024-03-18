import Image from "next/image";

import crayon from "../../../public/img/crayon.svg";

type Props = {
  height?: number;
  width?: number;
};

export function CrayonImage({ height, width }: Props) {
  return (
    <>
      <Image src={crayon as string} alt="crayon" width={width} height={height} />
    </>
  );
}
