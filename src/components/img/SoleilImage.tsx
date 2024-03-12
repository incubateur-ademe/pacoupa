import Image from "next/image";

import soleil from "../../../public/img/soleil.svg";

type Props = {
  height?: number;
  width?: number;
};

export function SoleilImage({ height, width }: Props) {
  return (
    <>
      <Image src={soleil as string} alt="Soleil" width={width} height={height} />
    </>
  );
}
