export function InputWrapper({
  label,
  placeholder,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}) {
  return (
    <div className="mb-8">
      <label htmlFor={name} className="block mb-1 text-xs font-medium !text-[#4b5563]">
        {label}
      </label>
      <input
        type="text"
        className="font-inter text-xs !text-[#4b5563] w-full h-[37px] px-2 py-[11px] border-2 border-solid border-[#E3E3E3] rounded-sm focus:ring-[#E3E3E3] focus:ring-2 focus:ring-offset-2 !outline-[#4b5563] "
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}
