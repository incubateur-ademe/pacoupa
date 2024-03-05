import accelerateur from "../../../public/img/accelerateur-ademe.svg";
import { ImageCard } from "./ImageCard";

export function AccelerateurAdemeImage() {
  return <ImageCard src={accelerateur as string} alt="Logo Accélérateur ADEME" />;
}
