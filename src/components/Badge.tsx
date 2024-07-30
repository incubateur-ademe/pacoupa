import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { type PropsWithChildren } from "react";

export type BadgeProps = {
  icon?: string;
  label: string;
  size?: "medium" | "small";
  type?: "error" | "neutral" | "success" | "warning";
};

export const Badge = ({ label, type = "neutral", icon, size = "small" }: PropsWithChildren<BadgeProps>) => {
  return (
    <p
      className={cx(`inline-flex items-center rounded-md px-1 py-0.5 font-bold`, {
        "bg-success-300 text-success-700": type === "success",
        "bg-warning-300 text-warning-700": type === "warning",
        "bg-error-300 text-error-700": type === "error",
        "bg-gray-200 text-gray-700": type === "neutral",
        "leading-6 text-base": size === "medium",
        "uppercase leading-5 text-xs": size === "small",
      })}
    >
      {icon && <i className={cx("fr-icon--xs mr-1", icon)} />}
      {label}
    </p>
  );
};
