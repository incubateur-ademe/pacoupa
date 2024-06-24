import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { type PropsWithChildren } from "react";

type Props = {
  backgroundColor?: string;
  color?: string;
  content?: React.ReactNode;
  icon?: React.ReactNode;
  title?: string;
};

export const Callout = ({ content, icon, title }: PropsWithChildren<Props>) => {
  //bg-yellow-50
  //title text-yellow-800
  //content text-yellow-700

  return (
    <div className="rounded-md p-4 pl-0">
      <div className="flex">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-3">
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          <div className={cx("text-sm", { "mt-2": !!title })}>{content}</div>
        </div>
      </div>
    </div>
  );
};
