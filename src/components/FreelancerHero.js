import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";

const FreelancerHero = () => {
  return (
    <div
      className="relative h-full w-full overflow-hidden pb-10 pt-10 md:pt-0 "
      id="home"
    >
      {/* Content overlay with increased top padding to move away from header */}
      <div className="relative flex items-center justify-center">
        <div className="w-full px-6 md:px-8 pt-16 md:pt-32 flex flex-col justify-between freelance-hero-bg">
          <div className=" mx-auto text-center space-y-8 mt-8">
            <h1 className="text-[#172840] text-xl md:text-5xl font-bold uppercase relative">
              <span className="relative inline-block">
                <span className="text-[#F25849] relative z-0">Freelance</span>
                <Image
                                  src="/assets/images/hero-vector.png"
                  width={400}
                  height={0}
                  alt=""
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-auto z-[-2]"
                />
              </span>{" "}
              with Purpose. <br />
              Grow with Structure & Scale.
            </h1>
            <p className="text-[#172840] text-md mb-6 px-4">
              Join Africa&apos;s premier network of vetted creative, technical,
              and strategic <br></br>talent—powering high-impact campaigns
              across the continent.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center md:space-x-12  md:space-y-0 ">
              <div className="text-[#172840] text-sm flex items-center whitespace-nowrap">
                <Icon
                  icon="mdi:shield-check"
                  className="w-5 h-5 text-[#F2B706] mr-2"
                />
                <p className="text-xs">
                  Trusted by agencies in{" "}
                  <span className="font-bold">20+ African countries</span>
                </p>
              </div>
              <div className="text-[#172840] text-sm flex items-center whitespace-nowrap">
                <Icon
                  icon="mdi:shield-check"
                  className="w-5 h-5 text-[#F2B706] mr-2"
                />
                <p className="text-xs">
                  Backed by the{" "}
                  <span className="font-bold">
                    Pan-African Agency Network (PAAN)
                  </span>
                </p>
              </div>
            </div>

            <button className="bg-[#F25849] text-white py-3 px-10 rounded-full hover:bg-orange-600 transition-all duration-300 transform ease-in-out hover:translate-y-[-5px] font-medium text-sm">
              <Link href="https://membership.paan.africa/freelancers" passHref>
                Become a Certified PAAN Freelancer
              </Link>
            </button>
          </div>

          {/* Freelancer images - Updated to full width */}
          <div className="mt-auto flex justify-center items-center mx-auto pt-20">
            <div className="flex flex-row w-full gap-1 md:gap-8">
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
