import { familleImageMap, typeMapCoachCopro } from "@/app/(decorated)/(center)/simulation/resultat/helper";
import { type Solution } from "@/lib/common/domain/values/Solution";

import { DetailsButton } from "./details-button";

type SolutionCardProps = {
  active?: boolean;
  description: Solution["description"];
  eligible?: boolean;
  familleSolution: Solution["familleSolution"];
  link?: string;
  onClick: () => void;
  onVoirPlusClick?: () => void;
  title: Solution["nom"];
  type: Solution["type"];
};

export function SolutionCard({
  title,
  description,
  familleSolution,
  active = false,
  eligible = false,
  onClick,
  onVoirPlusClick,
  type,
  link,
}: SolutionCardProps) {
  return (
    <button
      className={[
        "items-center px-3 py-4 rounded-lg mb-4 grid gap-x-4 xs:px-5 grid-cols-[2.5rem_1fr_1fr] text-left w-full",
        active ? "border-2 border-solid border-[#E41571]" : "shadow-custom",
      ].join(" ")}
      type="button"
      onClick={onClick}
    >
      <div className="row-span-2 col-span-1 flex items-center justify-start sm:row-span-4 sm:self-start w-10 h-10">
        {familleImageMap[familleSolution]}
      </div>
      <div className="col-span-2 flex flex-col sm:flex-row gap-x-2 sm:items-center items-start">
        <h3 className="text-lg font-bold !text-[#111827] m-0 hyphens-auto text-left">{title}</h3>
        <div className="flex items-center grow">{typeMapCoachCopro[type]}</div>
      </div>
      <p className="col-span-3 sm:col-span-2 my-2 text-base font-normal text-black mb-2">{description}</p>
      {eligible ? (
        <>
          <div className="col-span-3 sm:col-span-2">
            <span className="block text-xs font-normal text-[#111827] mb-1">Éligibilité au réseau de chaleur</span>
            <span className="block text-sm font-bold text-[#E41571]">Éligible</span>
          </div>
          <div className="col-span-3 sm:col-span-2 flex justify-end">
            <DetailsButton text="Voir la carte" className="self-end" as="a" link={link} />
          </div>
        </>
      ) : (
        <div className="col-span-3 sm:col-span-2 flex justify-end">
          <DetailsButton text="En savoir plus" className="self-end" onClick={onVoirPlusClick} />
        </div>
      )}
    </button>
  );
}

type SolutionCardSkeletonProps = {
  className?: string;
};

export function SolutionCardSkeleton({ className = "" }: SolutionCardSkeletonProps) {
  return (
    <div
      className={[
        "items-center px-3 py-4 rounded-lg mb-4 grid gap-x-4 xs:px-5 grid-cols-[2.5rem_1fr_1fr] w-full shadow-custom",
        "animate-pulse",
        className,
      ].join(" ")}
    >
      {/* Icon placeholder */}
      <div className="row-span-2 col-span-1 flex items-center justify-start sm:row-span-4 sm:self-start w-10 h-10">
        <div className="w-10 h-10 bg-gray-200 rounded"></div>
      </div>

      {/* Title and tag section */}
      <div className="col-span-2 flex flex-col sm:flex-row gap-x-2 sm:items-center items-start">
        <div className="h-7 bg-gray-200 rounded w-48 mb-2 sm:mb-0"></div>
        <div className="flex items-center grow">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
        </div>
      </div>

      {/* Description placeholder */}
      <div className="col-span-3 sm:col-span-2 my-2">
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>

      {/* Bottom section placeholder */}
      <div className="col-span-3 sm:col-span-2 flex justify-end">
        <div className="h-9 bg-gray-200 rounded w-28"></div>
      </div>
    </div>
  );
}
