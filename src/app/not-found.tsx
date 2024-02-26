import { MatomoPush } from "@/components/utils/MatomoPush";

import { ErrorDisplay } from "./ErrorDisplay";

const NotFound = () => (
  <>
    <MatomoPush event={["trackEvent", "404", "Page non trouvée"]} />
    <ErrorDisplay code="404" />
  </>
);

export default NotFound;
