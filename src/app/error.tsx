"use client"; // Error components must be Client Components

import { useEffect } from "react";

import { ErrorDisplay } from "@/components/ErrorDisplay";
import { MatomoPush } from "@/components/utils/MatomoPush";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <MatomoPush event={["trackEvent", "500", "Erreur serveur"]} />
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
