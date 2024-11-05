import Link from "next/link";

import { ClientOnly } from "@/components/ClientOnly";
import { config } from "@/config";
import { H1 } from "@/dsfr/base/typography";

import { DetailContact } from "./DetailContact";

const ContactPage = () => {
  return (
    <div className="col-start-2 mt-10 md:mt-20 relative ">
      <H1 className="relative md:before:content-[''] before:block before:absolute before:top-[-35px] before:left-[-55px] before:w-full before:h-[91px] before:max-w-[650px] before:bg-[url('/img/dot.png')] before:bg-no-repeat">
        {config.tally.contact.label}
      </H1>

      <p className="text-xl">Nous lisons tous vos messages, vraiment !</p>

      <p className="text-xl">
        Vous pouvez aussi consulter notre <Link href="/faq">FAQ</Link> où vous pourriez trouver la réponse à votre
        question.
      </p>

      <ClientOnly>
        <DetailContact />
      </ClientOnly>
    </div>
  );
};

export default ContactPage;
