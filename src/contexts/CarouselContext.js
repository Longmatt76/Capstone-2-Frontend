import React, { createContext, useState } from "react";

export const CarouselContext = createContext();

export const CarouselProvider = ({ children }) => {
  const [isCarousel, setIsCarousel] = useState(true);
  const [isDarkText, setIsDarkText] = useState(false);
  const [carousel, setCarousel] = useState([]);

  return (
    <CarouselContext.Provider
      value={{
        isCarousel,
        setIsCarousel,
        carousel,
        setCarousel,
        isDarkText,
        setIsDarkText
      }}
    >
      {children}
    </CarouselContext.Provider>
  );
};

export default CarouselProvider;
