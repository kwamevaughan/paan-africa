import Image from "next/image";
import { tracks } from '@/data/summit/tracks';

const TracksSection = ({ sectionRefs, handleScroll, isFixed }) => {
  const handleMouseEnter = (e) => {
    const infoSection = e.currentTarget;
    infoSection.style.backgroundColor = 'transparent';
    infoSection.style.backgroundImage = 'url(https://ik.imagekit.io/nkmvdjnna/PAAN/summit/tracks-pattern.webp), linear-gradient(to bottom left, #172840, #F25849)';
    infoSection.style.backgroundSize = 'cover, cover';
    infoSection.style.backgroundPosition = 'center, center';
    infoSection.style.backgroundBlendMode = 'overlay';
    
    // Change text colors to white
    const textElements = infoSection.querySelectorAll('h4, p, small');
    textElements.forEach(el => {
      el.style.color = '#ffffff';
    });
  };

  const handleMouseLeave = (e) => {
    const infoSection = e.currentTarget;
    infoSection.style.backgroundColor = '#DAECF3';
    infoSection.style.backgroundImage = 'none';
    
    // Restore text colors
    const textElements = infoSection.querySelectorAll('h4, p, small');
    textElements.forEach(el => {
      el.style.color = '';
    });
  };

  return (
    <div className="bg-white relative overflow-hidden" id="program" ref={sectionRefs?.program}>
      <section className="mx-auto max-w-6xl py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl text-center md:text-4xl font-normal text-paan-dark-blue mb-2 sm:mb-3">Summit Tracks</h2>
        <h3 className="text-sm sm:text-base md:text-lg font-normal py-2 sm:py-3 md:py-4 text-center text-paan-dark-blue mb-6 sm:mb-8">Tracks and the two-day agenda snapshot.</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {tracks.map((track) => (
            <div 
              key={track.id} 
              className={`relative rounded-lg shadow-lg overflow-hidden min-h-[320px] sm:min-h-[360px] md:h-80 lg:h-96 flex flex-col md:block ${track.id === 7 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              {/* Image - full height on desktop, constrained on mobile */}
              <div className="relative flex-1 min-h-[180px] sm:min-h-[200px] md:absolute md:inset-0 overflow-hidden">
                <Image
                  src={track.image}
                  alt={track.title}
                  fill
                  className="object-cover md:object-contain md:object-center md:-mt-20"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {/* Content - below image on mobile, overlay at bottom on desktop */}
              <div 
                className="bg-[#DAECF3] rounded-b-lg md:rounded-t-lg p-4 sm:p-5 md:p-6 transition-all duration-300 md:absolute md:bottom-0 md:left-0 md:right-0 z-10"
                style={{
                  backgroundImage: 'none',
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <h4 
                  className={`text-base sm:text-lg ${track.id === 7 ? 'md:text-lg' : 'md:text-xl'} font-bold text-paan-dark-blue mb-2 sm:mb-3 transition-colors duration-300 line-clamp-2`}
                >
                  {track.title.includes(' & ') ? (
                    <>
                      {track.title.split(' & ')[0]} &<br className="hidden sm:block"/>{track.title.split(' & ').slice(1).join(' & ')}
                    </>
                  ) : (
                    track.title
                  )}
                </h4>
                <p className="text-paan-dark-blue text-xs sm:text-sm md:text-base mb-3 sm:mb-4 transition-colors duration-300 line-clamp-2">{track.description}</p>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {track.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-paan-yellow rounded-full flex-shrink-0"></div>
                      <small className="text-[10px] sm:text-xs text-paan-dark-blue transition-colors duration-300 leading-tight">{feature}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TracksSection;
