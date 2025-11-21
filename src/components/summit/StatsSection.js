import { Icon } from "@iconify/react";

const StatsSection = ({ counts, sectionRef }) => {
  return (
    <div className="bg-paan-red relative py-20" id="stats-section" ref={sectionRef}>
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/clip-art.svg" 
          alt="Background clip art" 
          className="w-full h-full object-cover"
        />
      </div>
      <section className="relative mx-auto max-w-6xl flex items-center justify-center min-h-[400px]">
        <div className="text-center grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="text-white">
            <div className="p-6 pt-8 text-center">
              <h4 className="text-5xl font-bold mb-2 text-white">{counts.investorMeetings}+</h4>
              <p className="text-white mb-8 text-xl">Curated 1:1 investor meetings</p>
            </div>
          </div>
          <div className="text-white">
            <div className="p-6 pt-8 text-center">
              <h4 className="text-5xl font-bold mb-2 text-white">{counts.ndasSigned}+</h4>
              <p className="text-white mb-8 text-xl">NDAs signed during Deal Rooms</p>
            </div>
          </div>
          <div className="text-white">
            <div className="p-6 pt-8 text-center">
              <h4 className="text-5xl font-bold mb-2 text-white">${counts.termSheets}M+</h4>
              <p className="text-white mb-8 text-xl">In term sheets & MoUs within 90 days</p>
            </div>
          </div>
          <div className="text-white">
            <div className="p-6 pt-8 text-center">
              <div className="flex justify-center mb-2">
                <Icon icon="mdi:user-group" className="text-white" width="72" height="72" />
              </div>
              <p className="text-white mb-8 text-xl">Dozens of freelancers & creators onboarded to cross-border systems</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StatsSection;
