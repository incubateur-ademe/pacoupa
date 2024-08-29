import { type PropsWithChildren } from "react";

const SimulationLayout = ({ children }: PropsWithChildren) => {
  return <div className="col-start-2 grid grid-cols-1 mt-6 md:mt-8">{children}</div>;
};

export default SimulationLayout;
