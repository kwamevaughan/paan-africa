import { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

export default function FreelanceBenefitsSlider() {
  const swiperRef = useRef(null);

  const cards = [
    {
      title: "High-Value Briefs",
      description:
        "Work on meaningful campaigns with vetted agencies and brands across Africa—no more low-paying gigs or unreliable clients wasting your potential.",
      image: "/assets/images/high-value-brief.png",
      bgColor: "bg-[#84C1D9]",
    },
    {
      title: "Skill Growth & Masterclasses",
      description:
        "Stay ahead of industry trends with exclusive workshops, certifications, and training led by Africa's top creative and technical minds. Sharpen your craft and expand your capabilities in a fast-evolving market.",
      image: "/assets/images/high-value-brief.png",
      bgColor: "bg-[#F2B706]",
    },
    {
      title: "Business & Entrepreneurship Support",
      description:
        "Freelancing is more than gigs—it's a business. Get access to resources, templates, and mentorship to help you manage contracts, pricing, and growth sustainably.",
      image: "/assets/images/high-value-brief.png",
      bgColor: "bg-[#D1D3D4]",
    },
    {
      title: "Recognition & Career Boost",
      description:
        "Stand out through PAAN-endorsed awards, competitions, and grants. Showcase your best work to a network that can propel your reputation and open doors to long-term collaborations.",
      image: "/assets/images/high-value-brief.png",
      bgColor: "bg-[#F25849]",
    },
    {
      title: "Amplified Visibility",
      description:
        "Your profile doesn't get lost in an algorithm. We actively promote certified freelancers to agencies and clients seeking top-tier talent—so your work gets seen by the right people.",
      image: "/assets/images/high-value-brief.png",
      bgColor: "bg-[#D1D3D4]",
    },
    {
      title: "Community & Collaboration",
      description:
        "Join a curated network of peers for feedback, partnerships, and referrals. Freelancing can be isolating; we create spaces for meaningful connections and shared growth.",
      image: "/assets/images/high-value-brief.png",
      bgColor: "bg-[#F2B706]",
    },
  ];

  return (
    <div className="mt-4 md:mt-10 mb-20 md:mb-24 relative overflow-hidden">
      {/* Mobile Title Section */}
      <div className="block md:hidden px-4 mb-6">
        <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Why Choose PAAN?
        </h3>
        <p className="text-gray-600 text-center text-sm">
          Swipe to explore the benefits
        </p>
      </div>

      <section className="relative">
        <div className="relative">
          <Swiper
            modules={[Navigation, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1.1}
            spaceBetween={16}
            initialSlide={0}
            loop={true}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              375: {
                slidesPerView: 1.15,
                spaceBetween: 18,
              },
              480: {
                slidesPerView: 1.2,
                spaceBetween: 25,
              },
              640: {
                slidesPerView: 1.5,
                spaceBetween: 40,
                initialSlide: 1.5,
              },
              1024: {
                slidesPerView: 1.8,
                spaceBetween: 50,
                initialSlide: 1.5,
              },
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 80,
              modifier: 1,
              slideShadows: false,
            }}
            className="w-full px-3 sm:px-4 !overflow-visible"
          >
            {cards.map((card, index) => (
              <SwiperSlide key={index} className="!w-[92%] sm:!w-[85%] md:!w-[70%] lg:!w-[60%]">
              <div
                className={`${card.bgColor} rounded-2xl md:rounded-lg shadow-xl md:shadow-lg overflow-hidden transition-all duration-300 
                  h-[520px] xs:h-[480px] sm:h-[450px] md:h-[400px] relative
                  transform hover:scale-[1.02] md:hover:scale-100 active:scale-[0.98] md:active:scale-100
                  border border-white/20`}
              >
                {/* Mobile-specific gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 md:hidden z-[1]"></div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-white/30 rounded-full md:hidden"></div>
                <div className="absolute top-6 right-8 w-2 h-2 bg-white/20 rounded-full md:hidden"></div>
                <div className="hidden md:block absolute bottom-4 left-4 w-10 h-10 bg-[#172840] rounded-full z-10"></div>
                <div className="hidden md:block absolute bottom-4 right-4 w-16 h-16 bg-[#F2B706] rounded-full z-10"></div>
                
                <div className="h-full flex flex-col relative z-[2]">
                  <div className="p-5 sm:p-6 md:p-8 flex flex-col h-full">
                    <div className="flex flex-col md:flex-row gap-5 sm:gap-6 md:gap-8 flex-grow">
                      {/* Image container - Top on mobile */}
                      <div className="w-full md:w-1/2 h-36 xs:h-32 sm:h-40 md:h-full flex items-center justify-center order-1 md:order-2">
                        <div className="relative w-full h-full group">
                          <div className="absolute inset-0 bg-white/10 rounded-xl md:rounded-lg backdrop-blur-sm"></div>
                          <Image
                            src={card.image}
                            fill
                            alt={card.title}
                            className="rounded-xl md:rounded-lg object-cover shadow-lg relative z-10 
                              group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                      
                      {/* Text content - Bottom on mobile */}
                      <div className="w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1 text-center md:text-left">
                        <div className="mb-4 md:mb-6">
                          <div className="inline-block px-3 py-1 bg-white/20 rounded-full mb-3 md:hidden">
                            <span className="text-xs font-medium text-gray-700">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                          </div>
                          <h4 className="text-xl xs:text-lg sm:text-xl font-bold text-gray-800 leading-tight mb-3">
                            {card.title}
                          </h4>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm xs:text-sm sm:text-base md:text-md 
                          font-medium md:font-normal px-2 md:px-0">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            ))}
          </Swiper>
            
          {/* Navigation Buttons */}
          <div className="absolute -bottom-16 md:-bottom-20 left-1/2 transform -translate-x-1/2 md:left-auto md:right-4 md:transform-none 
            flex items-center space-x-4 z-20">
            <button 
              onClick={() => swiperRef.current?.slidePrev()}
              className="swiper-button-prev-custom w-12 h-12 sm:w-12 sm:h-12 bg-[#F25849] rounded-full text-white 
                hover:bg-[#e04a3b] active:bg-[#d63d2e] transition-all duration-200 flex items-center justify-center
                shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              <Icon
                icon="mdi:chevron-left"
                width={28}
                height={28}
                color="white"
              />
            </button>
            <button 
              onClick={() => swiperRef.current?.slideNext()}
              className="swiper-button-next-custom w-12 h-12 sm:w-12 sm:h-12 bg-[#F25849] rounded-full text-white 
                hover:bg-[#e04a3b] active:bg-[#d63d2e] transition-all duration-200 flex items-center justify-center
                shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              <Icon
                icon="mdi:chevron-right"
                width={28}
                height={28}
                color="white"
              />
            </button>
          </div>

          {/* Mobile Progress Indicators */}
          <div className="flex md:hidden justify-center mt-8 space-x-2">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => swiperRef.current?.slideTo(index)}
                className="w-2 h-2 rounded-full bg-gray-300 transition-all duration-300 hover:bg-gray-400"
                style={{
                  backgroundColor: index === 0 ? '#F25849' : undefined
                }}
              ></button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}