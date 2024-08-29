import { CookiesPolicy } from "@incubateur-ademe/legal-pages-react";

import { config } from "@/config";
import { FooterConsentManagementItem } from "@/consentManagement";

export default function CookiePolicyPage() {
  return (
    <div className="col-start-2">
      <CookiesPolicy
        analyticTool={{
          name: "Matomo",
          cookieListUrl: "https://matomo.org/faq/general/faq_146/",
          policyUrl: "https://matomo.org/privacy-policy/",
        }}
        cookieConsentButton={<FooterConsentManagementItem />}
        siteName={config.name}
      />
    </div>
  );
}
