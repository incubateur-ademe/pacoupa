import { id } from "tsafe";
import { useSessionStorage } from "usehooks-ts";

import { config } from "@/config";

import { type InformationsBatiment } from "../common/domain/InformationsBatiment";

export const usePacoupaSessionStorage = () => {
  const [store, setStore, resetStore] = useSessionStorage(config.storeKey, id<Partial<InformationsBatiment>>({}));

  return { store, setStore, resetStore };
};
