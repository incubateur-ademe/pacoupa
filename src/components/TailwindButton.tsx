import { type PropsWithChildren } from "react";

type Props = {
  className?: string;
};

export const TailwindButton = ({ children, className }: PropsWithChildren<Props>) => {
  return (
    <>
      <button
        className={`bg-primary-500 rounded shadow text-body-700 transition-[background-color] duration-[0.1s,transform] delay-[0.1s] hover:!bg-primary-300 hover:text-body-700 active:!bg-primary-700 active:shadow active:translate-y-0.5 appearance-none cursor-pointer m-0 border-none focus:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-100 items-center inline-flex flex-row text-base font-medium leading-6 min-h-10 w-fit px-4 py-2 disabled:bg-neutral-200 ${className}`}
      >
        {children}
      </button>
    </>
  );
};
