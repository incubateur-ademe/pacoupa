import Image from "next/image";

import { ContextCard } from "./components/context-card";
import { SolutionCard } from "./components/solution-card";

export default function CoachCopro() {
  return (
    <div className="size-full border-4 justify-center">
      <div className="flex flex-col items-start max-w-6xl">
        <h1 className="text-2xl font-black mb-2">Mon potentiel réno</h1>
        <span className="flex w-full h-[1px] bg-[#E5E7EB] mb-2" />
        <p className="text-lg font-medium text-[#4B556A] mb-14">
          Retrouvez ici différents scénarios de rénovation énergétique pour votre copro
        </p>

        <div className="flex justify-start gap-x-12">
          <div className="basis-2/3">
            <h2 className="text-lg font-bold color-[#111827] mb-4">Définissez votre scénario de rénovation</h2>
            <div className="mb-12">
              <div className="mb-4 text-[#4b5563]">
                <span className="text-lg font-normal mr-2">1 —</span>
                <span className="text-base font-normal">Choisissez un contexte de rénovation</span>
              </div>
              <ContextCard
                title="Atteindre la rénovation énergétique globale"
                description={`Rénovation des postes qui ne l’ont pas été\n depuis ces 15 dernières années`}
                imageSrc="/img/vignette_1.svg"
                active
              />
              <ContextCard
                title="Changement du système de chauffage uniquement"
                description="Conserver l’état actuel des autres postes de travaux"
                imageSrc="/img/vignette_2.svg"
              />
            </div>

            <div>
              <div className="mb-8 text-[#4b5563]">
                <span className="text-lg font-normal mr-2">2 —</span>
                <span className="text-base font-normal">
                  Choisissez une des 3 solutions de chauffage ENR adaptée à votre projet de rénovation
                </span>
              </div>
              <SolutionCard
                title="Réseau de chaleur"
                description="Un réseau de chaleur est un système de distribution de chaleur
                  produite par une centrale énergétique (biomasse, géothermie,
                  incinération, etc.) et acheminée vers plusieurs bâtiments via
                  des canalisations."
                imageSrc="/img/vignette_3.svg"
                eligible
              />
              <SolutionCard
                title="Pompe à chaleur air/eau"
                description="La pompe à chaleur (PAC) air / eau prélève de la chaleur dans
                  l'air extérieur, augmente son niveau de température et la
                  transfère à un circuit d'eau."
                imageSrc="/img/vignette_4.svg"
                active
              />
              <SolutionCard
                title="Hybride pompe à chaleur + chaudière"
                description="La solution hybride combine une pompe à chaleur (PAC) avec une
                  chaudière pour assurer l'appoint."
                imageSrc="/img/vignette_5.svg"
              />
            </div>
            <button className="p-0 h-[38px] self-end text-base font-bold text-[#111827] border-0 border-b-2 border-solid border-[#111827] hover:!bg-transparent">
              Pourquoi ces solutions ?
            </button>
          </div>

          <div className="basis-1/3">
            <div className="w-full border border-solid border-[#f3f4f6] rounded-lg mb-2 p-4">
              <h2 className="text-lg font-bold color-[#111827]">Estimation des gains de mon scénario</h2>
              <p className="text-base font-medium m-0">🌿 Gain d’énergie</p>
              <Image src="/img/vignette_6.svg" alt="" height={44} width={256} />

              <p className="text-base font-medium m-0">🧾 Économie sur les factures</p>
              <p className="text-sm font-medium text-[#e41571] mb-4">De 1 100€ à 1 500€/an</p>
              <p className="text-base font-medium m-0">💰 Coût total du projet</p>
              <p className="text-sm font-medium text-[#e41571] mb-4">De 50 000€ à 70 000€</p>
              <p className="text-base font-medium m-0">🏦 Aides nationales minimum</p>
              <p className="text-sm font-medium text-[#e41571] mb-4">De 20 000€ à 30 000€</p>
              <button className="p-0 h-[38px] self-end text-base font-bold text-[#111827] border-0 border-b-2 border-solid border-[#111827] hover:!bg-transparent">
                Voir le détail
              </button>
            </div>
            <div className="w-full h-[432px] border border-solid border-[#f3f4f6] rounded-lg p-4">
              <h2 className="text-lg font-bold color-[#111827]">Exemple d’application</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
