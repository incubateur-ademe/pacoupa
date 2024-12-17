import Image from "next/image";

type Props = {
  alt?: string;
  src: string;
};

/**
 * Image component for MDX file.
 *
 * NB: the images must be in the `public/img/blog` folder.
 *
 * Ex:
 * <MdxImage src="aaron-burden-bcn5fhJGtD8-unsplash.jpg" alt="Photo of project X"/>
 */
export const MdxImage = ({ src, alt }: Props) => {
  return (
    <div className="mb-8 relative w-full h-[400px]">
      <Image
        src={"/img/blog/" + src}
        alt={alt ?? "Image de décoration de l'article"}
        fill
        className="rounded-lg object-contain"
      />
    </div>
  );
};
