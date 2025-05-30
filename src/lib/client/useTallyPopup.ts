import { useEffect, useState } from "react";

import { useConsent } from "@/consentManagement";
import { type Any } from "@/utils/types";

import { useScrollPosition } from "./useScrollPosition";

interface SubmissionPayload {
  createdAt: Date;
  // submission date
  fields: Array<{
    answer: { raw: Any; value: Any };
    id: string;
    title: string;
    type:
      | "CALCULATED_FIELDS"
      | "CHECKBOXES"
      | "DROPDOWN"
      | "FILE_UPLOAD"
      | "HIDDEN_FIELDS"
      | "INPUT_DATE"
      | "INPUT_EMAIL"
      | "INPUT_LINK"
      | "INPUT_NUMBER"
      | "INPUT_PHONE_NUMBER"
      | "INPUT_TEXT"
      | "INPUT_TIME"
      | "LINEAR_SCALE"
      | "MATRIX"
      | "MULTI_SELECT"
      | "MULTIPLE_CHOICE"
      | "PAYMENT"
      | "RANKING"
      | "RATING"
      | "SIGNATURE"
      | "TEXTAREA";
  }>;
  formId: string;
  formName: string;
  id: string;
  // submission ID
  respondentId: string;
}

type TallyPopupOptions = {
  alignLeft?: boolean;
  autoClose?: number;
  customFormUrl?: string;
  doNotShowAfterSubmit?: boolean;
  emoji?: {
    animation: "bounce" | "flash" | "head-shake" | "heart-beat" | "none" | "rubber-band" | "spin" | "tada" | "wave";
    text: string;
  };
  // when you want to load the form via it's custom domain URL
  hiddenFields?: {
    [key: string]: Any;
  };
  hideTitle?: boolean;
  key?: string;
  // This is used as a unique identifier used for the "Show only once" and "Don't show after submit" functionality
  layout?: "default" | "modal";
  onClose?: () => void;
  onOpen?: () => void;
  onPageView?: (page: number) => void;
  onSubmit?: (payload: SubmissionPayload) => void;
  overlay?: boolean;
  // in milliseconds
  showOnce?: boolean;
  width?: number;
};

/**
 * Open a Tally popup when the user scrolls to a certain position on the page.
 *
 * @param formId Tally form id
 * @param percentage a number between 0 and 100
 * @param options the options for the Tally popup
 */
export const useTallyPopupOnScrollPosition = (formId: string, percentage?: number, options?: TallyPopupOptions) => {
  const [userHasCanceled, setUserHasCanceled] = useState(false);
  const { finalityConsent } = useConsent();
  const { scrollPercentage } = useScrollPosition();

  const finalPercentage = !percentage ? 50 : percentage <= 0 || percentage > 100 ? 50 : percentage;

  useEffect(() => {
    if (finalityConsent?.tally) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (window.Tally?.openPopup) {
        if (scrollPercentage > finalPercentage && !userHasCanceled) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          window.Tally.openPopup(formId, {
            width: 400,
            emoji: {
              text: "🙏",
            },
            doNotShowAfterSubmit: true,
            onClose: () => {
              setUserHasCanceled(true);
            },
            ...options,
          });
        }
      }
    }
  }, [formId, options, finalPercentage, scrollPercentage, userHasCanceled, finalityConsent?.tally]);
};

/**
 * Open a Tally popup after a timeout.
 *
 * @param formId Tally form id
 * @param options the options for the Tally popup
 */
export const useTallyPopupOnTimeout = (formId: string, delay: number = 10_000, options?: TallyPopupOptions) => {
  const [userHasCanceled, setUserHasCanceled] = useState(false);
  const { finalityConsent } = useConsent();

  useEffect(() => {
    if (finalityConsent?.tally) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (window.Tally?.openPopup) {
        const timeoutId = setTimeout(() => {
          if (!userHasCanceled) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            window.Tally.openPopup(formId, {
              width: 400,
              emoji: {
                text: "🙏",
              },
              doNotShowAfterSubmit: true,
              onClose: () => {
                setUserHasCanceled(true);
              },
              ...options,
            });
          }
        }, delay);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [formId, delay, options, userHasCanceled, finalityConsent?.tally]);
};
