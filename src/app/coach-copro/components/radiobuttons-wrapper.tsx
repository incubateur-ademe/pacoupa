import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";

export function RadioButtonsWrapper({
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
    <RadioButtons
      legend={label}
      className={[
        "mb-8 !text-xs [&_*]:!text-[12px]", // if we put text-xs it fucks up the line heuight and the radio button layout
        "[&_.fr-fieldset\\_\\_content]:grid",
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
