import React, { createContext, useState } from "react";

export const CarouselContext = createContext();

export const CarouselProvider = ({ children }) => {
  const [isCarousel, setIsCarousel] = useState(true);
  const [carousel, setCarousel] = useState([]);

  return (
    <CarouselContext.Provider
      value={{
        isCarousel,
        setIsCarousel,
        carousel,
        setCarousel,
      }}
    >
      {children}
    </CarouselContext.Provider>
  );
};

export default CarouselProvider;
