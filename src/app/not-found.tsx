import { ErrorDisplay } from "@/components/ErrorDisplay";
import { MatomoPush } from "@/components/utils/MatomoPush";
import { matomoCategory } from "@/lib/matomo-events";

const NotFound = () => (
  <div className="col-start-2 mt-4">
    <MatomoPush event={["trackEvent", matomoCategory.erreur, "Page non trouvée (404)"]} />
    <ErrorDisplay code="404" />
  </div>
);

export default NotFound;
