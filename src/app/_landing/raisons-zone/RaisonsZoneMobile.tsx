"use client";
import { useEffect, useState } from "react";

import { RaisonCard1, RaisonCard2, RaisonCard3 } from "./cards";

export const RaisonsZoneMobile = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cards = [RaisonCard1, RaisonCard2, RaisonCard3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % cards.length);
    }, 2000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showCard = (index: number) => {
    setCurrentIndex(index);
  };

  const CurrentCard = cards[currentIndex];

  return (
    <div className="md:hidden relative w-full max-w-2xl mx-auto">
      <div className="relative w-full h-auto">
        <CurrentCard />
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => showCard(index)}
            className={`w-4 h-4 rounded-full border-2 border-solid border-green-900 ${
              // we use ! CSS rule because of the behavior of the DSFR button which is white on hover.
              index === currentIndex ? "bg-body-700 hover:!bg-body-700" : "bg-white hover:!bg-body-300"
            }`}
            aria-label={`Aller à la carte ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
