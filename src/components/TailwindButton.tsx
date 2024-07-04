import { type PropsWithChildren } from "react";

type Props = {
  className?: string;
};

export const TailwindButton = ({ children, className }: PropsWithChildren<Props>) => {
  return (
    <>
      <button
        className={`bg-green-200 rounded shadow text-green-700 transition-[background-color] duration-[0.1s,transform] delay-[0.1s] hover:!bg-green-100 hover:text-green-700 active:!bg-green-500 active:shadow active:translate-y-0.5 appearance-none cursor-pointer m-0 border-none focus:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-100 items-center inline-flex flex-row text-base font-medium leading-6 min-h-10 w-fit px-4 py-2 disabled:bg-neutral-200 ${className}`}
      >
        {children}
      </button>
    </>
  );
};
