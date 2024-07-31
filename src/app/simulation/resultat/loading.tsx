import { CircularProgress } from "@mui/material";

import { Box } from "@/dsfr";
import { Text } from "@/dsfr/base/typography";

export default function Loading() {
  return (
    <>
      <div className="mt-16 text-center">
        <CircularProgress color="inherit" size={50} />
        <Text variant="xl" className="mt-8">
          Chargement...
        </Text>
      </div>
    </>
  );
}
