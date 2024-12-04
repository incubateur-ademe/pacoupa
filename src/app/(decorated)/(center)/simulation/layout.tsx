import { type PropsWithChildren } from "react";

const SimulationLayout = ({ children }: PropsWithChildren) => {
  return <div className="max-w-[1000px] justify-self-center">{children}</div>;
};

export default SimulationLayout;
