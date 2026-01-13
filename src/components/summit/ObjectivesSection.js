const ObjectivesSection = ({ sectionRef, handleScroll, isFixed }) => {
  const objectives = [
    {
      icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/padlock.svg",
      alt: "Unlock Icon",
      text: "Unlock cross‑border collaboration & deal flow"
    },
    {
      icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/chain-link.svg?updatedAt=1763114499609",
      alt: "Connect Icon",
      text: "Showcase & commercialise African creative talent"
    },
    {
      icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/user-group.svg",
      alt: "Community Icon",
      text: "Advance skills, standards & innovation"
    },
    {
      icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/heart-icon.svg",
      alt: "Impact Icon",
      text: "Create opportunities for youth & underrepresented talent"
    }
  ];

  return (
    <div className="bg-white relative py-12 sm:py-16 md:py-20" id="objectives" ref={sectionRef} handleScroll={handleScroll} isFixed={isFixed}>
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#172840] font-normal mb-3 sm:mb-4">Summit Objectives</h2>
          <h3 className="text-base sm:text-lg md:text-xl text-[#172840] font-normal max-w-3xl mx-auto">What we aim to achieve across two days of sessions, clinics, deal rooms, and networking.</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {objectives.map((objective, index) => (
            <div 
              key={index} 
              className="bg-paan-dark-blue rounded-lg shadow-lg p-5 sm:p-7 md:p-8 flex flex-col h-full relative overflow-hidden group transition-all duration-300 hover:shadow-xl"
            >
              {/* Gradient background layer - visible on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#F25849] to-[#172840] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Pattern background layer - visible on hover */}
              <div 
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300 z-[1]"
                style={{
                  backgroundImage: `url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/summit-objective-pattern.webp')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'repeat'
                }}
              ></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-start mb-5 sm:mb-6">
                  <img src={objective.icon} alt={objective.alt} className="w-10 h-10 sm:w-12 sm:h-12" />
                </div>
                <p className="text-white text-sm sm:text-base font-normal text-left mt-auto">{objective.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ObjectivesSection;
