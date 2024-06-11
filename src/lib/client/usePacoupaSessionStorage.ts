import { id } from "tsafe";
import { useSessionStorage } from "usehooks-ts";

import { config } from "@/config";

import { type InformationBatiment } from "../common/domain/InformationBatiment";

export const usePacoupaSessionStorage = () => {
  const [store, setStore, resetStore] = useSessionStorage(config.storeKey, id<Partial<InformationBatiment>>({}));

  return { store, setStore, resetStore };
};
