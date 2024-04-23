// import LocationOnIcon from "@mui/icons-material/LocationOn";
import { fr } from "@codegouvfr/react-dsfr";
import { Box, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

const URL_BAN = "https://api-adresse.data.gouv.fr/search/";

const defaultMaxResults = 7;
const minCharactersBeforeFetching = 10;

export type BanItemType = {
  properties: {
    city: string;
    citycode: string;
    context: string;
    housenumber: string;
    id: string;
    importance: number;
    label: string;
    name: string;
    postcode: "44260";
    score: number;
    street: string;
    type: string;
    x: number;
    y: number;
  };
};

const fetchBAN = async (query: string): Promise<{ features: BanItemType[] }> => {
  const searchParams = new URLSearchParams({
    q: query,
    limit: defaultMaxResults.toString(),
    type: "housenumber",
    autocomplete: "1",
  });

  const banRequest = new Request(URL_BAN + "?" + searchParams.toString());

  try {
    const result = await fetch(banRequest);
    const proposals = (await result.json()) as Promise<{ features: BanItemType[] }>;
    return proposals;
  } catch (err) {
    console.error("Erreur réseau lors de l'appel à la BAN", err);
    throw new Error("Erreur réseau lors de l'appel à la BAN");
  }
};

type AutocompletBanMuiProps = { defaultValue?: string; errors: string[] | undefined };

export function AutocompleteBan({ defaultValue, errors }: AutocompletBanMuiProps) {
  const [value, setValue] = useState<BanItemType | null>(null);
  const [inputValue, setInputValue] = useState(defaultValue || "");
  const [options, setOptions] = useState<readonly BanItemType[]>([]);

  const [debouncedInputValue, setDebouncedInputValue] = useDebounceValue("", 300);

  useEffect(() => {
    setDebouncedInputValue(inputValue);
  }, [inputValue, setDebouncedInputValue]);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (defaultValue) {
        const proposals = (await fetchBAN(defaultValue)).features;

        console.debug("dans load initial", { proposals });

        setValue(proposals[0]);
        setOptions(proposals);
      }
    };

    fetchInitialData().catch(console.error);
  }, [defaultValue]);

  useEffect(() => {
    const fetchData = async () => {
      console.debug({ debouncedInputValue });

      if (debouncedInputValue.length > minCharactersBeforeFetching) {
        const proposals = (await fetchBAN(debouncedInputValue)).features;

        console.debug({ proposals });
        setOptions(proposals);
      }
    };

    fetchData().catch(console.error);
  }, [debouncedInputValue]);

  return (
    <Autocomplete
      id="ban-autocomplete"
      sx={{ width: 800 }}
      getOptionLabel={option => (typeof option === "string" ? option : option.properties.label)}
      filterOptions={x => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      aria-required="true"
      noOptionsText="Pas de résultat"
      isOptionEqualToValue={(option, value) => option.properties.label === value.properties.label}
      onChange={(_event: unknown, newValue: BanItemType | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(_event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={params => (
        <>
          <TextField
            {...params}
            label="Où se situe le bâtiment ?"
            name="adresse"
            fullWidth
            aria-required="true"
            inputProps={{
              ...params.inputProps,
              "aria-required": "true",
              "aria-invalid": errors && errors.length ? "true" : "false",
              "aria-describedby": "adresse-error",
            }}
          />
          {errors && (
            <>
              <Box id="adresse-error" className={fr.cx("fr-error-text")}>
                {errors[0]}
              </Box>
            </>
          )}
        </>
      )}
      renderOption={(props, option) => {
        if (!inputValue) return null;

        // Make words matching the input bold.
        const matches = match(option.properties.label, inputValue);
        const parts = parse(option.properties.label, matches);

        // @ts-expect-error - `key` is provided by Autocomplete and React doesn't want to pass it with spread props.
        const { key: _key, ...rest } = props;

        return (
          <li key={option.properties.label} {...rest}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: "flex", width: 44 }}>
                <i className={fr.cx("fr-icon-map-pin-2-fill")} />
              </Grid>
              <Grid item sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}>
                {parts.map(({ text, highlight }, index) => (
                  <Box key={index} component="span" sx={{ fontWeight: highlight ? "bold" : "regular" }}>
                    {text}
                  </Box>
                ))}
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
