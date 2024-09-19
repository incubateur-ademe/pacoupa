import { fr } from "@codegouvfr/react-dsfr";
import { CircularProgress, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

import { Text } from "@/dsfr/base/typography";
import { isCodePostalSupporte } from "@/lib/server/useCases/getZonesClimatiques";
import { type FeatureCollection, fetchBAN } from "@/lib/services/ban";

import { Callout } from "./Callout";

const minCharactersBeforeFetching = 10;

type AutocompletBanMuiProps = { defaultInputValue?: string; errors: string[] | undefined };

export function AutocompleteBan({ defaultInputValue, errors }: AutocompletBanMuiProps) {
  const [value, setValue] = useState<FeatureCollection | null>(null);
  const [inputValue, setInputValue] = useState(defaultInputValue || "");
  const [options, setOptions] = useState<readonly FeatureCollection[]>([]);
  const [loading, setLoading] = useState(false);

  const [debouncedInputValue, setDebouncedInputValue] = useDebounceValue("", 300);

  const isCom = !value
    ? false //  at start, when no value specified
    : !value.properties.postcode
      ? true // some cases when there is no postcode
      : !isCodePostalSupporte(value.properties.postcode)
        ? true // postcode not supported, like 97, 98
        : false; // in metropolitan France

  useEffect(() => {
    setDebouncedInputValue(inputValue);
  }, [inputValue, setDebouncedInputValue]);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (defaultInputValue) {
        const proposals = (await fetchBAN(defaultInputValue)).features;

        setValue(proposals[0]);
        setOptions(proposals);
      }
    };

    fetchInitialData().catch(console.error);
  }, [defaultInputValue]);

  useEffect(() => {
    const fetchData = async () => {
      console.debug({ debouncedInputValue });

      if (debouncedInputValue.length > minCharactersBeforeFetching) {
        setLoading(true);
        const proposals = (await fetchBAN(debouncedInputValue)).features;

        console.debug({ proposals });
        setOptions(proposals);
        setLoading(false);
      }
    };

    fetchData().catch(console.error);
  }, [debouncedInputValue]);

  return (
    <>
      <Autocomplete
        id="ban-autocomplete"
        getOptionLabel={option => (typeof option === "string" ? option : option.properties.label)}
        filterOptions={x => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={value}
        aria-required="true"
        noOptionsText="Pas de résultat"
        isOptionEqualToValue={(option, value) => option.properties.label === value?.properties?.label}
        onChange={(_event: unknown, newValue: FeatureCollection | null) => {
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
              label="Quelle est votre adresse ?"
              name="adresse"
              fullWidth
              aria-required="true"
              placeholder="Ex: 8 Boulevard de la Libération, 93200 Saint-Denis"
              InputProps={{
                ...params.InputProps,
                "aria-required": true,
                "aria-invalid": Boolean(errors && errors.length),
                "aria-describedby": "adresse-error",
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
            {errors && (
              <>
                <div id="adresse-error" className={fr.cx("fr-error-text")} aria-live="polite">
                  {errors[0]}
                </div>
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
                    <Text inline key={index} className={highlight ? "font-bold" : "font-normal"}>
                      {text}
                    </Text>
                  ))}
                </Grid>
              </Grid>
            </li>
          );
        }}
      />
      {isCom && (
        <div className="mt-8">
          <Callout
            type="warning"
            content={
              <Text className="mb-0">
                Désolé, nous manquons de données climatiques pour votre ville. Les résultats pourraient être moins
                précis.
              </Text>
            }
          />
        </div>
      )}
    </>
  );
}
