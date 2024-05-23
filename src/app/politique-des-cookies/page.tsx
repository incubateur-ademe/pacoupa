import { CookiesPolicy } from "@incubateur-ademe/legal-pages-react";
import { config } from "dotenv";

import { FooterConsentManagementItem } from "@/consentManagement";
import { Container } from "@/dsfr";

export default function CookiePolicyPage() {
  return (
    <Container my="4w">
      <CookiesPolicy
        analyticTool={{
          name: "Matomo",
          cookieListUrl: "https://matomo.org/faq/general/faq_146/",
          policyUrl: "https://matomo.org/privacy-policy/",
        }}
        cookieConsentButton={<FooterConsentManagementItem />}
        siteName={config.name}
      />
    </Container>
  );
}
