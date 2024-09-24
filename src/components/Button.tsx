import ButtonDsfr from "@codegouvfr/react-dsfr/Button";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";

type Props = Parameters<typeof ButtonDsfr>[0];

/**
 * Custom button for Pacoupa
 */
export const Button = (props: Props) => {
  const { priority = "primary" } = props;

  return (
    <>
      <ButtonDsfr
        {...props}
        className={cx("justify-center items-center gap-2 inline-flex text-[#304436] font-bold", props.className, {
          "!bg-[#92e3a9] hover:!bg-[#b3ebc3] rounded shadow active:!shadow-none active:!bg-[#80b990] active:!border active:!border-[#304436] active:!border-solid":
            priority === "primary",
          "bg-white hover:!bg-[#e7f6ec] rounded shadow border border-solid border-[#304436]": priority === "secondary",
          "border-b-2 border-t-0 border-x-0 border-solid border-[#304436] hover:!border-[#80b990] hover:!text-[#80b990] active:!text-[#92e3a9] shadow-none px-0 bg-transparent hover:!bg-transparent active:!bg-transparent active:!border-transparent":
            priority === "tertiary",
        })}
      >
        {props.children}
      </ButtonDsfr>
    </>
  );
};
