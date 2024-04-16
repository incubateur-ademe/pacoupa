"use client";

import { useEffect, useState } from "react";

const storeKey = "pacoupa-simulation";

export const store = {
  get: (): Record<string, string> => {
    const data = sessionStorage.getItem(storeKey);
    return data ? (JSON.parse(data) as Record<string, string>) : {};
  },

  set: (data: Record<string, string>) => {
    sessionStorage.setItem(storeKey, JSON.stringify(data));
  },

  clear: () => {
    sessionStorage.removeItem(storeKey);
  },

  update: (data: Record<string, string>) => {
    const currentData = store.get();
    store.set({ ...currentData, ...data });
  },
};

export const useStore = (): [ReturnType<typeof store.get> | undefined, boolean] => {
  const [sessionStorageOK, setSessionStorageOK] = useState(false);
  const [initialState, setInitialState] = useState<ReturnType<typeof store.get> | undefined>();

  useEffect(() => {
    setInitialState(store.get());
    setSessionStorageOK(true);
  }, []);

  return [initialState, sessionStorageOK];
};
