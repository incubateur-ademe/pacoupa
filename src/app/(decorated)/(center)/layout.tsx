import { type PropsWithChildren } from "react";

const GridLayout = ({ children }: PropsWithChildren) => {
  return <div className="col-start-2 mt-6 md:mt-8 pt-4">{children}</div>;
};

export default GridLayout;
