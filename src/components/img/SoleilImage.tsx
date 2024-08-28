import Image from "next/image";

import soleil from "../../../public/img/soleil.svg";

export function SoleilImage() {
  return (
    <>
      <Image src={soleil as string} alt="Soleil" className="w-full h-auto" />
    </>
  );
}
