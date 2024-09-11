"use client"; // Error components must be Client Components

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

import { ErrorDisplay } from "@/components/ErrorDisplay";
import { MatomoPush } from "@/components/utils/MatomoPush";
import { Matomo } from "@/lib/matomo-events";

export default function Error({ error, reset: _reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="col-start-2 mt-4">
      <MatomoPush event={["trackEvent", Matomo.Category["Page d'erreur"], "Erreur serveur (500)"]} />
      <ErrorDisplay code="500" />

      {/* <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button> */}
    </div>
  );
}
