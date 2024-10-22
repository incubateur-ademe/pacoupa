import { Text } from "@/dsfr/base/typography";
import { type GesteIsolation } from "@/lib/common/domain/values/GesteIsolation";

import { ShowIsolationImages } from "./ShowIsolationImages";

type Props = {
  gestes: GesteIsolation[];
};

export const Isolation = ({ gestes }: Props) => {
  return (
    <>
      <Text className="mb-2">Isolations à prévoir</Text>

      <div className="mt-4 flex justify-center gap-8">
        <ShowIsolationImages gestes={gestes} />
      </div>
    </>
  );
};
