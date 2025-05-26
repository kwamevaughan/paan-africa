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
    <div className="mt-10 mb-24 relative">
      <section className="relative">
        <div className="relative">
          <Swiper
            modules={[Navigation, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1.2}
            spaceBetween={30}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 1.8,
                spaceBetween: 50,
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
              <SwiperSlide key={index} className="!w-[85%] md:!w-[70%] lg:!w-[60%]">
                <div
                  className={`${card.bgColor} rounded-lg shadow-lg overflow-hidden transition-all duration-300 h-[400px]`}
                >
                  <div className="h-full flex flex-col">
                    <div className="p-8 flex flex-col h-full">
                      <div className="flex flex-col md:flex-row gap-8 flex-grow items-center">
                        <div className="w-full md:w-1/2 text-base h-full flex flex-col justify-center">
                          <h4 className="text-xl font-bold mb-6 text-gray-800">
                            {card.title}
                          </h4>
                          <p className="text-gray-600 leading-relaxed text-md">{card.description}</p>
                        </div>
                        <div className="w-full md:w-1/2 h-full flex items-center justify-center">
                          <div className="relative w-full h-full">
                            <Image
                              src={card.image}
                              fill
                              alt={card.title}
                              className="rounded-lg object-cover shadow-lg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
            
          {/* Navigation Buttons */}
          <div className="absolute -bottom-20 right-4 flex items-center space-x-4 z-9">
            <button 
              onClick={() => swiperRef.current?.slidePrev()}
              className="swiper-button-prev-custom w-12 h-12 bg-[#F25849] rounded-full text-white hover:bg-[#e04a3b] transition-colors flex items-center justify-center"
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
              className="swiper-button-next-custom w-12 h-12 bg-[#F25849] rounded-full text-white hover:bg-[#e04a3b] transition-colors flex items-center justify-center"
            >
              <Icon
                icon="mdi:chevron-right"
                width={28}
                height={28}
                color="white"
              />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}