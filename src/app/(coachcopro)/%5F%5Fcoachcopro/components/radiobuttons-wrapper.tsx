import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";

export function RadioButtonsWrapper<T extends string>({
  label,
  options,
  name,
  className = "[&_.fr-fieldset\\_\\_content]:grid-cols-3",
  onChange,
  value,
  error,
}: {
  className?: string;
  error?: string;
  label: React.ReactNode | string;
  name: string;
  onChange: (value: T) => void;
  options: Array<{ label: string; value: T }>;
  value: T;
}) {
  return (
    <div className="flex flex-col mb-8">
      <RadioButtons
        legend={label}
        className={[
          "mb-0 !text-xs [&_*]:!text-[12px]", // if we put text-xs it fucks up the line heuight and the radio button layout
          "[&_.fr-fieldset\\_\\_content]:grid",
          "[&_legend]:!mb-0 [&_legend]:!pb-2",
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
      {error && (
        <span className="text-sm bg-[#E41571] text-white">
          <b>Erreur</b> : {error}
        </span>
      )}
    </div>
  );
}
