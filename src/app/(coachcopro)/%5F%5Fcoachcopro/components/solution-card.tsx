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
    <div
      className={[
        "items-center px-3 py-4 rounded-lg mb-4 grid gap-x-4 xs:px-5 grid-cols-[2.5rem_1fr_1fr]",
        active ? "border-2 border-solid border-[#E41571]" : "shadow-custom",
      ].join(" ")}
    >
      <div className="row-span-2 col-span-1 flex items-center justify-start sm:row-span-4 sm:self-start w-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageSrc} alt={`icône pour illustrer le contexte ${title}`} className="w-full" />
      </div>
      <div className="col-span-2 flex flex-col sm:flex-row gap-x-2 sm:items-center items-start">
        <h3 className="text-lg font-bold !text-[#111827] m-0 hyphens-auto">{title}</h3>
        <Tag variant="primary" />
      </div>
      <p className="col-span-3 sm:col-span-2 my-2 text-base font-normal text-black mb-2">{description}</p>
      {eligible ? (
        <>
          <div className="col-span-3 sm:col-span-2">
            <span className="block text-xs font-normal text-[#111827] mb-1">Éligibilité au réseau de chaleur</span>
            <span className="block text-sm font-bold text-[#E41571]">Éligible</span>
          </div>
          <div className="col-span-3 sm:col-span-2 flex justify-end">
            <DetailsButton text="Voir la carte" className="self-end" />
          </div>
        </>
      ) : (
        <div className="col-span-3 sm:col-span-2 flex justify-end">
          <DetailsButton text="En savoir plus" className="self-end" />
        </div>
      )}
    </div>
  );
}
