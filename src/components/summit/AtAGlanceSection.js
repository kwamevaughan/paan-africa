import { Icon } from "@iconify/react";

const AtAGlanceSection = () => {
  return (
    <div className="mt-6 sm:mt-10 bg-[#DAECF3] relative">
      <section className="relative text-center mx-auto max-w-6xl py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl uppercase font-bold">AT A GLANCE</h2>
        <h3 className="text-sm sm:text-base md:text-md font-normal py-3 sm:py-4">The scale and reach of the Summit.</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4">
            <div className="flex justify-end mb-2">
              <div className="flex -space-x-1 sm:-space-x-2">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white flex items-center justify-center ${
                    i === 0 ? 'bg-[#F25849]' : i === 1 ? 'bg-[#84C1D9]' : i === 2 ? 'bg-[#172840]' : 'bg-[#D1D3D4]'
                  }`}>
                    <Icon icon="mdi:account" className="text-white" width="12" height="12" />
                  </div>
                ))}
              </div>
            </div>
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-left">500+</h4>
            <h5 className="text-sm sm:text-base font-normal text-left">In-person Attendees</h5>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4">
            <div className="flex justify-end mb-2">
              <div className="flex -space-x-1">
                {['ke', 'ng', 'za', 'tz', 'ug', 'gh'].map((country) => (
                  <div key={country} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white flex items-center justify-center overflow-hidden shadow-sm">
                    <img src={`https://flagcdn.com/w40/${country}.png`} alt={country} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-left">20+</h4>
            <h5 className="text-sm sm:text-base font-normal text-left">Countries Represented</h5>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4">
            <div className="flex justify-end mb-2">
              <img 
                src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/003-videocall%201.svg" 
                alt="Video Call" 
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
            </div>
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-left">2,000+</h4>
            <h5 className="text-sm sm:text-base font-normal text-left">Streaming Attendees</h5>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4">
            <div className="flex justify-end mb-2">
              <img 
                src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/038-microphones%201.svg" 
                alt="Microphones" 
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
            </div>
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-left">30+</h4>
            <h5 className="text-sm sm:text-base font-normal text-left">Industry‑leading speakers</h5>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4">
            <div className="flex justify-end mb-2">
              <img 
                src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/008-meeting%201.svg" 
                alt="Meeting" 
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
            </div>
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-left">50+</h4>
            <h5 className="text-sm sm:text-base font-normal text-left">Investors & funds</h5>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4">
            <div className="flex justify-end mb-2">
              <img 
                src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/023-network%201.svg" 
                alt="Network" 
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
            </div>
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-left">40+</h4>
            <h5 className="text-sm sm:text-base font-normal text-left">Sessions & clinics</h5>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 pt-4">
          <button 
            onClick={() => window.location.href = '/summit/purchase-ticket'}
            className="bg-paan-red text-white px-6 sm:px-8 py-3 text-sm sm:text-base font-medium w-full sm:w-auto rounded-full hover:bg-paan-red/90 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
          >
            Register Now
          </button>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('openPartnerModal'))}
            className="bg-transparent border border-paan-dark-blue text-paan-dark-blue px-6 sm:px-8 py-3 rounded-full hover:bg-paan-dark-blue hover:text-white transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            Partner With Us
          </button>
          <button 
            onClick={() => window.location.href = '#agenda'} 
            className="bg-transparent border border-paan-dark-blue text-paan-dark-blue px-6 sm:px-8 py-3 rounded-full hover:bg-paan-dark-blue hover:text-white transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            View Agenda
          </button>
        </div>
      </section>
    </div>
  );
};

export default AtAGlanceSection;
