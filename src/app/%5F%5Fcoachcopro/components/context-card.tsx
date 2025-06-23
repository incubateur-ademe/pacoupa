import Image from "next/image";

type ContextCardProps = {
  active?: boolean;
  description: string;
  imageSrc: string;
  title: string;
};

export function ContextCard({ title, description, imageSrc, active = false }: ContextCardProps) {
  return (
    <div
      className={`flex items-center px-5 py-[16px] rounded-lg mb-4 ${
        active ? "border-2 border-solid border-[#E41571]" : "shadow-custom"
      }`}
    >
      <Image src={imageSrc} alt="" width={56} height={56} className="mr-[16px]" />
      <div>
        <h3 className="text-[18px] font-bold !text-[#111827] mb-1">{title}</h3>
        <p className="whitespace-pre-line text-base font-normal text-[#111827] m-0">{description}</p>
      </div>
    </div>
  );
}
