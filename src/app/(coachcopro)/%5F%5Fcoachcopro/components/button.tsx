type Props = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "reset" | "submit";
};

export function CoachCoproButtonPrimary({ children, className, type = "button", onClick, disabled }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        "p-2 rounded-lg font-bold text-white bg-[#E41571] hover:!bg-[#E41571]/70",
        className,
        disabled && "!opacity-50 !text-white cursor-not-allowed",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export function CoachCoproButtonSecondary({ children, className, type = "button", onClick }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={["text-base font-bold !text-[#4b5563] p-2 underline hover:!bg-transparent", className].join(" ")}
    >
      {children}
    </button>
  );
}
