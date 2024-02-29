import ademe from "../../../public/img/ademe.svg";
import { ImageCard } from "./ImageCard";

export function AdemeImage() {
  return <ImageCard src={ademe as string} alt="Logo ADEME" />;
}
