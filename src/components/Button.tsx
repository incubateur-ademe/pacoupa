import ButtonDsfr from "@codegouvfr/react-dsfr/Button";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type PropsWithChildren } from "react";

import styles from "./Button.module.scss";

type Props = Parameters<typeof ButtonDsfr>[0];

/**
 * Custom button for Pacoupa
 */
export const OldButton = (props: Props) => {
  return (
    <>
      <ButtonDsfr
        {...props}
        className={cx(
          props.priority === "secondary"
            ? styles.secondaryButton
            : props.priority === "tertiary" || props.priority === "tertiary no outline"
              ? styles.tertiaryButton
              : styles.primaryButton,
          props.className,
          "w-full sm:w-auto justify-center font-bold",
        )}
      >
        {props.children}
      </ButtonDsfr>
    </>
  );
};

type ButtonProps = {
  priority?: "primary" | "secondary" | "tertiary";
  size?: "medium" | "small";
} & (
  | {
      buttonProps: ButtonHTMLAttributes<HTMLButtonElement>;
      linkProps?: never;
    }
  | {
      buttonProps?: never;
      linkProps: AnchorHTMLAttributes<HTMLAnchorElement>;
    }
);

export const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { priority = "primary", size = "medium" } = props;

  const prioritySize = {
    medium: "h-[38px] px-6 py-2",
    small: "h-[30px] px-4 py-1",
  };

  const priorityStyle = {
    primary:
      "!bg-[#92e3a9] hover:!bg-[#b3ebc3] rounded shadow active:!shadow-none active:!bg-[#80b990] active:!border active:!border-[#304436] active:!border-solid",
    secondary: "bg-white hover:!bg-[#e7f6ec] active:!border active:!border-solid active:!border-[#304436]",
    tertiary: "border-b-2 border-[#304436] hover:!border-[#80b990] hover:!text-[#80b990] active:!text-[#92e3a9]",
  };

  return (
    <>
      {props.linkProps ? (
        <a
          {...props.linkProps}
          className={`justify-center items-center gap-2 inline-flex text-[#304436] font-bold ${prioritySize[size]} ${priorityStyle[priority]}`}
        >
          {props.children}
        </a>
      ) : (
        <button
          {...props.buttonProps}
          className={`justify-center items-center gap-2 inline-flex text-[#304436] font-bold ${prioritySize[size]} ${priorityStyle[priority]}`}
        >
          {props.children}
        </button>
      )}
    </>
  );
};
