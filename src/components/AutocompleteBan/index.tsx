import { type ChangeEvent, type PropsWithChildren, useCallback, useEffect, useState } from "react";

import { AutocompleteResult, type ItemType } from "./AutocompleteResult";

type Props = {
  maxResults?: number;
  minCharacters?: number;
};

import { useDebounceValue } from "usehooks-ts";

import styles from "./index.module.scss";

const URL_BAN = "https://api-adresse.data.gouv.fr/search/";

export const AutocompleteBan = (props: PropsWithChildren<Props>) => {
  const [state, setState] = useState({ query: "", results: [] as ItemType[] });
  const [debouncedQuery, setDebouncedQuery] = useDebounceValue("", 1500);

  useEffect(() => {
    setDebouncedQuery(state.query);
  }, [setDebouncedQuery, state.query]);

  const maxResults = props.maxResults ?? 7;
  const minCharacters = props.minCharacters ?? 3;

  const getResults = useCallback(async () => {
    if (debouncedQuery.length < minCharacters) return;

    const searchParams = new URLSearchParams({
      q: debouncedQuery,
      limit: maxResults.toString(),
      type: "housenumber",
      autocomplete: "1",
    });

    const banRequest = new Request(URL_BAN + "?" + searchParams.toString());

    await fetch(banRequest)
      .then(res => res.json() as Promise<{ features: ItemType[]; query: string }>)
      .then(json => {
        console.log("dans fetch", JSON.stringify(json, null, 2));

        setState(state => ({ ...state, results: json.features }));
      })
      .catch(err => {
        console.error("Erreur réseau lors de l'appel à la BAN", err);
        throw new Error("Erreur réseau lors de l'appel à la BAN");
      });
  }, [maxResults, minCharacters, debouncedQuery]);

  useEffect(() => {
    void getResults();
  }, [state.query, getResults]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState(state => ({ ...state, query: event.target.value }));
  };

  const selectResult = (id: string) => {
    const getById = (item: ItemType) => {
      return item.properties.id === id;
    };
    const currentResult = state.results.filter(getById)[0];
    const currentAddressTemplated = templateQuery(currentResult);
    setState({ results: [], query: currentAddressTemplated });
  };

  const templateQuery = (item: ItemType) => {
    return item.properties.name + " " + item.properties.context;
  };

  return (
    <>
      <div className={styles.banSearch}>
        <input className={styles.searchBox} type="text" value={state.query} onChange={handleChange} />
        <AutocompleteResult results={state.results} selectResult={selectResult} />
      </div>
    </>
  );
};
