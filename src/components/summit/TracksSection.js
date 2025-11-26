import Image from "next/image";
import { tracks } from '@/data/summit/tracks';

const TracksSection = ({ sectionRef }) => {
  return (
    <div className="bg-paan-dark-blue relative" id="program" ref={sectionRef}>
      <section className="mx-auto max-w-6xl py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          <div className="text-left">
            <h2 className="text-xs sm:text-sm border w-fit border-white text-white rounded-full px-3 sm:px-4 py-1 sm:py-2 text-center mb-2 sm:mb-3">Summit Tracks</h2>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase text-paan-yellow">Tracks</h3>
          </div>
          <div className="mt-2 sm:mt-0">
            <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight">
              Tracks and the two-day<br className="hidden sm:block"/> agenda snapshot.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {tracks.map((track) => (
            <div key={track.id} className={`group relative rounded-lg shadow-lg overflow-hidden h-60 sm:h-72 md:h-80 lg:h-96 ${track.id === 7 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
              <Image
                src={track.image}
                alt={track.title}
                fill
                className="object-contain object-center -mt-20"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-lg p-4 sm:p-6">
                <h4 className="text-base sm:text-lg md:text-xl font-bold text-paan-dark-blue mb-1 sm:mb-2" dangerouslySetInnerHTML={{ __html: track.title.replace(/&/g, '&<br/>') }} />
                <p className="text-paan-dark-blue text-sm sm:text-base">{track.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {track.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-paan-yellow rounded-full"></div>
                      <small className="text-xs text-paan-dark-blue">{feature}</small>
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
