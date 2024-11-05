"use client";

import { useEffect, useRef } from "react";

import { config } from "@/config";
import { useConsent } from "@/consentManagement";
import { useScrollTop } from "@/lib/client/useScrollTop";

export const DetailContact = () => {
  useScrollTop();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { finalityConsent } = useConsent();

  useEffect(() => {
    if (finalityConsent?.tally) {
      if (iframeRef.current) {
        iframeRef.current.src = `https://tally.so/embed/${config.tally.contact.id}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;
      }
    }
  }, [finalityConsent?.tally]);

  return (
    <>
      {finalityConsent?.tally ? (
        <div className="border border-solid border-body-700 shadow rounded-lg px-16 pb-8">
          <iframe ref={iframeRef} loading="eager" width="100%" height="100%" title="Page de contact" allowFullScreen />
        </div>
      ) : (
        <div>
          <a href="mailto:pacoupa@beta.gouv.fr">Écrire à l'équipe Pacoupa</a>
        </div>
      )}
    </>
  );
};
