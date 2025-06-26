import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";

export function RadioButtonsWrapper<T extends string>({
  label,
  options,
  name,
  className = "[&_.fr-fieldset\\_\\_content]:grid-cols-3",
  onChange,
  value,
}: {
  className?: string;
  label: React.ReactNode | string;
  name: string;
  onChange: (value: T) => void;
  options: Array<{ label: string; value: T }>;
  value: T;
}) {
  return (
    <RadioButtons
      legend={label}
      className={[
        "mb-8 !text-xs [&_*]:!text-[12px]", // if we put text-xs it fucks up the line heuight and the radio button layout
        "[&_.fr-fieldset\\_\\_content]:grid",
        className,
      ].join(" ")}
      small
      options={options.map(option => ({
        label: option.label,
        value: option.value,
        nativeInputProps: {
          name,
          value: option.value,
          checked: value === option.value,
          onChange: () => onChange(option.value),
        },
      }))}
      orientation="horizontal"
    />
  );
}
