import Image from "next/image";

type ButtonProps = {
  as?: "a" | "button" | "div";
  className?: string;
  icon?: string;
  link?: string;
  onClick?: () => void;
  text: string;
};

const className =
  "cursor-pointer inline-flex items-center p-0 h-[38px] border-0 border-b-2 border-solid border-[#111827] hover:!bg-transparent";

export function DetailsButton({ icon, text, className: classNameProp, onClick, as, link }: ButtonProps) {
  if (as === "a") {
    return (
      <a
        href={link}
        className={[className, "bg-none no-underline! shadow-none bg-transparent", classNameProp].join(" ")}
        target="_blank"
        rel="noopener noreferrer"
      >
        {icon && <Image src={icon} alt="" height={16} width={16} className="mr-1" />}
        <span className="text-base font-bold text-[#111827]">{text}</span>
      </a>
    );
  }

  if (as === "button") {
    return (
      <button className={[className, classNameProp].join(" ")} onClick={onClick}>
        {icon && <Image src={icon} alt="" height={16} width={16} className="mr-1" />}
        <span className="text-base font-bold text-[#111827]">{text}</span>
      </button>
    );
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      className={["cursor-pointer inline-flex", classNameProp, className].join(" ")}
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
