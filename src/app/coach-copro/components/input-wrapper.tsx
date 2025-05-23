export function InputWrapper({ label, placeholder, name }: { label: string; name: string; placeholder?: string }) {
  return (
    <div className="mb-8">
      <label htmlFor={name} className="block mb-1 text-xs font-medium !text-[#4b5563]">
        {label}
      </label>
      <input
        type="text"
        className="font-inter text-xs !text-[#4b5563] w-full h-[37px] px-2 py-[11px] border-2 border-solid border-[#E3E3E3] rounded-sm"
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
}
