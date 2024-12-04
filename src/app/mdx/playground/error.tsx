"use client"; // Error components must be Client Components

export default function Error({ error, reset: _reset }: { error: Error & { digest?: string }; reset: () => void }) {
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

        <p>
          <pre>{localStorage.getItem("mdxContent")}</pre>
        </p>
      </details>

      <div className="mt-8">
        <a href={`/mdx/playground?reset=true`}>Recharger le playground</a>
      </div>
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
