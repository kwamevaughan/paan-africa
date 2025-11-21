const MarqueeSection = () => {
  const marqueeRow1 = [
    "Creative Industry Leaders",
    "Tech & Platform Innovators",
    "Policy Makers",
    "Investors"
  ];

  const marqueeRow2 = [
    "Brand Owners",
    "Brand Strategists",
    "UX/UI Designers",
    "Marketing Leaders"
  ];

  const colors = {
    red: "text-paan-red",
    blue: "text-paan-blue",
    darkBlue: "text-paan-dark-blue",
    yellow: "text-paan-yellow",
    maroon: "text-paan-maroon"
  };

  return (
    <div className="bg-[#DAECF3] relative py-12 sm:py-16 md:py-20">
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex justify-center mb-8 sm:mb-12">
          <h2 className="text-xs sm:text-sm w-fit border border-paan-dark-blue text-paan-dark-blue mb-4 bg-paan-blue rounded-full px-3 sm:px-4 py-1">
            Who's in the room
          </h2>
        </div>
        
        {/* First Marquee - Right Direction */}
        <div className="w-full overflow-hidden whitespace-nowrap py-4 sm:py-5 bg-white/20 rounded-lg mb-3 sm:mb-4">
          <div className="inline-flex animate-marquee-right">
            <div className="flex space-x-4 sm:space-x-6 md:space-x-8 whitespace-nowrap">
              {[...Array(4)].map((_, i) => (
                <div key={`right-${i}`} className="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
                  <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">
                    {marqueeRow1[0]}
                  </span>
                  <span className={`text-2xl sm:text-3xl ${colors.red}`}>•</span>
                  <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">
                    {marqueeRow1[1]}
                  </span>
                  <span className={`text-2xl sm:text-3xl ${colors.blue}`}>•</span>
                  <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">
                    {marqueeRow1[2]}
                  </span>
                  <span className={`text-2xl sm:text-3xl ${colors.darkBlue}`}>•</span>
                  <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">
                    {marqueeRow1[3]}
                  </span>
                  <span className={`text-2xl sm:text-3xl ${colors.yellow}`}>•</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second Marquee - Left Direction */}
        <div className="w-full overflow-hidden whitespace-nowrap py-4 sm:py-5 bg-white/20 rounded-lg">
          <div className="inline-flex animate-marquee-left">
            <div className="flex space-x-4 sm:space-x-6 md:space-x-8 whitespace-nowrap">
              {[...Array(4)].map((_, i) => (
                <div key={`left-${i}`} className="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
                  <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">
                    {marqueeRow2[0]}
                  </span>
                  <span className={`text-2xl sm:text-3xl ${colors.red}`}>•</span>
                  <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">
                    {marqueeRow2[1]}
                  </span>
                  <span className={`text-2xl sm:text-3xl ${colors.blue}`}>•</span>
                  <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">
                    {marqueeRow2[2]}
                  </span>
                  <span className={`text-2xl sm:text-3xl ${colors.maroon}`}>•</span>
                  <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">
                    {marqueeRow2[3]}
                  </span>
                  <span className={`text-2xl sm:text-3xl ${colors.yellow}`}>•</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarqueeSection;
