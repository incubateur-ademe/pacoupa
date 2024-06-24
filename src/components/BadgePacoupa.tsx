import { type PropsWithChildren } from "react";

type Props = {
  label: string;
};

export const BadgePacoupa = ({ label }: PropsWithChildren<Props>) => {
  return (
    <>
      <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
        {label}
      </span>
    </>
  );
};
