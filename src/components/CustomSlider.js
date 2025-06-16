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

      <div className="absolute bottom-[-0.5rem] sm:bottom-[-1rem] right-2 sm:right-4 flex gap-1 sm:gap-2">
        <button
          onClick={prevSlide}
          className="bg-[#F25849] p-1.5 sm:p-2 rounded-full shadow-md hover:bg-[#F25849]/80 transition-all duration-300 cursor-pointer"
          aria-label="Previous slide"
        >
          <Icon icon="charm:arrow-left" width="20" height="20" className="text-white sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="bg-[#F25849] p-1.5 sm:p-2 rounded-full shadow-md hover:bg-[#F25849]/80 transition-all duration-300 cursor-pointer"
          aria-label="Next slide"
        >
          <Icon icon="charm:arrow-right" width="20" height="20" className="text-white sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
};

export default CustomSlider;
