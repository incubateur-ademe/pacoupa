"use client";

import Input from "@codegouvfr/react-dsfr/Input";
import Head from "next/head";
import { useState } from "react";

import { Button } from "@/components/Button";
import { H2, H3 } from "@/dsfr/base/typography";

export default function Page() {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    throw new Error(value);
  };

  return (
    <section className="col-start-2 mt-4">
      <Head>
        <title>Debug</title>
        <meta name="description" content="Informations" />
      </Head>

      <main className="min-h-full flex flex-col justify-center items-center">
        <H2>Page de debug</H2>
        <div className="grid grid-cols-[200px_1fr]">
          <H3>Sentry</H3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 items-center gap-4">
              <Input
                label="Message à envoyer"
                nativeInputProps={{
                  name: "message",
                  placeholder: "Ping!",
                  value: value,
                  onChange: handleChange,
                }}
              />

              <Button type="submit" className="btn btn-primary px-4 py-2 rounded-lg text-white">
                Envoyer
              </Button>
            </div>
          </form>
        </div>
      </main>
    </section>
  );
}
