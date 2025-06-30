import { CircularProgress } from "@mui/material";

import { Text } from "@/dsfr/base/typography";

export default function Loader({ text = "Chargement..." }: { text?: string }) {
  return (
    <>
      <div className="mt-16 text-center">
        <CircularProgress color="inherit" size={50} />
        <Text variant="xl" className="mt-8">
          {text}
        </Text>
      </div>
    </>
  );
}
