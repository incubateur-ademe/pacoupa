import Image from "next/image";

import { DetailsButton } from "./details-button";
import { Tag } from "./tag";

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
          <h3 className="text-[18px] font-bold !text-[#111827] m-0 mr-2">{title}</h3>
          <Tag variant="primary" />
        </div>
        <p className="text-base font-normal text-black mb-2">{description}</p>
        {eligible ? (
          <div className="flex justify-between">
            <div>
              <span className="block text-xs font-normal text-[#111827] mb-1">Éligibilité au réseau de chaleur</span>
              <span className="block text-sm font-bold text-[#E41571]">Éligible</span>
            </div>
            <DetailsButton text="Voir la carte" className="self-end" />
          </div>
        ) : (
          <DetailsButton text="En savoir plus" className="self-end" />
        )}
      </div>
    </div>
  );
}
