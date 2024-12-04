"use client";
import { Button } from "@/components/Button";

// Error components must be Client Components

export default function Error({ error, reset: _reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const mdxContent = localStorage.getItem("mdxContent");

  return (
    <div className="col-start-2 mt-4 p-8">
      <p>Erreur du playground</p>

      <p className="text-red-500">{error.message}</p>

      <p>Vous pouvez recharger le playground. </p>
      <p>Attention : toutes les données seront supprimées de votre navigateur.</p>

      <p>
        Pour ne pas perdre votre travail en cours, vous pouvez copier le contenu MDX ci-dessous, et corriger à la main
        en se basant sur l'erreur remontée.
      </p>

      <details>
        <summary>Détails</summary>

        <div className="py-4">
          <Button
            size="small"
            priority="secondary"
            onClick={() => {
              if (mdxContent) {
                navigator.clipboard.writeText(mdxContent).catch(console.error);
              }
            }}
          >
            Copier le code
          </Button>
        </div>
        <p>
          <pre>{mdxContent}</pre>
        </p>
      </details>

      <div className="mt-8">
        <a href={`/blog/playground?reset=true`}>Recharger le playground</a>
      </div>
    </div>
  );
}
