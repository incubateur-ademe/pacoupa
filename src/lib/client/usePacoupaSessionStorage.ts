import { id } from "tsafe";
import { useSessionStorage } from "usehooks-ts";

import { type SimulationSchema } from "@/app/simulation/schema";
import { config } from "@/config";

export const usePacoupaSessionStorage = () => {
  const [store, setStore, resetStore] = useSessionStorage(config.storeKey, id<Partial<SimulationSchema>>({}));

  return { store, setStore, resetStore };
};
