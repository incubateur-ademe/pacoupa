import Checkbox from "@codegouvfr/react-dsfr/Checkbox";

export function CheckboxesWrapper<T extends string>({
  label,
  checkboxes,
  name,
  className = "[&_.fr-fieldset\\_\\_content]:grid-cols-3",
  values,
  onChange,
}: {
  checkboxes: Array<{ label: string; value: T }>;
  className?: string;
  label: React.ReactNode | string;
  name: string;
  onChange: (value: T[]) => void;
  values: T[];
}) {
  return (
    <Checkbox
      legend={label}
      className={[
        "mb-8 !text-xs [&_*]:!text-xs",
        "[&_.fr-fieldset\\_\\_content]:grid",
        "[&_label]:before:!mt-0",
        className,
      ].join(" ")}
      small
      options={checkboxes.map(checkbox => ({
        value: checkbox.value,
        label: checkbox.label,
        nativeInputProps: {
          name,
          checked: values.includes(checkbox.value),
          onChange: e => {
            if (e.target.checked) {
              onChange([...values, checkbox.value]);
            } else {
              onChange(values.filter(v => v !== checkbox.value));
            }
          },
        },
      }))}
      orientation="horizontal"
    />
  );
}
