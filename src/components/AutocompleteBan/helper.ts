export type ItemType = {
  properties: {
    context: string;
    id: string;
    name: string;
  };
};
export const displayItem = (item: ItemType) => {
  return item.properties.name + " " + item.properties.context;
};
