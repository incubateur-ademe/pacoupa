import marianne from "../../../public/img/marianne.svg";
import { ImageCard } from "./ImageCard";

export function MarianneImage() {
  return (
    <>
      <ImageCard src={marianne as string} alt="Logo Marianne" />
    </>
  );
}
