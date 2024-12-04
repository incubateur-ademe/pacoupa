import { SkipLinks } from "@codegouvfr/react-dsfr/SkipLinks";
import { type PropsWithChildren } from "react";

import { footerId, PacoupaFooter } from "@/components/PacoupaFooter";
import { PacoupaHeader } from "@/components/PacoupaHeader";
import { ConsentBannerAndConsentManagement } from "@/consentManagement";

const contentId = "content";

const GridLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ConsentBannerAndConsentManagement />
      <SkipLinks
        links={[
          {
            anchor: `#${contentId}`,
            label: "Contenu",
          },
          {
            anchor: `#${footerId}`,
            label: "Pied de page",
          },
        ]}
      />
      {/* <Notice
isClosable={false}
title="Le simulateur est en phase de construction. Inscrivez-vous et nous vous préviendrons lors de sa sortie."
/> */}

      {/* <Banner
title={<>Le simulateur est en construction. Inscrivez-vous et nous vous préviendrons lors de sa sortie.</>}
/> */}
      <div className="min-h-full flex flex-col">
        {/* <Header
  brandTop={<Brand />}
  homeLinkProps={{
    href: "/",
    title: `Accueil - ${config.name}`,
  }}
  serviceTitle={
    <>
      {config.name}{" "}
      <Badge as="span" noIcon severity="success">
        Beta
      </Badge>
    </>
  }
  // serviceTagline={config.tagline}
  operatorLogo={operatorLogo}
/> */}
        <PacoupaHeader />

        <main
          role="main"
          id={contentId}
          className="flex-grow grid grid-cols-[16px_1fr_16px] md:grid-cols-[minmax(90px,_1fr)_minmax(320px,_1200px)_minmax(90px,_1fr)] lg:grid-cols-[minmax(120px,_1fr)_minmax(320px,_1200px)_minmax(120px,_1fr)] xl:grid-cols-[minmax(180px,_1fr)_minmax(900px,_1200px)_minmax(180px,_1fr)] gap-y-12 md:gap-y-24"
        >
          {children}
        </main>
        {/* <Follow /> */}
        <PacoupaFooter />
      </div>
    </>
  );

  //  return <div className="col-start-2 grid grid-cols-1 mt-6 md:mt-8 pt-4">{children}</div>;
};

export default GridLayout;
