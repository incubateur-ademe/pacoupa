import { HCard } from "@/components/HCard";
import { ChaudiereCasseeImage } from "@/components/img/ChaudiereCasseeImage";
import { MonnaieImage } from "@/components/img/MonnaieImage";
import { SoleilImage } from "@/components/img/SoleilImage";
import { Container } from "@/dsfr";
import { H2 } from "@/dsfr/base/typography";

export const RaisonsZone = () => {
  return (
    <Container>
      <H2 className="text-pretty">On a tous une bonne raison</H2>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-8">
        <div className="col-span-1 sm:col-span-3">
          <HCard
            title="Chaudière en panne&nbsp;?"
            desc="C’est le bon moment pour vous renseigner sur les solutions durables, spécifiquement adaptées à votre immeuble."
            image={
              <div className="w-[90px]">
                <ChaudiereCasseeImage />
              </div>
            }
          />
        </div>

        <div className="col-span-1 sm:col-start-2 sm:col-span-3">
          <HCard
            title="Facture trop élevée&nbsp;?"
            desc="Les solutions “renouvelables” sont souvent moins gourmandes, et donc moins exposées aux augmentations de prix."
            image={
              <div className="w-[90px]">
                <MonnaieImage />
              </div>
            }
          />
        </div>

        <div className="col-span-1 sm:col-start-3 sm:col-span-3">
          <HCard
            desc="Réseau de chaleur ? pompe à chaleur ? solaire thermique ? biomasse ? Késako ? Les solutions sont nombreuses, laissez nous vous guider pas à pas."
            title="Envie de passer au vert&nbsp;?"
            image={
              <div className="w-[90px]">
                <SoleilImage />
              </div>
            }
          />
        </div>
      </div>
    </Container>
  );
};
