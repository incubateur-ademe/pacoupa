import betagouv from "../../../public/img/betagouv.svg";
import { ImageCard } from "./ImageCard";

export function BetaGouvImage() {
  return <ImageCard src={betagouv as string} alt="Logo Beta.gouv" />;
}
