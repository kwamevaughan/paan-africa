import { useState } from "react";
import { Icon } from "@iconify/react"; // Import Icon from iconify
import Image from "next/image";

export default function FreelanceBenefitsSlider() {
  const [startIndex, setStartIndex] = useState(0);

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

  // Calculate the visible cards (3 at a time)
  const visibleCards = [];
  for (let i = 0; i < 3; i++) {
    const index = (startIndex + i) % cards.length;
    visibleCards.push({
      ...cards[index],
      originalIndex: index,
    });
  }

  const nextSlide = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="mt-10 mb-16 relative">
      <section className="relative">
        <div className="relative">
          {/* Card Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {visibleCards.map((card, index) => (
              <div
                key={card.originalIndex}
                className={`${card.bgColor} rounded-lg shadow overflow-hidden transition-all duration-300 h-full ${
                  index === 1
                    ? "ring-2 ring-blue-500 transform scale-105"
                    : "scale-95"
                }`}
              >
                <div className="h-full flex flex-col">
                  <div className="p-4 flex flex-col h-full">
                    {/* Content Container - Equal Height */}
                    <div className="flex flex-col md:flex-row gap-3 flex-grow">
                      {/* Description */}
                      <div className="w-full md:w-1/2 text-xs">
                        {/* Title */}
                        <h4 className="text-md font-bold mb-4 text-gray-800">
                          {card.title}
                        </h4>
                        <p className="text-gray-600">{card.description}</p>
                      </div>

                      {/* Image */}
                      <div className="w-full md:w-1/2 flex items-center justify-center">
                        <Image
                          src={card.image}
                          width={300}
                          height={300}
                          alt={card.title}
                          className="rounded w-full h-auto object-cover shadow"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute -bottom-10 right-0 flex items-center space-x-2 mt-6">
            <button
              onClick={prevSlide}
              className="p-2 bg-[#F25849] hover:bg-gray-300 rounded-full transition-colors shadow text-white"
              aria-label="Previous slide"
            >
              {/* Iconify Left Chevron Icon */}
              <Icon
                icon="mdi:chevron-left"
                width={24}
                height={24}
                color="white"
              />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 bg-[#F25849] hover:bg-gray-300 rounded-full transition-colors shadow text-white"
              aria-label="Next slide"
            >
              {/* Iconify Right Chevron Icon */}
              <Icon
                icon="mdi:chevron-right"
                width={24}
                height={24}
                color="white"
              />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
