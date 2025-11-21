import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { speakers } from '@/data/summit/speakers';

const SpeakersSection = ({ sectionRef }) => {
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState(0);
  const [visibleSpeakers] = useState(3);

  const nextSpeakers = () => {
    setCurrentSpeakerIndex((prev) => 
      prev + visibleSpeakers >= speakers.length ? 0 : prev + 1
    );
  };

  const prevSpeakers = () => {
    setCurrentSpeakerIndex((prev) => 
      prev === 0 ? Math.max(0, speakers.length - visibleSpeakers) : prev - 1
    );
  };

  const getVisibleSpeakers = () => {
    return speakers.slice(currentSpeakerIndex, currentSpeakerIndex + visibleSpeakers);
  };

  return (
    <div className="bg-white relative py-12 sm:py-16 md:py-20" id="speakers-section" ref={sectionRef}>
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-6 sm:mb-8 gap-4">
          <div>
            <h2 className="text-xs sm:text-sm w-fit text-paan-dark-blue mb-3 sm:mb-4 bg-paan-blue text-white rounded-full px-3 sm:px-4 py-1">Our Speakers</h2>
            <h3 className="text-2xl sm:text-3xl text-paan-dark-blue font-bold uppercase">Meet the speakers</h3>
            <p className="text-base sm:text-lg md:text-xl font-normal text-paan-dark-blue mb-4">Africa's top creators, innovators, and enablers.</p>
          </div>
          <div className="flex gap-2 self-end">
            <button 
              onClick={prevSpeakers}
              className="w-10 h-10 sm:w-12 sm:h-12 border border-paan-dark-blue text-paan-dark-blue rounded-full flex items-center justify-center hover:bg-paan-dark-blue hover:text-white transition-colors duration-300 shadow-lg"
              disabled={currentSpeakerIndex === 0}
            >
              <Icon icon="mdi:chevron-left" width="20" height="20" />
            </button>
            <button 
              onClick={nextSpeakers}
              className="w-10 h-10 sm:w-12 sm:h-12 border border-paan-dark-blue text-paan-dark-blue rounded-full flex items-center justify-center hover:bg-paan-dark-blue hover:text-white transition-colors duration-300 shadow-lg"
              disabled={currentSpeakerIndex + visibleSpeakers >= speakers.length}
            >
              <Icon icon="mdi:chevron-right" width="20" height="20" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {getVisibleSpeakers().map((speaker) => (
            <div key={speaker.id} className="relative rounded-xl shadow-xl overflow-hidden group cursor-pointer h-80 sm:h-96">
              <Image
                src={speaker.image}
                alt={speaker.name}
                width={400}
                height={500}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center p-4 sm:p-6">
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-paan-dark-blue mb-2">{speaker.name}</h4>
                  <p className="text-paan-dark-blue mb-4 text-sm sm:text-base">{speaker.title}</p>
                  <div className="flex justify-center">
                    <a 
                      href={speaker.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform duration-200"
                    >
                      <Icon icon="mdi:linkedin" className="text-paan-dark-blue" width="28" height="28" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-1">{speaker.name}</h4>
                    <p className="text-white/90 text-xs sm:text-sm">{speaker.title}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <a 
                      href={speaker.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform duration-200"
                    >
                      <Icon icon="mdi:linkedin" className="text-white" width="20" height="20" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center sm:justify-start gap-2 mt-6 sm:mt-8">
          <button 
            onClick={() => window.location.href = '/summit/speaker-application'} 
            className="bg-transparent border border-paan-dark-blue text-paan-dark-blue px-6 sm:px-8 py-3 rounded-full hover:bg-paan-dark-blue hover:text-white transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            Apply to Speak
          </button>
        </div>
      </section>
    </div>
  );
};

export default SpeakersSection;
