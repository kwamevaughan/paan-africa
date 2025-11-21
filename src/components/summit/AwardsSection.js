const AwardsSection = ({ sectionRef }) => {
  const awards = [
    {
      title: "Pan African Agency of the Year",
      description: "Honoring the agency pushing creative boundaries across markets."
    },
    {
      title: "Creative Innovation Award",
      description: "Recognizing breakthrough creative solutions and innovative approaches."
    },
    {
      title: "Digital Excellence Award",
      description: "Celebrating outstanding digital campaigns and tech integration."
    }
  ];

  return (
    <div className="bg-[#DAECF3] relative py-20" id="paan-awards-section" ref={sectionRef}>
      <section className="relative mx-auto max-w-6xl">
        <div className="text-left mb-12">
          <h2 className="text-sm w-fit text-white mb-4 bg-paan-blue text-white rounded-full px-4 py-1">Awards</h2>        
          <h3 className="text-3xl text-paan-dark-blue font-bold uppercase">Pan-African Creative Awards</h3>
          <p className="text-xl font-normal text-paan-dark-blue mb-8">Celebrating Africa's boldest agencies and creators.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {awards.map((award, index) => (
            <div key={index} className="bg-paan-dark-blue w-80 h-80 rounded-full shadow-xl overflow-hidden relative flex items-center justify-center">
              <div className="absolute inset-4 flex items-center justify-center">
                <img 
                  src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/awards-ring.svg?updatedAt=1757757368902" 
                  alt="Awards Ring" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="text-center relative z-10 max-w-48">
                <h4 className="text-lg font-bold text-white mb-3" dangerouslySetInnerHTML={{ __html: award.title.replace(/ /g, '<br/>') }} />
                <p className="text-white font-light text-xs leading-relaxed">{award.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-12">
          <button 
            onClick={() => window.location.href = '/paan-awards'} 
            className="bg-paan-red text-white px-8 py-3 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-base shadow-lg flex items-center gap-2"
          >
            Explore All Categories
          </button>
        </div>
      </section>
    </div>
  );
};

export default AwardsSection;
