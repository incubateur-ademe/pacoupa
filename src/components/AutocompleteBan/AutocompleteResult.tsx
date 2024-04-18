import { type PropsWithChildren } from "react";

type Props = {
  results: ItemType[];
  selectResult: (id: string) => void;
};

export type ItemType = {
  properties: {
    context: string;
    id: string;
    name: string;
  };
};

import styles from "./index.module.scss";

export const AutocompleteResult = ({ selectResult, results }: PropsWithChildren<Props>) => {
  const renderItem = (item: ItemType) => {
    return (
      <li>
        <a
          href="#"
          onClick={e => {
            selectResult(item.properties.id);
          }}
        >
          {item.properties.name}, {item.properties.context}
        </a>
      </li>
    );
  };

  // const selectOption = (id: number) => {
  //   return () => {
  //     selectResult();
  //   };
  // };

  return (
    <>
      <ul className={styles.results}>{results.map(renderItem)}</ul>
    </>
  );
};
