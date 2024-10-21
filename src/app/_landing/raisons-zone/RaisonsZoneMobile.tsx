"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/Carousel";

import { RaisonCard1, RaisonCard2, RaisonCard3 } from "./cards";

export const RaisonsZoneMobile = () => {
  return (
    <Carousel className="md:hidden max-w-[calc(100vw-4em)] mx-auto">
      <CarouselContent className="-ml-1">
        <CarouselItem className="basis-full min-w-[320px] pl-1">
          <div className="p-1">
            <RaisonCard1 />
          </div>
        </CarouselItem>
        <CarouselItem className="basis-full pl-1">
          <div className="p-1">
            <RaisonCard2 />
          </div>
        </CarouselItem>
        <CarouselItem className="basis-full pl-1">
          <div className="p-1">
            <RaisonCard3 />
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
