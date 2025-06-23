import Image from "next/image";

type ButtonProps = {
  className?: string;
  icon?: string;
  onClick?: () => void;
  text: string;
};

export function DetailsButton({ icon, text, className, onClick }: ButtonProps) {
  return (
    <button
      className={[
        "flex items-center p-0 h-[38px] border-0 border-b-2 border-solid border-[#111827] hover:!bg-transparent",
        className,
      ].join(" ")}
      onClick={onClick}
      aria-label={text}
    >
      {icon && <Image src={icon} alt="" height={16} width={16} className="mr-1" />}
      <span className="text-base font-bold text-[#111827]">{text}</span>
    </button>
  );
}
