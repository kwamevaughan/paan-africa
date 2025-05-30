import { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import Link from "next/link";

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

export default function ClientsSlider() {
  const swiperRef = useRef(null);

  const cards = [
    {
      description:
        "Certified agencies and vetted freelancers",
      image: "/assets/images/client-slider-img-1.png",
    },
    {
      description:
        "Strategic coordination across borders",
      image: "/assets/images/client-slider-img-2.png",
    },
    {
      description:
        "A centralized support team to manage rollout",
      image: "/assets/images/client-slider-img-3.png",
    },
    {
      description:
        "Local insight from creatives on the ground",
      image: "/assets/images/client-slider-img-4.png",
    },
  ];

  return (
    <div className="w-full relative">
      
      
      <section className="relative w-full" style={{ zIndex: 2 }}>
        <div className="relative w-full">
          <Swiper
            modules={[Navigation, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={false}
            slidesPerView={3}
            spaceBetween={30}
            initialSlide={0}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 15,
                centeredSlides: true,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
                centeredSlides: false,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
                centeredSlides: false,
              },
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            className="w-full px-4"
          >
            {cards.map((card, index) => (
              <SwiperSlide key={index} className="px-2">
                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
                  {/* Background Image */}
                  <Image
                    src={card.image}
                    fill
                    alt={card.title}
                    className="object-cover"
                  />
                  
                  {/* Shadow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h4 className="text-xl font-bold mb-3">
                      {card.title}
                    </h4>
                    <p className="text-sm leading-relaxed opacity-90">
                      {card.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-row space-x-2 z-10">
            <button className="swiper-button-prev-custom w-12 h-12 bg-[#F25849] hover:bg-[#e04a3b] rounded-full shadow-lg flex items-center justify-center transition-all duration-300 group">
            <Icon
                icon="mdi:chevron-left"
                width={28}
                height={28}
                color="white"
                className="group-hover:text-gray-900"
              />
            </button>
            <button className="swiper-button-next-custom w-12 h-12 bg-[#F25849] hover:bg-[#e04a3b] rounded-full shadow-lg flex items-center justify-center transition-all duration-300 group">
            <Icon
                icon="mdi:chevron-right"
                width={28}
                height={28}
                color="white"
                className="group-hover:text-gray-900"
              />
            </button>
          </div>
        </div>
        
        {/* Centered Button */}
        <div className="flex justify-center">
          <button className="bg-[#F2B706] my-10 text-gray-700 py-3 px-10 rounded-full hover:bg-orange-600 transition-all duration-300 transform ease-in-out hover:translate-y-[-5px] font-medium text-sm">
            <Link href="https://membership.paan.africa/freelancers" passHref>
              Find Your Delivery Partner
            </Link>
          </button>
        </div>
      </section>
    </div>
  );
}