import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const FreelancerHero = () => {
  return (
    <div
      className="relative h-full w-full overflow-hidden pb-10 pt-10 md:pt-0 "
      id="home"
    >
      {/* Content overlay */}
      <div className="relative flex items-center justify-center">
        <div className="w-full px-4 md:px-8 pt-20 md:pt-32 flex flex-col justify-between freelance-hero-bg">
          <div className="mx-auto text-center space-y-6 md:space-y-8 mt-4 md:mt-8 max-w-[90%] md:max-w-full">
            <h1 className="text-paan-dark-blue text-2xl md:text-5xl font-bold uppercase relative">
              <span className="relative inline-block">
                <span className="text-paan-red relative z-0">Freelance</span>
                <Image
                  src="/assets/images/hero-vector.png"
                  width={400}
                  height={0}
                  alt=""
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-auto z-[-2] hidden md:block"
                />
              </span>{" "}
              with Purpose. <br className="hidden md:block" />
              <span className="block md:inline">Grow with Structure & Scale.</span>
            </h1>
            <p className="text-paan-dark-blue text-sm md:text-md mb-4 md:mb-6 px-2 md:px-4">
              Join Africa&apos;s premier network of vetted creative, technical,
              and strategic talent—powering high-impact campaigns
              across the continent.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-12">
              <div className="text-paan-dark-blue text-xs md:text-sm flex items-center whitespace-nowrap">
                <Icon
                  icon="mdi:shield-check"
                  className="w-4 h-4 md:w-5 md:h-5 text-paan-yellow mr-1 md:mr-2"
                />
                <p className="text-[10px] md:text-xs">
                  Trusted by agencies in{" "}
                  <span className="font-bold">20+ African countries</span>
                </p>
              </div>
              <div className="text-paan-dark-blue text-xs md:text-sm flex items-center whitespace-nowrap">
                <Icon
                  icon="mdi:shield-check"
                  className="w-4 h-4 md:w-5 md:h-5 text-paan-yellow mr-1 md:mr-2"
                />
                <p className="text-[10px] md:text-xs">
                  Backed by the{" "}
                  <span className="font-bold">
                    Pan-African Agency Network (PAAN)
                  </span>
                </p>
              </div>
            </div>

            <button className="bg-paan-red text-white py-2 md:py-3 px-6 md:px-10 rounded-full hover:bg-paan-red transition-all duration-300 transform ease-in-out hover:translate-y-[-5px] font-medium text-xs md:text-sm w-full md:w-auto"
              onClick={() => { if (window.fbq) window.fbq('track', 'BecomeCertifiedClick'); }}
            >
              <Link href="https://membership.paan.africa/freelancers" passHref>
                Become a Certified PAAN Freelancer
              </Link>
            </button>
          </div>

          {/* Freelancer images - Swiper on mobile, Flex on desktop */}
          <div className="mt-auto flex justify-center items-center mx-auto pt-20">
            {/* Mobile Swiper View */}
            <div className="md:hidden w-full">
              <Swiper
                modules={[Navigation, EffectCoverflow]}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2,
                  slideShadows: false,
                }}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                className="w-full h-[300px] [&_.swiper-button-next]:text-paan-red [&_.swiper-button-prev]:text-paan-red [&_.swiper-button-next]:bg-white [&_.swiper-button-prev]:bg-white [&_.swiper-button-next]:w-10 [&_.swiper-button-prev]:w-10 [&_.swiper-button-next]:h-10 [&_.swiper-button-prev]:h-10 [&_.swiper-button-next]:rounded-full [&_.swiper-button-prev]:rounded-full [&_.swiper-button-next]:shadow-lg [&_.swiper-button-prev]:shadow-lg [&_.swiper-button-next]:after:text-xl [&_.swiper-button-prev]:after:text-xl"
              >
                <SwiperSlide className="flex items-center justify-center">
                  <Image
                    src="/assets/images/freelancer-1.png"
                    width={200}
                    height={300}
                    alt="Hero image 1"
                    className="rounded-md transition-transform transform ease-in-out duration-300 hover:translate-y-[-10px]"
                    style={{ objectFit: 'contain' }}
                  />
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center">
                  <Image
                    src="/assets/images/freelancer-2.png"
                    width={200}
                    height={300}
                    alt="Hero image 2"
                    className="rounded-md transition-transform transform ease-in-out duration-300 hover:translate-y-[-10px]"
                    style={{ objectFit: 'contain' }}
                  />
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center">
                  <Image
                    src="/assets/images/freelancer-3.png"
                    width={200}
                    height={300}
                    alt="Hero image 3"
                    className="rounded-md transition-transform transform ease-in-out duration-300 hover:translate-y-[-10px]"
                    style={{ objectFit: 'contain' }}
                  />
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center">
                  <Image
                    src="/assets/images/freelancer-4.png"
                    width={200}
                    height={300}
                    alt="Hero image 4"
                    className="rounded-md transition-transform transform ease-in-out duration-300 hover:translate-y-[-10px]"
                    style={{ objectFit: 'contain' }}
                  />
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center">
                  <Image
                    src="/assets/images/freelancer-5.png"
                    width={200}
                    height={300}
                    alt="Hero image 5"
                    className="rounded-md transition-transform transform ease-in-out duration-300 hover:translate-y-[-10px]"
                    style={{ objectFit: 'contain' }}
                  />
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Desktop Flex View */}
            <div className="hidden md:flex flex-row w-full gap-8 justify-center">
              <Image
                src="/assets/images/freelancer-1.png"
                width={200}
                height={0}
                alt="Hero image 1"
                className="rounded-md transition-transform transform ease-in-out duration-300 hover:translate-y-[-10px]"
              />
              <Image
                src="/assets/images/freelancer-2.png"
                width={200}
                height={0}
                alt="Hero image 2"
                className="rounded-md transition-transform transform ease-in-out duration-300 hover:translate-y-[-10px]"
              />
              <Image
                src="/assets/images/freelancer-3.png"
                width={200}
                height={0}
                alt="Hero image 3"
                className="rounded-md transition-transform transform ease-in-out duration-300 hover:translate-y-[-10px]"
              />
              <Image
                src="/assets/images/freelancer-4.png"
                width={200}
                height={0}
                alt="Hero image 4"
                className="rounded-md transition-transform transform ease-in-out duration-300 hover:translate-y-[-10px]"
              />
              <Image
                src="/assets/images/freelancer-5.png"
                width={200}
                height={0}
                alt="Hero image 5"
                className="rounded-md transition-transform transform ease-in-out duration-300 hover:translate-y-[-10px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerHero;