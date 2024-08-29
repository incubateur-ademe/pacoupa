import { HCard } from "@/components/HCard";
import { ChaudiereCasseeImage } from "@/components/img/ChaudiereCasseeImage";
import { MonnaieImage } from "@/components/img/MonnaieImage";
import { SoleilImage } from "@/components/img/SoleilImage";

export const RaisonCard1 = () => (
  <HCard
    title="Chaudière en panne&nbsp;?"
    desc="C’est le bon moment pour vous renseigner sur les solutions durables, spécifiquement adaptées à votre immeuble."
    image={
      <div className="w-[90px]">
        <ChaudiereCasseeImage />
      </div>
    }
  />
);

export const RaisonCard2 = () => (
  <HCard
    title="Facture trop élevée&nbsp;?"
    desc="Les solutions “renouvelables” sont souvent moins gourmandes, et donc moins exposées aux augmentations de prix."
    image={
      <div className="w-[90px]">
        <MonnaieImage />
      </div>
    }
  />
);

export const RaisonCard3 = () => (
  <HCard
    desc="Réseau de chaleur ? pompe à chaleur ? solaire thermique ? biomasse ? Késako ? Les solutions sont nombreuses, laissez nous vous guider pas à pas."
    title="Envie de passer au vert&nbsp;?"
    image={
      <div className="w-[90px]">
        <SoleilImage />
      </div>
    }
  />
);
