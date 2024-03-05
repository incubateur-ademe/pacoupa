import Image from "next/image";

type Props = {
  alt: string;
  src: string;
};

export const ImageCard = ({ src, alt }: Props) => <Image src={src} alt={alt} sizes="100vw" className="h-auto w-full" />;
