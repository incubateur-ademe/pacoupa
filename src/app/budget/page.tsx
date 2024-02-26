import { type Metadata } from "next";

import { ErrorDisplay } from "../ErrorDisplay";
import { sharedMetadata } from "../shared-metadata";

const title = "Budget";
const url = "/budget";
export const metadata: Metadata = {
  ...sharedMetadata,
  title,
  openGraph: {
    ...sharedMetadata.openGraph,
    title,
    url,
  },
  alternates: {
    canonical: url,
  },
};

const Budget = () => (
  <ErrorDisplay
    code="custom"
    title="Budget non disponible"
    headline="Désolé, cette page est toujours en construction. Les données ne sont donc pas accessibles pour l'instant."
    body="Nous travaillons activement pour vous donner de la visibilité le plus rapidement possible."
  />
);

export default Budget;
