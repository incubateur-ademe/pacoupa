type TagVariant = "primary" | "secondary";

const variantStyles = {
  primary: "text-[#111827] bg-[#F3F4F6]",
  secondary: "text-[#600B31] bg-[#FFE8F2]",
} as const;

export function Tag({ variant = "primary" }: { variant?: TagVariant }) {
  return <span className={`text-xs font-bold uppercase p-1 rounded-sm ${variantStyles[variant]}`}>Collectif</span>;
}
