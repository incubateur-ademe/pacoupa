import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { type PropsWithChildren } from "react";

type Props = {
  icon?: string;
  type?: "green" | "neutral" | "sand";
  value: number;
};

export const BadgeEuros = ({ value, type = "neutral", icon }: PropsWithChildren<Props>) => {
  return (
    <>
      <span
        className={cx("inline-flex items-center rounded-md px-1 py-0.5 text-xs font-medium uppercase leading-6", {
          "bg-green-100 text-green-700": type === "green",
          "bg-yellow-100 text-yellow-700": type === "sand",
          "bg-gray-200 text-gray-700": type === "neutral",
        })}
      >
        {icon && <i className={cx("fr-icon--xs mr-1", icon)} />}
        <span className="font-bold text-base">
          {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(
            value,
          )}
        </span>
      </span>
    </>
  );
};
