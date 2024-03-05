import hero from "../../../public/img/hero.svg";
import { ImageCard } from "./ImageCard";

export function HeroImage() {
  return <ImageCard src={hero as string} alt="Immeuble à la loupe" />;
}
