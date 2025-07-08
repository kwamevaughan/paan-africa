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
  const freelancers = [
    {
      image: "/assets/images/freelancers/1.png",
      badge: "/assets/images/freelancers/freelancer-badge.svg",
      rating: 4.4,
      name: "James .M",
      role: "Creative Director",
      ratingBg: "#F25849",
      infoBg: "#F25849",
      infoTextColor: "#fff",
    },
    {
      image: "/assets/images/freelancers/2.png",
      badge: "/assets/images/freelancers/freelancer-badge.svg",
      rating: 4.8,
      name: "Aisha K.",
      role: "UX Designer",
      ratingBg: "#84C1D9",
      infoBg: "#84C1D9",
      infoTextColor: "#172840",
    },
    {
      image: "/assets/images/freelancers/3.png",
      badge: "/assets/images/freelancers/freelancer-badge.svg",
      rating: 4.6,
      name: "Samuel T.",
      role: "Web Developer",
      ratingBg: "#F2B706",
      infoBg: "#F2B706",
      infoTextColor: "#172840",
    },
    {
      image: "/assets/images/freelancers/4.png",
      badge: "/assets/images/freelancers/freelancer-badge.svg",
      rating: 4.9,
      name: "Linda O.",
      role: "Copywriter",
      ratingBg: "#172840",
      infoBg: "#172840",
      infoTextColor: "#fff",
    },
    {
      image: "/assets/images/freelancers/5.png",
      badge: "/assets/images/freelancers/freelancer-badge.svg",
      rating: 4.4,
      name: "James .M",
      role: "Creative Director",
      ratingBg: "#F25849",
      infoBg: "#F25849",
      infoTextColor: "#fff",
    },
  ];

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

            {/* Desktop freelancers Slider View */}
            <div className="hidden md:block w-full">
              <Swiper
                modules={[Navigation, EffectCoverflow]}
                slidesPerView={5}
                spaceBetween={32}
                loop={false}
                slidesPerGroup={1}
                navigation={{
                  nextEl: '.desktop-swiper-button-next',
                  prevEl: '.desktop-swiper-button-prev',
                }}
                className="w-full h-[340px]"
              >
                {freelancers.map((freelancer, idx) => (
                  <SwiperSlide key={idx} className="flex items-center justify-center">
                    <div className="h-[300px] w-[280px] relative bg-gray-800 rounded-md overflow-hidden">
                      <Image
                        src={freelancer.image}
                        width={280}
                        height={300}
                        alt={`Hero image ${idx + 1}`}
                        className="w-full h-full object-cover rounded-md transition-transform transform ease-in-out duration-300 hover:translate-y-[-10px]"
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                      />
                      {/* Freelancer badge */}
                      <div className="absolute top-3 right-3 z-5">
                        <Image
                          src={freelancer.badge}
                          width={30}
                          height={30}
                          alt="Freelancer badge"
                          className="w-12 h-12"
                        />
                      </div>
                      {/* Rating card */}
                      <div
                        className="absolute top-3 left-3 z-5 rounded-lg p-2 text-white text-center min-w-[48px] h-[48px] flex flex-col items-center justify-center shadow-lg"
                        style={{ background: freelancer.ratingBg }}
                      >
                        <div className="font-bold text-sm leading-tight">{freelancer.rating}</div>
                        <div className="text-xs leading-none">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                            <path fill="currentColor" d="m12 17.275l-4.15 2.5q-.275.175-.575.15t-.525-.2t-.35-.437t-.05-.588l1.1-4.725L3.775 10.8q-.25-.225-.312-.513t.037-.562t.3-.45t.55-.225l4.85-.425l1.875-4.45q.125-.3.388-.45t.537-.15t.537.15t.388.45l1.875 4.45l4.85.425q.35.05.55.225t.3.45t.038.563t-.313.512l-3.675 3.175l1.1 4.725q.075.325-.05.588t-.35.437t-.525.2t-.575-.15z"/>
                          </svg>
                        </div>
                      </div>
                      {/* Info box overlay */}
                      <div
                        className="absolute bottom-4 left-0 right-0 mx-2 rounded-lg bg-opacity-90 p-3"
                        style={{ background: freelancer.infoBg }}
                      >
                        <h3 className="font-semibold text-sm" style={{ color: freelancer.infoTextColor }}>{freelancer.name}</h3>
                        <p className="text-xs opacity-90" style={{ color: freelancer.infoTextColor }}>{freelancer.role}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                {/* Swiper navigation buttons */}
                <div className="desktop-swiper-button-prev swiper-button-prev !text-paan-red !bg-white !w-10 !h-10 !rounded-full !shadow-lg !left-0 !top-1/2 !-translate-y-1/2" />
                <div className="desktop-swiper-button-next swiper-button-next !text-paan-red !bg-white !w-10 !h-10 !rounded-full !shadow-lg !right-0 !top-1/2 !-translate-y-1/2" />
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerHero;
