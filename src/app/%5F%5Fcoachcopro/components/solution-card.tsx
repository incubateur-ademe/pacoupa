import Image from "next/image";

type SolutionCardProps = {
  active?: boolean;
  description: string;
  eligible?: boolean;
  imageSrc: string;
  title: string;
};

export function SolutionCard({ title, description, imageSrc, active = false, eligible = false }: SolutionCardProps) {
  return (
    <div className={`flex p-4 rounded-lg mb-4 ${active ? "border-2 border-solid border-[#E41571]" : "shadow-custom"}`}>
      <Image src={imageSrc} alt="" width={40} height={40} className="mr-[16px]" />
      <div className="flex flex-col">
        <div className="flex items-center mb-1">
          <h3 className="text-[18px] leading-[1.6] font-bold m-0 mr-2">{title}</h3>
          <div className="leading-[1.2] p-1 text-[12px] font-bold uppercase bg-[#f3f4f6] !rounded-1">Collectif</div>
        </div>
        <p className="text-base font-normal mb-2">{description}</p>
        <button className="p-0 h-[38px] self-end text-base font-bold text-[#111827] border-0 border-b-2 border-solid border-[#111827] hover:!bg-transparent">
          {eligible ? "Voir la carte" : "En savoir plus"}
        </button>
      </div>
    </div>
  );
}
