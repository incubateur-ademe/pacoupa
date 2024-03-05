import chaudiere from "../../../public/img/chaudiere-cassee.svg";
import { ImageCard } from "./ImageCard";

export function ChaudiereCasseeImage() {
  return (
    <>
      <ImageCard src={chaudiere as string} alt="Chaudiere en panne" />
    </>
  );
}
