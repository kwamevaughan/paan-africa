const ExhibitionSection = () => {
  return (
    <div className="relative py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 overflow-hidden h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px]" id="exhibition">
      {/* Parallax Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center sm:bg-fixed bg-scroll"
        style={{
          backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/exhibitor.png')",
          filter: "brightness(0.8)",
          backgroundPosition: "center center"
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-paan-dark-blue/40 sm:bg-paan-dark-blue/30"></div>
      
      <section className="relative mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 h-full flex items-center">
        <div className="w-full">
          <div className="flex flex-col justify-center items-center text-center sm:text-left sm:items-start space-y-4 sm:space-y-6 md:space-y-8">
            {/* Badge */}
            <h2 className="text-xs sm:text-sm w-fit text-white border border-white/80 bg-transparent rounded-full px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm">
              Exhibition Opportunities
            </h2>
            
            {/* Main Heading */}
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-bold uppercase leading-tight max-w-3xl">
              Showcase your brand at Africa's Borderless Creative Economy Summit.
            </h3>
            
            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg font-normal text-white/90 leading-relaxed max-w-2xl">
              Join leading agencies, startups, and creative innovators in the Exhibition Zone. Connect with investors and partners at Africa's most influential creative economy gathering.
            </p>
          </div>
          
          {/* CTA Button */}
          <div className="flex justify-center sm:justify-start mt-6 sm:mt-8 md:mt-10">
            <button 
              onClick={() => window.location.href = '/summit/exhibitors'} 
              className="bg-paan-red hover:bg-paan-red/90 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full transition-all duration-300 font-medium text-sm sm:text-base shadow-lg hover:shadow-xl flex items-center justify-center gap-2 w-full max-w-xs sm:max-w-sm md:w-auto min-h-[48px] active:scale-95"
            >
              <span>View Exhibition Options</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExhibitionSection;
