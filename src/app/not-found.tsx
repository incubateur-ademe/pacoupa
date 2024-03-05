import { ErrorDisplay } from "@/components/ErrorDisplay";
import { MatomoPush } from "@/components/utils/MatomoPush";

const NotFound = () => (
  <>
    <MatomoPush event={["trackEvent", "404", "Page non trouvée"]} />
    <ErrorDisplay code="404" />
  </>
);

export default NotFound;
