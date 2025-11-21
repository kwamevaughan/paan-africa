import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { sessions } from '@/data/summit/sessions';

const SessionsSection = ({ sectionRef }) => {
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [visibleSessions] = useState(3);

  const nextSessions = () => {
    setCurrentSessionIndex((prev) => 
      prev + visibleSessions >= sessions.length ? 0 : prev + 1
    );
  };

  const prevSessions = () => {
    setCurrentSessionIndex((prev) => 
      prev === 0 ? Math.max(0, sessions.length - visibleSessions) : prev - 1
    );
  };

  const getVisibleSessions = () => {
    return sessions.slice(currentSessionIndex, currentSessionIndex + visibleSessions);
  };

  return (
    <div className="bg-paan-dark-blue relative py-12 sm:py-16 md:py-20" id="sessions-section" ref={sectionRef}>
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-6 sm:mb-8 gap-4">
          <div>
            <h2 className="text-xs sm:text-sm w-fit text-white border border-white mb-3 sm:mb-4 bg-transparent text-white rounded-full px-3 sm:px-4 py-1">Special Features</h2>
            <h3 className="text-2xl sm:text-3xl text-white font-bold uppercase">Beyond the sessions</h3>
            <p className="text-base sm:text-lg md:text-xl font-normal text-white mb-4">Experience Nairobi and make connections that last.</p>
          </div>
          <div className="flex gap-2 self-end">
            <button 
              onClick={prevSessions}
              className="w-10 h-10 sm:w-12 sm:h-12 border border-white text-white rounded-full flex items-center justify-center hover:bg-white hover:text-paan-dark-blue transition-colors duration-300 shadow-lg"
              disabled={currentSessionIndex === 0}
            >
              <Icon icon="mdi:chevron-left" width="20" height="20" />
            </button>
            <button 
              onClick={nextSessions}
              className="w-10 h-10 sm:w-12 sm:h-12 border border-white text-white rounded-full flex items-center justify-center hover:bg-white hover:text-paan-dark-blue transition-colors duration-300 shadow-lg"
              disabled={currentSessionIndex + visibleSessions >= sessions.length}
            >
              <Icon icon="mdi:chevron-right" width="20" height="20" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {getVisibleSessions().map((session) => (
            <div key={session.id} className="relative rounded-xl shadow-xl overflow-hidden group cursor-pointer h-80 sm:h-96">
              <Image
                src={session.image}
                alt={session.title}
                width={400}
                height={500}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-2">{session.title}</h4>
                    <p className="text-white/90 text-xs sm:text-sm leading-relaxed">{session.description}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="inline-block bg-paan-blue text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {session.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SessionsSection;
