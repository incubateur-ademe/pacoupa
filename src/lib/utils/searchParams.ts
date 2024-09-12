import { type ReadonlyURLSearchParams } from "next/navigation";

type PropsCreateSearchParams = {
  name: string;
  searchParams: ReadonlyURLSearchParams;
  value: string;
};

/**
 * Override the search params with another key/value pair.
 */
export const createSearchParams = ({ searchParams, name, value }: PropsCreateSearchParams) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(name, value);

  return params.toString();
};
