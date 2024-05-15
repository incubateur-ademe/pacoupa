"use client";

import { init, push } from "@socialgouv/matomo-next";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { config } from "@/config";

export type MatomoProps = Pick<typeof config, "env"> & { nonce?: string };

// Set optin tracking. This seemms reasonable since Matomo is configured with no cookies and it stores no personnal data.
// If some privacy issues are found, we'll use useConsent as commented below and add a consent banner.
const matomoConsent = true;

/**
 * Handle Matomo init and consent.
 *
 * Uses `useSearchParams()` internally, must be Suspense-d in server component.
 */
export const Matomo = ({ env, nonce }: MatomoProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // const { finalityConsent } = useConsent();
  // const matomoConsent = finalityConsent?.matomo;
  const [initialized, setInitialized] = useState(false);
  const [previousPath, setPreviousPath] = useState("");

  useEffect(() => {
    // if (env === "dev") {
    //   return;
    // }

    if (!initialized) {
      init({
        ...config.matomo,
        disableCookies: true,
        nonce,
        onInitialization: () => {
          // Tracking by default.
          // push(["optUserOut"]);

          // Tracking without cookies.
          push(["disableCookies"]);
          // push(["requireCookieConsent"]);

          // People may have configured their browser with DoNotTrack feature. Their preferences will be respected.
          push(["setDoNotTrack", "true"]);

          // Time on page tracking enabled.
          push(["enableHeartBeatTimer"]);
          push(["disableQueueRequest"]);
          push(["disablePerformanceTracking"]);
        },
      });
      setInitialized(true);
    }

    // if (matomoConsent) {
    //   console.debug("Activation des cookies Matomo.");
    //   push(["forgetUserOptOut"]);
    //   push(["rememberCookieConsentGiven"]);
    // } else {
    //   console.debug("Désactivation des cookies Matomo.");
    //   push(["optUserOut"]);
    //   push(["forgetCookieConsentGiven"]);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- don't listen on inited
  }, [env]);

  /* The @socialgouv/matomo-next does not work with next 13, so we need to handle by ourselves */
  useEffect(() => {
    // if (!pathname || !matomoConsent || env === "dev") {
    if (!pathname || !matomoConsent) {
      return;
    }

    if (!previousPath) {
      return setPreviousPath(pathname);
    }

    push(["setReferrerUrl", `${previousPath}`]);
    setPreviousPath(pathname);
    // In order to ensure that the page title had been updated,
    // we delayed pushing the tracking to the next tick.
    setTimeout(() => {
      if (pathname.startsWith("/recherche")) {
        push(["trackSiteSearch", searchParams?.get("keyword") ?? searchParams?.get("query") ?? ""]);
      } else {
        console.debug("Matomo tracking", { pathname, previousPath });
        push(["trackPageView"]);
      }
    });
  }, [env, pathname, previousPath, searchParams]);

  return <></>;
};
