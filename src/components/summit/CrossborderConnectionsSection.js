import Image from "next/image";

const CrossborderConnectionsSection = () => {
  const benefits = [
    {
      icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/030-idea%201.svg",
      title: "Connect with continental leaders",
      description: "Investor connections, signed NDAs, and draft term sheets."
    },
    {
      icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/007-puzzle%201.svg",
      title: "Cross-Border Enablement",
      description: "How AfCFTA, PAPSS, and digital rails help you scale across Africa."
    },
    {
      icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/040-user%201.svg",
      title: "Hands-On Clinics",
      description: "Solve payments, IP rights, residency, and AI tooling with experts at your side."
    }
  ];

  return (
    <div className="bg-white relative mt-10 py-20">
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-left mb-12 space-y-4">
          <h2 className="text-xs w-fit mb-4 bg-paan-blue text-white rounded-full px-4 py-2">
            Why Attend
          </h2>
          <h3 className="text-3xl text-paan-dark-blue font-bold uppercase">
            Crossborder Connections
          </h3>
          <p className="text-xl font-normal text-paan-dark-blue mb-4">
            Walk away with meaningful connections, matched partners, and real deals.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-paan-dark-blue rounded-xl shadow-xl overflow-hidden relative">
              <div className="p-6 pt-8 text-left">
                <div className="flex justify-start mb-6">
                  <Image
                    src={benefit.icon}
                    alt={benefit.title}
                    width={80}
                    height={80}
                    className="w-20 h-20"
                  />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{benefit.title}</h4>
                <p className="text-white mb-8">{benefit.description}</p>
              </div>
              <div className="w-full h-[20px] sm:h-[30px] md:h-[40px]">
                <Image
                  src="https://ik.imagekit.io/nkmvdjnna/PAAN/footer-pattern.svg"
                  width={400}
                  height={40}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CrossborderConnectionsSection;
