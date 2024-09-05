import { ErrorDisplay } from "@/components/ErrorDisplay";
import { MatomoPush } from "@/components/utils/MatomoPush";

const NotFound = () => (
  <div className="col-start-2 mt-4">
    <MatomoPush event={["trackEvent", "404", "Page non trouvée"]} />
    <ErrorDisplay code="404" />
  </div>
);

export default NotFound;
