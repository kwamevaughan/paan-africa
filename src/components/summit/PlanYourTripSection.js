import { Icon } from "@iconify/react";
import Accordion from "@/components/Accordion";

const PlanYourTripSection = () => {
  return (
    <div className="bg-white relative py-12 sm:py-16 md:py-20" id="plan-your-trip">
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-left mb-8 sm:mb-12">
          <h3 className="text-xs sm:text-sm w-fit text-white font-light bg-paan-blue rounded-full px-3 sm:px-4 py-2 mb-3 sm:mb-4">Plan Your Trip</h3>
          <h2 className="text-2xl sm:text-3xl text-paan-dark-blue font-bold uppercase mb-3 sm:mb-4">Plan Your Trip</h2>
          <p className="text-base sm:text-lg md:text-xl font-normal text-paan-dark-blue">Smooth logistics, unforgettable Nairobi experience.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Venue Information Card */}
          <div className="bg-gradient-to-br from-[#DAECF4] to-[#F3F9FB] rounded-xl p-4 sm:p-6 shadow-lg">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="bg-paan-red rounded-full p-2">
                <Icon icon="mdi:map-marker" className="text-white" width="20" height="20" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-paan-dark-blue">Venue Information</h3>
            </div>
            <p className="text-paan-dark-blue mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Final venue details will be announced soon. Expect world‑class facilities, breakout rooms for deal‑making, and easy access to Nairobi's creative hubs.
            </p>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <Icon icon="mdi:map-marker" className="text-paan-red" width="16" height="16" />
                  <h4 className="font-semibold text-paan-dark-blue text-sm sm:text-base">Sarit Centre, Nairobi</h4>
                </div>
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=Sarit+Centre+Nairobi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-paan-blue hover:text-paan-red transition-colors text-xs sm:text-sm"
                >
                  View Directions →
                </a>
              </div>
              
              <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <Icon icon="mdi:calendar" className="text-paan-red" width="16" height="16" />
                  <h4 className="font-semibold text-paan-dark-blue text-sm sm:text-base">Event Dates</h4>
                </div>
                <p className="text-paan-dark-blue text-sm sm:text-base">April 21-22, 2026</p>
              </div>
            </div>
          </div>

          {/* Travel Support Card */}
          <div className="bg-gradient-to-br from-[#F3F9FB] to-[#DAECF4] rounded-xl p-4 sm:p-6 shadow-lg">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="bg-paan-blue rounded-full p-2">
                <Icon icon="mdi:help-circle" className="text-white" width="20" height="20" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-paan-dark-blue">Travel Support</h3>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md">
                <h4 className="font-semibold text-paan-dark-blue mb-2 text-sm sm:text-base">Need Assistance?</h4>
                <p className="text-paan-dark-blue text-xs sm:text-sm mb-3">
                  Our travel team is here to help with logistics, accommodation, and any questions you might have.
                </p>
                <a 
                  href="mailto:secretariat@paan.africa" 
                  className="text-paan-blue hover:text-paan-red transition-colors font-medium text-xs sm:text-sm break-all"
                >
                  secretariat@paan.africa
                </a>
              </div>
              
              <button onClick={() => window.location.href = '/summit/travel-guide'} className="w-full bg-paan-dark-blue text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-paan-red transition-all duration-300 font-medium shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base">
                <Icon icon="mdi:book-open" width="16" height="16" />
                Open Travel Guide
              </button>
            </div>
          </div>
        </div>
            
        {/* Accordion */}
        <div className="w-full">
          <h3 className="text-xl sm:text-2xl font-bold text-paan-dark-blue mb-4 sm:mb-6">Frequently Asked Questions</h3>
          <Accordion 
                items={[
                  {
                    title: "Who Should Attend?",
                    content: "Creators, freelancers, agencies, tech founders, investors, and policy makers."
                  },
                  {
                    title: "Accommodation",
                    content: "We've secured special rates at partner hotels near the venue. Options range from luxury hotels to budget-friendly accommodations. All partner hotels offer complimentary airport transfers and are within walking distance of the summit venue."
                  },
                  {
                    title: "Visa Requirements",
                    content: "Most African citizens can enter Kenya visa-free or with visa-on-arrival. International visitors should check visa requirements based on their nationality. We can provide invitation letters to support visa applications if needed."
                  },
                  {
                    title: "Transportation",
                    content: "Nairobi has a reliable network of taxis, ride-sharing services, and public transport. We'll provide detailed transportation guides and can arrange group transfers from the airport to the venue for registered attendees."
                  },
                  {
                    title: "Safety & Security",
                    content: "Nairobi is generally safe for visitors, especially in Westands where our venue is located. We work with local security partners to ensure a safe environment. Basic safety precautions are recommended as in any major city."
                  }
                ]}
              />
        </div>
      </section>
    </div>
  );
};

export default PlanYourTripSection;
