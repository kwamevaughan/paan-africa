// HomePage.js
import Header from "../layouts/header";
import CustomSlider from "../components/CustomSlider";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Tier1 from "@/components/Tier1";
import Tier2 from "@/components/Tier2";
import Tier3 from "@/components/Tier3";
import OfferingTab from "@/components/OfferingTab";
import ContactForm from "@/components/ContactForm";

const HomePage = () => {
  return (
    <>
      <main className="px-3 pt-6 sm:px-0 sm:pt-0 relative">
        <Header />

        <div className="mx-auto max-w-6xl">
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-8">
              <h2 className="text-3xl md:text-5xl font-semibold uppercase text-[#172840]">
                Redefining Africa’s Global Creative & Tech Footprint
              </h2>
              <p className="text-gray-500 font-normal">
                The Pan-African Agency Network (PAAN) is a bold alliance of
                independent agencies across Africa and the diaspora. We’re on a
                mission to transform fragmentation into unity and potential into
                global influence.
              </p>
              <div className="flex md:flex-row flex-col gap-4">
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

        <div className="relative h-64 mt-[-10em] top-10 z-[-1]">
          <Image
            src="/assets/images/bg-pattern.svg"
            width={0}
            height={0}
            alt="bg-pattern"
            className="absolute top-0 left-0 w-screen h-full object-cover z-[-1]"
          />
        </div>

        <div className="mx-auto max-w-6xl">
          <section>
            <p className="uppercase font-semibold mb-4">2. Who We Are</p>
            <p className="text-2xl">
              The Pan-African Agency Network (PAAN) is a bold alliance of
              independent agencies across Africa and the diaspora. We’re on a
              mission to transform fragmentation into unity and potential into
              global influence.
            </p>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center mt-20">
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
                <Image
                  src="/assets/images/icons/pan-african-reach.svg"
                  width={50}
                  height={50}
                  alt="Pan-African Reach"
                />
                <p className="text-xl font-base">Pan-African Reach</p>
              </div>

              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <Image
                  src="/assets/images/icons/strategic-collaboration.svg"
                  width={50}
                  height={50}
                  alt="Strategic Collaboration"
                />
                <p className="text-xl font-base">Strategic Collaboration</p>
              </div>

              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <Image
                  src="/assets/images/icons/innovation-driven.svg"
                  width={50}
                  height={50}
                  alt="Innovation-Driven"
                />
                <p className="text-xl font-base">Innovation-Driven</p>
              </div>

              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <Image
                  src="/assets/images/icons/shared-knowledge-growth.svg"
                  width={50}
                  height={50}
                  alt="Shared Knowledge & Growth"
                />
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
                <div className="flex items-center gap-3 m-0 md:-ml-24">
                  <Image
                    src="/assets/images/icons/vision.svg"
                    width={140}
                    height={0}
                    alt="Vision Statement"
                    className="bg-[#172840] p-4 rounded-full w-28"
                  />
                  <div>
                    <p className="text-2xl font-base text-white">
                      Vision Statement
                    </p>
                    <span className="text-white font-light text-sm">
                      To become Africa’s foremost collaborative network, shaping
                      global narratives through creativity and technology.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 m-0 md:-ml-24">
                  <Image
                    src="/assets/images/icons/mission.svg"
                    width={140}
                    height={0}
                    alt="Mission Statement"
                    className="bg-[#172840] p-4 rounded-full w-28"
                  />
                  <div>
                    <p className="text-2xl font-base text-white">
                      Mission Statement
                    </p>
                    <span className="text-white font-light text-sm">
                      Empowering African agencies through partnerships, shared
                      resources, and advocacy to deliver world-class solutions.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mx-auto max-w-6xl mt-20">
          <section>
            <p className="uppercase font-semibold mb-4">3. Why Join PAAN?</p>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-20">
              <p className="text-2xl">
                PAAN membership opens doors to global opportunities, exclusive
                resources, and a thriving network of Africa’s top creative and
                tech minds.
              </p>

              <div className="flex md:flex-row flex-col  gap-4">
                <button className="bg-[#F25849] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#D6473C] transition duration-300">
                  Join us Today
                </button>
                <button className="bg-[#172840] text-white px-8 py-3 rounded-full font-medium text-sm transition duration-300 hover:bg-[#6FA1B7]">
                  Discover More
                </button>
              </div>
            </div>

            {/* Right: List with Icons */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <Image
                  src="/assets/images/icons/pan-african-reach.svg"
                  width={50}
                  height={50}
                  alt="Pan-African Reach"
                />
                <p className="text-xl font-base">
                  {" "}
                  Access to Global Brands & Markets
                </p>
              </div>

              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <Image
                  src="/assets/images/icons/strategic-collaboration.svg"
                  width={50}
                  height={50}
                  alt="Strategic Collaboration"
                />
                <p className="text-xl font-base">Shared Resources & Tools</p>
              </div>

              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <Image
                  src="/assets/images/icons/innovation-driven.svg"
                  width={50}
                  height={50}
                  alt="Innovation-Driven"
                />
                <p className="text-xl font-base">
                  PAAN Certification Credibility
                </p>
              </div>

              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <Image
                  src="/assets/images/icons/shared-knowledge-growth.svg"
                  width={50}
                  height={50}
                  alt="Shared Knowledge & Growth"
                />
                <p className="text-xl font-base">Knowledge Hubs & Webinars</p>
              </div>

              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <Image
                  src="/assets/images/icons/shared-knowledge-growth.svg"
                  width={50}
                  height={50}
                  alt="Shared Knowledge & Growth"
                />
                <p className="text-xl font-base">
                  Collaborative Revenue Opportunities
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className=" bg-[#D1D3D4]">
          <section className="mx-auto max-w-6xl py-20">
            <div className="flex flex-col mb-10 mx-auto w-3/4">
              <h2 className="text-2xl text-center mb-4">
                Our Structure & Tiers
              </h2>

              <p className="text-center">
                Whether you're a bold startup or a seasoned agency, PAAN offers
                a tier that fits your journey. Join a network designed to
                elevate, empower, and connect.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <Tier1 />
  <Tier2 />
  <Tier3 />
</div>

          </section>
        </div>

        <div className="mx-auto max-w-6xl mt-20">
          <section>
            <p className="uppercase font-semibold mb-4">4. What We Offer</p>
            <p className="text-2xl">
              At PAAN, we go beyond networking. Our core services are built to
              empower, elevate, and connect agencies across Africa and the
              diaspora. Explore what we offer.
            </p>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center mt-10">
            {/* Left Column: Image (Smaller on Larger Screens) */}
            <div className="relative col-span-1 sm:col-span-1">
              <Image
                src="/assets/images/offer.png"
                width={500}
                height={300}
                alt="Team collaboration"
                className="rounded-lg object-cover w-full h-auto"
              />
            </div>

            {/* Right Column: Accordion (Larger Column) */}
            <div className="col-span-1 sm:col-span-2 flex flex-col gap-4">
              <OfferingTab />
            </div>
          </section>
        </div>

        <div className="mx-auto max-w-6xl mt-20 pb-20">
          <section>
            <p className="uppercase font-semibold mb-4">4. Summit & Events</p>
            <p className="text-2xl">
              Experience collaboration in action. Our signature events bring
              together brands, agencies, and thought leaders to shape Africa’s
              creative future.
            </p>
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center mt-10">
            {/* Left Column: Image */}
            <div className="col-span-1 pattern-bg-1 rounded-lg">
              <div className="bg-[#84C1D9]/50 py-16 px-8 rounded-lg h-full">
                <button className="bg-[#172840] text-white px-8 py-3 rounded-full font-medium text-sm transition duration-300 hover:bg-[#1f3c66] mb-4">
                  Webinar
                </button>
                <p className="text-2xl mb-4">Agency Growth Blueprint Webinar</p>

                <div className="flex gap-4 mb-4">
                  <div className="flex items-center gap-2 pb-4">
                    <Icon
                      icon="mdi:location"
                      width="20"
                      height="20"
                      className="flex-shrink-0"
                    />
                    <p className="text-lg font-medium">Online</p>
                  </div>

                  <div className="flex items-center gap-2 pb-4">
                    <Icon
                      icon="zondicons:calendar"
                      width="20"
                      height="20"
                      className="flex-shrink-0"
                    />
                    <p className="text-lg font-medium">Coming Soon</p>
                  </div>
                </div>

                <p>
                  An exclusive webinar designed to equip independent agencies
                  with practical strategies for scaling, winning global clients,
                  and building sustainable operations.
                </p>
              </div>
            </div>

            <div className="col-span-1 pattern-bg-2 rounded-lg">
              <div className="bg-[#F25849]/50 py-16 px-8 rounded-lg h-full">
                <button className="bg-white px-8 py-3 rounded-full font-medium text-sm transition duration-300 hover:bg-[#1f3c66] hover:text-white mb-4">
                  Summit
                </button>
                <p className="text-2xl mb-4 text-white">
                  Inaugural PAAN Summit
                </p>

                <div className="flex gap-4 mb-4">
                  <div className="flex items-center gap-2 pb-4">
                    <Icon
                      icon="mdi:location"
                      width="20"
                      height="20"
                      className="flex-shrink-0 text-white"
                    />
                    <p className="text-lg font-medium text-white">
                      Nairobi, Kenya
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pb-4">
                    <Icon
                      icon="zondicons:calendar"
                      width="20"
                      height="20"
                      className="flex-shrink-0 text-white"
                    />
                    <p className="text-lg font-medium text-white">
                      Coming Soon
                    </p>
                  </div>
                </div>

                <p className="text-white">
                  Our flagship event bringing together Africa’s brightest
                  creative and tech minds for powerful keynotes, networking, and
                  showcases.
                </p>
              </div>
            </div>
            
          </div>

          
        </div>
        <div className="network-bg">
          <section className="mx-auto max-w-6xl py-28 px-6">
            <div className="flex flex-col mb-10 w-full md:w-3/4">
              <h2 className="text-3xl font-medium mb-4 text-[#F2B706]">
              Join the Network That’s Redefining Africa’s Creative Future
              </h2>

              <p className="text-white font-light">
              Step into a powerful alliance of agencies shaping the future of communication, marketing, and tech across Africa and beyond. 
              Whether you're just starting or scaling fast — PAAN is your platform for global impact.
              </p>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <button className="bg-[#F25849] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#D6473C] transition duration-300">
                  Join us Today
                </button>
                <button className="bg-white  px-8 py-3 rounded-full font-medium text-sm transition duration-300 hover:bg-[#6FA1B7]">
                Register for Webinar
                </button>
              </div>
          </section>
        </div>



        <div className="mx-auto max-w-6xl mt-20">


          <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center mt-10">
            {/* Left Column: Image (Smaller on Larger Screens) */}
            <div className="relative col-span-1 sm:col-span-1 flex flex-col gap-10">
              <div>
              <h2 className="text-3xl font-medium mb-4">
              Get in Touch
              </h2>
              <p className="text-gray-500">
              Have questions about PAAN, membership, or upcoming events? 
Reach out — we’re here to connect and support your journey.
              </p>
              </div>
              <div>
              <h2 className="text-lg font-medium mb-4">
              Direct Contact Info
              </h2>
              <div className="flex items-center gap-2 pb-4">
                    <Icon
                      icon="zondicons:calendar"
                      width="20"
                      height="20"
                      className="flex-shrink-0"
                    />
                    <p className="font-medium text-gray-500">secretariat@paan.org</p>
                  </div>

                  <div className="flex items-center gap-2 pb-4">
                    <Icon
                      icon="zondicons:calendar"
                      width="20"
                      height="20"
                      className="flex-shrink-0"
                    />
                    <p className="font-medium text-gray-500">7th Floor, Mitsumi Business Park, Westlands,Nairobi, Kenya</p>
                  </div>
              </div>
            </div>

            {/* Right Column: Accordion (Larger Column) */}
            <div className="col-span-1 sm:col-span-2 flex flex-col gap-4">
              <ContactForm />
            </div>
          </section>
        </div>



      </main>
    </>
  );
};

export default HomePage;
