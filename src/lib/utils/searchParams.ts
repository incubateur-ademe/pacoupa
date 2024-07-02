import { type ReadonlyURLSearchParams } from "next/navigation";

type PropsCreateSearchParams<T extends string> = {
  name: string;
  searchParams: ReadonlyURLSearchParams;
  value: T;
};

/**
 * Override the search params with another key/value pair.
 */
export const createSearchParams = <T extends string>({ searchParams, name, value }: PropsCreateSearchParams<T>) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(name, value);

  return params.toString();
};
