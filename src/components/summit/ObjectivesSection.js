import Image from "next/image";

const ObjectivesSection = ({ sectionRef }) => {
  const objectives = [
    {
      icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/padlock.svg",
      text: "Unlock cross‑border collaboration & deal flow"
    },
    {
      icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/chain-link.svg?updatedAt=1763114499609",
      text: "Showcase & commercialise African creative talent"
    },
    {
      icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/user-group.svg",
      text: "Advance skills, standards & innovation"
    },
    {
      icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/heart-icon.svg",
      text: "Create opportunities for youth & underrepresented talent"
    }
  ];

  return (
    <div className="bg-white relative py-12 sm:py-16 md:py-20" id="objectives" ref={sectionRef}>
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#172840] uppercase font-bold mb-3 sm:mb-4">Summit Objectives</h2>
          <h3 className="text-base sm:text-lg md:text-xl text-[#172840] font-normal max-w-3xl mx-auto">
            What we aim to achieve across two days of sessions, clinics, deal rooms, and networking.
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {objectives.map((objective, index) => (
            <div key={index} className="bg-paan-dark-blue rounded-lg shadow-lg p-4 sm:p-6 flex flex-col h-full">
              <div className="flex items-start justify-start mb-4">
                <img src={objective.icon} alt="Icon" className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
              <p className="text-white text-sm sm:text-base font-normal text-left mt-auto">{objective.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ObjectivesSection;
