import Input from "@codegouvfr/react-dsfr/Input";
import { type ChangeEvent, type PropsWithChildren, type ReactNode, useEffect, useReducer } from "react";
import { useDebounceValue } from "usehooks-ts";

import { AutocompleteResult } from "./AutocompleteResult";
import { displayItem, type ItemType } from "./helper";

const URL_BAN = "https://api-adresse.data.gouv.fr/search/";

const defaultMaxResults = 7;

const initialState = { query: "" as string, proposals: [] as ItemType[], selected: false };

type State = typeof initialState;

type Action =
  | {
      proposals: ItemType[];
      type: "setProposals";
    }
  | {
      type: "reset";
    }
  | { proposal: string; type: "selectProposal" }
  | { query: string; type: "changeQuery" };

const reducer = (state: State, action: Action) => {
  console.log("reducer", JSON.stringify(action, null, 2));

  switch (action.type) {
    case "setProposals": {
      return { ...state, proposals: action.proposals, selected: false };
    }
    case "reset": {
      return { proposals: [], query: "", selected: false };
    }
    case "selectProposal": {
      return { proposals: [], query: action.proposal, selected: true };
    }
    case "changeQuery": {
      return { ...state, query: action.query, selected: false };
    }
    default:
      throw new Error("Error in reducer");
  }
};

const fetchBAN = async (query: string): Promise<{ features: ItemType[] }> => {
  const searchParams = new URLSearchParams({
    q: query,
    limit: defaultMaxResults.toString(),
    type: "housenumber",
    autocomplete: "1",
  });

  const banRequest = new Request(URL_BAN + "?" + searchParams.toString());

  try {
    const result = await fetch(banRequest);
    const proposals = (await result.json()) as Promise<{ features: ItemType[] }>;
    return proposals;
  } catch (err) {
    console.error("Erreur réseau lors de l'appel à la BAN", err);
    throw new Error("Erreur réseau lors de l'appel à la BAN");
  }
};

type AutocompleteBanProps = {
  defaultValue?: string;
  error?: ReactNode;
  maxResults?: number;
  minCharacters?: number;
};

export const AutocompleteBan = (props: PropsWithChildren<AutocompleteBanProps>) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...(props.defaultValue && { query: props.defaultValue, selected: true }),
  });
  const [debouncedQuery, setDebouncedQuery] = useDebounceValue("", 500);

  useEffect(() => {
    if (!state.selected) setDebouncedQuery(state.query);
  }, [setDebouncedQuery, state.query, state.selected]);

  useEffect(() => {
    const fetchData = async () => {
      const proposals = (await fetchBAN(debouncedQuery)).features;
      dispatch({ type: "setProposals", proposals });
    };

    fetchData().catch(console.error);
  }, [debouncedQuery]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "changeQuery", query: event.target.value });
  };

  const selectProposal = (id: string) => {
    const getById = (item: ItemType) => {
      return item.properties.id === id;
    };
    const currentResult = state.proposals.filter(getById)[0];
    const currentAddressTemplated = displayItem(currentResult);
    dispatch({ type: "selectProposal", proposal: currentAddressTemplated });
  };

  return (
    <>
      <Input
        iconId="fr-icon-map-pin-2-fill"
        label="Adresse"
        nativeInputProps={{
          value: state.query,
          onChange: handleChange,
          placeholder: "Adresse du bâtiment",
          name: "adresse",
          defaultValue: props.defaultValue,
        }}
        state={props.error ? "error" : "default"}
        stateRelatedMessage={props.error}
      />
      {!state.selected && <AutocompleteResult proposals={state.proposals} selectProposal={selectProposal} />}
    </>
  );
};
