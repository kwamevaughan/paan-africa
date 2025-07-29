import { useState } from 'react';
import Image from 'next/image';
import { Icon } from "@iconify/react";

const CustomSlider = () => {
  const slides = [
    '/assets/images/slides/home-hero.png',
    '/assets/images/slides/home-hero.png',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="overflow-hidden rounded-lg mt-12 sm:mt-28">
        <Image
          src={slides[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          width={800}
          height={450}
          className="w-full h-auto object-cover transition-all duration-500"
          priority
        />
      </div>
    </div>
  );
};

export default CustomSlider;
