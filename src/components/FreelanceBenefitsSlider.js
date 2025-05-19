import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FreelanceBenefitsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const cards = [
    {
      title: "High-Value Briefs",
      description: "Work on meaningful campaigns with vetted agencies and brands across Africa—no more low-paying gigs or unreliable clients wasting your potential.",
      image: "/assets/images/high-value-brief.png",
      bgColor: "bg-[#84C1D9]"
    },
    {
      title: "Skill Growth",
      description: "Expand your capabilities through workshops, mentorship, and hands-on projects. We provide resources to help you stay ahead of industry trends and develop valuable new competencies.",
      image: "/assets/images/high-value-brief.png",
      bgColor: "bg-[#F2B706]"
    },
    {
      title: "Business Support",
      description: "Focus on your craft while we handle client acquisition, contracts, invoicing, and project management. Our team ensures smooth operations so you can deliver your best work.",
      image: "/assets/images/high-value-brief.png",
      bgColor: "bg-[#F25849]"
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1));
  };

  return (
    <div className="mt-10 mb-16 relative">
      <section className="relative">
        <div className="relative">
          {/* Card Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cards.map((card, index) => (
              <div 
                key={index} 
                className={`${card.bgColor} rounded-lg shadow overflow-hidden transition-all duration-300 h-full ${
                  activeIndex === index ? 'ring-2 ring-blue-500 transform scale-105' : 'scale-95'
                }`}
              >
                <div className="h-full flex flex-col">
                  <div className="p-4 flex flex-col h-full">
                    
                    
                    {/* Content Container - Equal Height */}
                    <div className="flex flex-col md:flex-row gap-3 flex-grow">
                      {/* Description */}
                      <div className="w-full md:w-1/2 text-xs">
                        {/* Title */}
                        <h4 className="text-md font-bold mb-4 text-gray-800">{card.title}</h4>
                        <p className="text-gray-600">{card.description}</p>
                      </div>
                      
                      {/* Image */}
                      <div className="w-full md:w-1/2 flex items-center justify-center">
                        <img 
                          src={card.image} 
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
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 bg-[#F25849] hover:bg-gray-300 rounded-full transition-colors shadow text-white"
              aria-label="Next slide"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}