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
      <section className="mx-auto max-w-6xl py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6">
        <h2 className="text-2xl sm:text-3xl text-center md:text-4xl font-normal text-paan-dark-blue">Summit Tracks</h2>
        <h3 className="text-sm sm:text-base md:text-md font-normal py-3 sm:py-4 text-center text-paan-dark-blue">Tracks and the two-day agenda snapshot.</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {tracks.map((track) => (
            <div 
              key={track.id} 
              className={`relative rounded-lg shadow-lg overflow-hidden h-60 sm:h-72 md:h-80 lg:h-96 ${track.id === 7 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              <Image
                src={track.image}
                alt={track.title}
                fill
                className="object-contain object-center -mt-20"
              />
              <div 
                className="absolute bottom-0 left-0 right-0 bg-[#DAECF3] rounded-t-lg p-4 sm:p-6 transition-all duration-300"
                style={{
                  backgroundImage: 'none',
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <h4 
                  className={`text-base sm:text-lg ${track.id === 7 ? 'md:text-l' : 'md:text-xl'} font-bold text-paan-dark-blue mb-1 sm:mb-2 line-clamp-2 transition-colors duration-300`}
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: '1.3',
                    height: '2.6em'
                  }}
                >
                  {track.title.includes(' & ') ? (
                    <>
                      {track.title.split(' & ')[0]} &<br/>{track.title.split(' & ').slice(1).join(' & ')}
                    </>
                  ) : (
                    track.title
                  )}
                </h4>
                <p className="text-paan-dark-blue text-sm sm:text-base transition-colors duration-300">{track.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {track.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-paan-yellow rounded-full"></div>
                      <small className="text-xs text-paan-dark-blue transition-colors duration-300">{feature}</small>
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
