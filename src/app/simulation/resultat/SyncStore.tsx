"use client";

import { Base64 } from "js-base64";
import { type PropsWithChildren, useEffect } from "react";

import { usePacoupaSessionStorage } from "@/lib/client/usePacoupaSessionStorage";
import { type InformationsBatiment } from "@/lib/common/domain/InformationsBatiment";

type Props = {
  hash: string;
};

/**
 * Client component to store the simulation as a hash in the session storage.
 */
export const SyncStore = ({ hash }: PropsWithChildren<Props>) => {
  const { setStore } = usePacoupaSessionStorage();

  useEffect(() => {
    setStore(JSON.parse(Base64.decode(hash)) as InformationsBatiment);
  }, [hash, setStore]);

  return null;
};
