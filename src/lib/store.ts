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
