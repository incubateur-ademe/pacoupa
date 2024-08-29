import { type PropsWithChildren } from "react";

const SimulationLayout = ({ children }: PropsWithChildren) => {
  return <div className="col-start-2 max-w-[1000px] px-2 justify-self-center">{children}</div>;
};

export default SimulationLayout;
