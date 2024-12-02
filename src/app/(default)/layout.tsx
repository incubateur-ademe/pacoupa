import { type PropsWithChildren } from "react";

const SimulationLayout = ({ children }: PropsWithChildren) => {
  return <div className="col-start-2 grid grid-cols-1 mt-6 md:mt-8 pt-4">{children}</div>;
};

export default SimulationLayout;
