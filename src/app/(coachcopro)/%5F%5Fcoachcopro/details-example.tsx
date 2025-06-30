import CloseIcon from "@mui/icons-material/Close";
import MuiButton from "@mui/material/Button";
import Image from "next/image";

import { typeMapCoachCopro } from "@/app/(decorated)/(center)/simulation/resultat/helper";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/Carousel";
import { FranceImage } from "@/components/img/FranceImage";
import { type FicheReference } from "@/lib/common/domain/values/FicheReference";
import { type SolutionAvecEnergieCoutAide } from "@/lib/common/domain/values/SolutionAvecEnergieCoutAide";

export default function DetailsExample({
  onClose,
  solution,
  example,
}: {
  example: FicheReference;
  onClose: () => void;
  solution: SolutionAvecEnergieCoutAide;
}) {
  return (
    <>
      <div className="w-full max-w-xl p-8 border-3 border-solid border-[#6B7280] rounded-lg bg-white">
        <div className="flex items-center justify-between w-full mb-4">
          <h2 className="text-2xl font-extrabold m-0">Exemple d’application</h2>
          <MuiButton variant="text" endIcon={<CloseIcon />} onClick={onClose} className="text-black">
            <span className="sr-only">Fermer</span>
          </MuiButton>
        </div>
        <div className="space-y-4 mb-4">
          {example.images && example.images.length >= 1 && (
            <Carousel className="max-w-[calc(100vw-8rem)] mx-auto mb-4">
              <CarouselContent>
                {example.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative w-full h-44 mx-auto">
                      <Image src={image} alt={example.titrePrincipal} sizes="176px" fill className="object-contain" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-14 sm:-left-8 stroke-gray-600 fill-white md:-left-4" />
              <CarouselNext className="-right-14 sm:-right-8 md:-right-4 stroke-gray-600 fill-white" />
            </Carousel>
          )}
          <div className="grid grid-cols-[80px_1fr]">
            <FranceImage />
            <div className="flex flex-col">
              <h2 className="text-base font-bold mb-0 text-balance">{example.titrePrincipal}</h2>
              <p className="text-sm text-gray-600 text-balance m-0">{example.lieu}</p>
            </div>
          </div>
          <div className="grid gap-4 mb-4 w-full grid-cols-3">
            {example.nbLogements ? (
              <div className="flex flex-col items-center justify-between flex-1">
                <Image
                  src="/img/coach-copro/copro-application-vignette-1.svg"
                  alt=""
                  height={24}
                  width={24}
                  className="mb-1"
                />
                <div className="flex items-center text-center h-8 text-xs font-medium text-[#111827]">
                  {example.nbLogements} logements
                </div>
              </div>
            ) : null}
            {example.nbm2 ? (
              <div className="flex flex-col items-center justify-between flex-1">
                <Image
                  src="/img/coach-copro/copro-application-vignette-2.svg"
                  alt=""
                  height={24}
                  width={24}
                  className="mb-1"
                />
                <div className="flex items-center text-center h-8 text-xs font-medium text-[#111827]">
                  {new Intl.NumberFormat("fr-FR").format(example.nbm2)} m2
                </div>
              </div>
            ) : null}
            {example.anneeConstruction ? (
              <div className="flex flex-col items-center justify-between flex-1">
                <Image
                  src="/img/coach-copro/copro-application-vignette-3.svg"
                  alt=""
                  height={24}
                  width={24}
                  className="mb-1"
                />
                <div className="flex items-center text-center h-8 text-xs font-medium text-[#111827]">
                  Année {example.anneeConstruction}
                </div>
              </div>
            ) : null}
            {/* <div className="flex flex-col items-center justify-between flex-1">
                      <Image
                        src="/img/coach-copro/copro-application-vignette-4.svg"
                        alt=""
                        height={24}
                        width={24}
                        className="mb-1"
                      />
                      <div className="flex items-center text-center h-8 text-xs font-medium text-[#111827]">
                        
                      </div>
                    </div> */}
          </div>

          <div className="mt-4 p-2 border border-solid border-[#E0E0E0] rounded-lg">
            <h3 className="text-base font-medium text-[#111827] mb-2">Système de chauffage initial</h3>
            {example.estNeuf ? (
              <p className="m-0">Construction neuve</p>
            ) : (
              <div className="flex flex-col md:flex-row justify-between">
                <div className="py-2 flex flex-col basis-full md:basis-1/2">
                  <div className="text-sm font-normal mb-1 text-[#535F57]">Chauffage</div>
                  <div className="flex md:items-center flex-col md:flex-row items-start">
                    <div className="flex items-center">
                      <Image
                        src="/img/coach-copro/copro-application-vignette-5.svg"
                        alt=""
                        height={16}
                        width={16}
                        className="mr-1"
                      />
                      <span className="text-sm font-bold text-[#111827] mr-2">
                        {example.avantChauffage ?? "inconnu"}
                      </span>
                    </div>
                    {/* {typeMapCoachCopro[example.avantChauffage as Solution["type"]]} */}
                  </div>
                </div>
                <div className="py-2 flex flex-col basis-full md:basis-1/2">
                  <div className="text-sm font-normal mb-1 text-[#535F57]">Eau chaude</div>
                  <div className="flex md:items-center flex-col md:flex-row items-start">
                    <div className="flex items-center">
                      <Image
                        src="/img/coach-copro/copro-application-vignette-6.svg"
                        alt=""
                        height={16}
                        width={16}
                        className="mr-1"
                      />
                      <span className="text-sm font-bold text-[#111827] mr-2">{example.avantECS ?? "Inconnu"}</span>
                    </div>
                    {/* {typeMapCoachCopro[example.avantECS as Solution["type"]]} */}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-4 p-2 border border-solid border-[#E0E0E0] rounded-lg">
            <h3 className="text-base font-medium text-[#111827] mb-2">Système de chauffage installé</h3>
            <div className="">
              <div className="text-sm font-normal mb-1 text-[#535F57]">Chauffage et eau chaude</div>
              <div className="flex items-center">
                <Image
                  src="/img/coach-copro/copro-application-vignette-7.svg"
                  alt=""
                  height={16}
                  width={16}
                  className="mr-1"
                />
                <span className="text-sm font-bold text-[#E41571] mr-2">{example.apresChauffage}</span>
                {typeMapCoachCopro[solution.type]}
              </div>
            </div>
          </div>
          {example.avantages && example.avantages.length >= 1 && (
            <>
              <h3 className="text-base font-medium mt-8">Les + du projet</h3>
              <div className="text-sm bg-[#FFE8F2] rounded-lg p-2 gap-2 flex flex-row items-start justify-start">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 mt-2"
                >
                  <g clipPath="url(#clip0_18230_4905)">
                    <circle cx="8" cy="8" r="8" fill="#E41571" />
                    <path
                      d="M7.05859 13.0588C7.05859 13.0588 8.34053 13.2518 9.05859 12.9412C9.74501 12.6441 10.4704 11.647 10.4704 11.647"
                      stroke="white"
                      strokeLinecap="round"
                    />
                    <circle cx="4.66762" cy="7.52938" r="1.41176" fill="white" />
                    <circle cx="10.3141" cy="7.52938" r="1.41176" fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_18230_4905">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                {example.avantages.length == 1 ? (
                  <p className="m-0 text-sm">{example.avantages[0]}</p>
                ) : (
                  <ul className="list-disc list-inside text-sm">
                    {example.avantages.map((avantage, index) => (
                      <li key={index}>{avantage}</li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
          <h3 className="text-base font-medium mt-12">Réalisation</h3>

          {example.maitreOuvrage && (
            <div>
              <div className="text-sm font-normal leading-6 text-[#535F57]">Maître d'ouvrage</div>
              <div className="text-sm font-medium">{example.maitreOuvrage}</div>
            </div>
          )}
          {example.bureauEtude && (
            <div>
              <div className="text-sm font-normal leading-6 text-[#535F57]">Bureau d'étude</div>
              <div className="text-sm font-medium">{example.bureauEtude}</div>
            </div>
          )}
          {example.installateur && (
            <div>
              <div className="text-sm font-normal leading-6 text-[#535F57]">Installateur</div>
              <div className="text-sm font-medium">{example.installateur}</div>
            </div>
          )}
          {example.anneeLivraison && (
            <div>
              <div className="text-sm font-normal leading-6 text-[#535F57]">Livraison</div>
              <div className="text-sm font-medium">{example.anneeLivraison}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
