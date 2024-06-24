import { type ReadonlyURLSearchParams } from "next/navigation";

type PropsCreateSearchParams<T> = {
  baseSearchParams: ReadonlyURLSearchParams;
  name: string;
  value: T;
};

export const createSearchParams = <T extends string>({ baseSearchParams, name, value }: PropsCreateSearchParams<T>) => {
  const params = new URLSearchParams(baseSearchParams.toString());
  params.set(name, value);

  return params.toString();
};
