import Checkbox from "@codegouvfr/react-dsfr/Checkbox";

export function CheckboxesWrapper({
  label,
  checkboxes,
  name,
  className = "[&_.fr-fieldset\\_\\_content]:grid-cols-3",
}: {
  checkboxes: string[];
  className?: string;
  label: React.ReactNode | string;
  name: string;
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
        label: checkbox,
        nativeInputProps: {
          name,
        },
      }))}
      orientation="horizontal"
    />
  );
}
