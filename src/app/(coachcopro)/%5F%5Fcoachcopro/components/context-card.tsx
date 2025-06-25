type ContextCardProps = {
  active?: boolean;
  description: string;
  imageSrc: string;
  onClick: () => void;
  title: string;
};

export function ContextCard({ title, description, imageSrc, active = false, onClick }: ContextCardProps) {
  return (
    <button
      type="button"
      className={[
        "items-center px-3 py-4 rounded-lg mb-4 grid gap-4 xs:px-5 grid-cols-[3.5rem_1fr]",
        active ? "border-2 border-solid border-[#E41571]" : "shadow-custom",
      ].join(" ")}
      onClick={onClick}
    >
      <div className="col-span-1 flex items-center justify-start sm:row-span-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageSrc} alt={`icône pour illustrer le contexte ${title}`} className="w-full max-w-14 min-w-12" />
      </div>
      <h3 className="text-lg font-bold !text-[#111827] m-0 hyphens-auto">{title}</h3>
      <p className="col-span-2 sm:col-span-1 whitespace-pre-line max-w-96 hyphens-auto text-base font-normal text-[#111827] m-0">
        {description}
      </p>
    </button>
  );
}
