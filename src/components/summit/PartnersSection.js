const PartnersSection = () => {
  const partners = [
    { name: "AIA", logo: "/assets/images/partners/aia.svg", bg: "#1a1a1a" },
    { name: "IAN", logo: "/assets/images/partners/IAN.png", bg: "#ffffff" },
    { name: "ICCO", logo: "/assets/images/partners/ICCO.png", bg: "#ffffff" },
    { name: "PRCA", logo: "/assets/images/partners/PRCA.png", bg: "#ffffff" },
    { name: "Viamo", logo: "/assets/images/partners/viamo.svg", bg: "#1a1a1a" },
    { name: "Growthpad", logo: "/assets/images/partners/gcg.png", bg: "#ffffff" },
    { name: "Penguin Agency", logo: "/assets/images/partners/penquin.png", bg: "#ffffff" },
    { name: "CEvent", logo: "/assets/images/partners/cevent.png", bg: "#ffffff" }
  ];

  return (
    <div className="bg-[#D1D3D4] relative py-12 sm:py-16 md:py-20">
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4">
          <h3 className="text-2xl sm:text-3xl text-paan-dark-blue font-bold uppercase">Our Partners</h3>
          <p className="text-base sm:text-lg md:text-xl font-normal text-paan-dark-blue mb-6 sm:mb-8">
            Join leading agencies, startups, and creative innovators in the Exhibition Zone. Share your work, connect with investors and partners, and stand out at Africa's most influential creative economy gathering.
          </p>
        </div>
        
        <div className="w-full overflow-hidden whitespace-nowrap py-6 sm:py-8">
          <div className="inline-flex animate-marquee-right">
            <div className="flex space-x-6 sm:space-x-8 md:space-x-10 whitespace-nowrap">
              {[...Array(3)].map((_, i) => (
                <div key={`partners-${i}`} className="flex items-center space-x-6 sm:space-x-8 md:space-x-10">
                  {partners.map((partner, idx) => (
                    <div 
                      key={`${i}-${idx}`}
                      className="bg-white w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative flex items-center justify-center flex-shrink-0 border border-gray-100" 
                      style={{ backgroundColor: partner.bg }}
                    >
                      <img src={partner.logo} alt={`${partner.name} Logo`} className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnersSection;
