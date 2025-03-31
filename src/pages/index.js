// HomePage.js
import Header from '../layouts/header';
import CustomSlider from '../components/CustomSlider';
import Image from 'next/image';
import { Icon } from "@iconify/react";

const HomePage = () => {
  return (
    <>
      <main className="px-3 pt-6 sm:px-0 sm:pt-0 relative">
        {/* Single Content Wrapper - Constrained */}
        <Header />

        <div className="mx-auto max-w-6xl">
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-8">
              <h2 className="text-5xl font-semibold uppercase text-[#172840]">
                Redefining Africa’s Global Creative & Tech Footprint
              </h2>
              <p className="text-gray-500 font-normal">
                The Pan-African Agency Network (PAAN) is a bold alliance of independent agencies across Africa and the diaspora. 
                We’re on a mission to transform fragmentation into unity and potential into global influence.
              </p>
              <div className="flex gap-4">
                <button className="bg-[#F25849] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#D6473C] transition duration-300">
                  Join the Network
                </button>
                <button className="bg-[#84C1D9] text-[#172840] px-8 py-3 rounded-full font-medium text-sm transition duration-300 hover:bg-[#6FA1B7]">
                  Explore Our Vision
                </button>
              </div>
            </div>
            <div>
              <CustomSlider />
            </div>
          </section>
        </div>

        {/* Full-Width Background Pattern Above "Who We Are" */}
        <div className="relative h-64 mt-[-10em] top-10 z-[-1]">
          <Image
            src="/assets/images/bg-pattern.svg"
            width={0}
            height={0}
            alt="bg-pattern"
            className="absolute top-0 left-0 w-screen h-full object-cover z-[-1]"
          />
        </div>

        {/* Single Content Wrapper Continues - Constrained */}
        <div className="mx-auto max-w-6xl">
          {/* Who We Are Section */}
          <section>
            <p className="uppercase font-semibold mb-4">2. Who We Are</p>
            <p className="text-2xl">
              The Pan-African Agency Network (PAAN) is a bold alliance of independent agencies across Africa and the diaspora. 
              We’re on a mission to transform fragmentation into unity and potential into global influence.
            </p>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center mt-20">
            {/* Left: Image with Button */}
            <div className="relative">
              <Image
                src="/assets/images/who-we-are.png"
                width={500}
                height={300}
                alt="Team collaboration"
                className="rounded-lg object-cover w-full h-auto"
              />
              <div className="absolute top-100 bottom-0 bg-white flex flex-col gap-4 rounded-tr-[30px] rounded-br-[30px] pl-0 pt-4 pb-4 pr-4">
                <button className="bg-[#F25849] text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-[#D6473C] transition duration-300">
                  Discover More
                </button>
              </div>
            </div>

            {/* Right: List with Icons */}
            <div className="flex flex-col gap-4">
              
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
              <Image src="/assets/images/icons/pan-african-reach.svg" width={50} height={50} alt="Pan-African Reach" />
                <p className="text-xl font-base">Pan-African Reach</p>
              </div>

              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
              <Image src="/assets/images/icons/strategic-collaboration.svg" width={50} height={50} alt="Strategic Collaboration" />
                <p className="text-xl font-base">Strategic Collaboration</p>
              </div>

              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
              <Image src="/assets/images/icons/innovation-driven.svg" width={50} height={50} alt="Innovation-Driven" />
                <p className="text-xl font-base">Innovation-Driven</p>
              </div>

              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
              <Image src="/assets/images/icons/shared-knowledge-growth.svg" width={50} height={50} alt="Shared Knowledge & Growth" />
                <p className="text-xl font-base">Shared Knowledge & Growth</p>
              </div>
              
              
              
            </div>
          </section>
        </div>

        <div className=" bg-[#172840]">

          <section className="mt-20 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center py-20">
            {/* Left: Image with Button */}
            <div className="relative">
              <Image
                src="/assets/images/mission.jpg"
                width={500}
                height={300}
                alt="Team collaboration"
                className="rounded-lg object-cover w-full h-auto"
              />
              
            </div>

            {/* Right: List with Icons */}
            <div className="flex flex-col gap-10 z-0">

              <div className="flex items-center gap-3 -ml-24">
              <Image src="/assets/images/icons/vision.svg" width={140} height={0} alt="Vision Statement" className='bg-[#172840] p-4 rounded-full' />
                <div>
                <p className="text-2xl font-base text-white">Vision Statement</p>
                <span className='text-white font-light'>
                To become Africa’s foremost collaborative network, shaping global narratives through creativity and technology.
                </span>
                </div>
              </div>

              <div className="flex items-center gap-3 -ml-24">
              <Image src="/assets/images/icons/mission.svg" width={140} height={0} alt="Mission Statement" className='bg-[#172840] p-4 rounded-full' />
                <div>
                <p className="text-2xl font-base text-white">Mission Statement</p>
                <span className='text-white font-light'>
                Empowering African agencies through partnerships, shared resources, and advocacy to deliver world-class solutions.
                </span>
                </div>
              </div>

              
            </div>
          </div>
          </section>
        </div>


      </main>
    </>
  );
};

export default HomePage;