"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { H1 } from "@/dsfr/base/typography";
import { useScrollTop } from "@/lib/client/useScrollTop";

/**
 * This page needs to be a client component because it uses the `useScrollTop` hook and the `iframe` element.
 * The iframe must be fetched client side in order to work in client navigation.
 */
const ContactPage = () => {
  useScrollTop();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.src =
        "https://tally.so/embed/n9JZBV?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";
    }
  }, []);

  return (
    <div className="col-start-2 mt-10 md:mt-20 relative ">
      <H1 className="relative md:before:content-[''] before:block before:absolute before:top-[-35px] before:left-[-55px] before:w-full before:h-[91px] before:max-w-[650px] before:bg-[url('/img/dot.png')] before:bg-no-repeat">
        Contactez-nous
      </H1>
      {/* <H1 className={styles.text}>Contactez-nous</H1> */}

      <p className="text-xl">Nous lisons tous vos messages, vraiment !</p>

      <p className="text-xl">
        Vous pouvez aussi consulter notre <Link href="/faq">FAQ</Link> où vous pourriez trouver la réponse à votre
        question.
      </p>

      <iframe ref={iframeRef} loading="eager" width="100%" height="100%" title="Page de contact" allowFullScreen />
    </div>
  );
};

export default ContactPage;
