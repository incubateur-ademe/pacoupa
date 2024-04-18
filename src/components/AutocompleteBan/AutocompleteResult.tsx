import { type PropsWithChildren } from "react";

type Props = {
  proposals: ItemType[];
  selectProposal: (id: string) => void;
};

import { displayItem, type ItemType } from "./helper";
import styles from "./index.module.scss";

export const AutocompleteResult = ({ selectProposal, proposals }: PropsWithChildren<Props>) => {
  return (
    <>
      <ul className={styles.results}>
        {proposals.map(item => (
          <li key={item.properties.id}>
            <a
              href="#"
              onClick={() => {
                selectProposal(item.properties.id);
              }}
            >
              {displayItem(item)}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};
