import Image from "next/image";

type ButtonProps = {
  className?: string;
  icon?: string;
  onClick?: () => void;
  text: string;
};

export function DetailsButton({ icon, text, className, onClick }: ButtonProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      className={[
        "flex items-center p-0 h-[38px] border-0 border-b-2 border-solid border-[#111827] hover:!bg-transparent",
        className,
      ].join(" ")}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={text}
      role="button"
    >
      {icon && <Image src={icon} alt="" height={16} width={16} className="mr-1" />}
      <span className="text-base font-bold text-[#111827]">{text}</span>
    </div>
  );
}
