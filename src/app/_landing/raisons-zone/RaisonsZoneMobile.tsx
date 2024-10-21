"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/Carousel";

import { RaisonCard1, RaisonCard2, RaisonCard3 } from "./cards";

export const RaisonsZoneMobile = () => {
  return (
    <div className="md:hidden relative w-full max-w-2xl mx-auto">
      <Carousel>
        <CarouselContent>
          <>
            <CarouselItem>
              <div className="relative w-[calc(100%-2rem)] h-[300px] mx-auto">
                <RaisonCard1 />
              </div>
            </CarouselItem>
              <div className="relative w-[calc(100%-2rem)] h-[300px] mx-auto">
                <RaisonCard2 />
              </div>
            </CarouselItem>
              <div className="relative w-[calc(100%-2rem)] h-[300px] mx-auto">
                <RaisonCard3 />
              </div>
            </CarouselItem>
          </>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
