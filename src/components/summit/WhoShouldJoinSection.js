const WhoShouldJoinSection = () => {
  const participants = [
    {
      icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
      title: "Creative Industry Leaders",
      description: "Artists, directors, producers, and creative visionaries driving innovation across Africa's entertainment and media landscape.",
      gradient: "from-paan-blue/5 to-paan-red/5",
      border: "border-paan-blue/10",
      bgColor: "bg-paan-blue"
    },
    {
      icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
      title: "Tech & Platform Innovators",
      description: "Technology entrepreneurs, platform builders, and digital innovators creating the infrastructure for creative commerce.",
      gradient: "from-paan-red/5 to-paan-blue/5",
      border: "border-paan-red/10",
      bgColor: "bg-paan-red"
    },
    {
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
      title: "Policy Makers & Trade Stakeholders",
      description: "Government officials, trade representatives, and policy experts shaping regulatory frameworks for creative industries.",
      gradient: "from-paan-blue/5 to-paan-red/5",
      border: "border-paan-blue/10",
      bgColor: "bg-paan-blue"
    },
    {
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      title: "Agencies & Service Providers",
      description: "Marketing, creative, advertising, IT, and tech agencies providing specialized services to creative businesses.",
      gradient: "from-paan-red/5 to-paan-blue/5",
      border: "border-paan-red/10",
      bgColor: "bg-paan-red"
    },
    {
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      title: "Freelancers",
      description: "Independent creative professionals, digital nomads, and gig economy participants building scalable creative careers.",
      gradient: "from-paan-blue/5 to-paan-red/5",
      border: "border-paan-blue/10",
      bgColor: "bg-paan-blue"
    },
    {
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "Investors & Financial Institutions",
      description: "VCs, angel investors, banks, and fintech companies providing capital and financial services to creative ventures.",
      gradient: "from-paan-red/5 to-paan-blue/5",
      border: "border-paan-red/10",
      bgColor: "bg-paan-red"
    },
    {
      icon: "M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 4v12a2 2 0 002 2h6a2 2 0 002-2V8M7 8H5a2 2 0 00-2 2v8a2 2 0 002 2h2m0-12h10",
      title: "Marketing & Creative Teams",
      description: "In-house marketing departments and creative teams from brands and corporations seeking innovative partnerships.",
      gradient: "from-paan-blue/5 to-paan-red/5",
      border: "border-paan-blue/10",
      bgColor: "bg-paan-blue"
    },
    {
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
      title: "Hubs & Ecosystem Builders",
      description: "Innovation hubs, incubators, accelerators, and community builders fostering creative entrepreneurship across Africa.",
      gradient: "from-paan-red/5 to-paan-blue/5",
      border: "border-paan-red/10",
      bgColor: "bg-paan-red"
    },
    {
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      title: "Academia & Research",
      description: "Researchers, academics, and educational institutions studying and teaching creative economy, digital transformation, and innovation.",
      gradient: "from-paan-blue/5 to-paan-red/5",
      border: "border-paan-blue/10",
      bgColor: "bg-paan-blue"
    },
    {
      icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V2a2 2 0 00-2-2H6a2 2 0 00-2 2v4h16z",
      title: "Corporate & Brand Partners",
      description: "Large corporations, multinational brands, and enterprise clients seeking to engage with Africa's creative talent and markets.",
      gradient: "from-paan-red/5 to-paan-blue/5",
      border: "border-paan-red/10",
      bgColor: "bg-paan-red"
    }
  ];

  return (
    <div className="bg-white py-12 sm:py-16 md:py-20" id="participants">
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-paan-dark-blue mb-3 sm:mb-4">Who Should Join</h2>
          <p className="text-base sm:text-lg text-gray-600">Connect with diverse professionals shaping Africa's creative economy</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {participants.map((participant, index) => (
            <div key={index} className={`group bg-gradient-to-br ${participant.gradient} rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border ${participant.border}`}>
              <div className={`w-12 h-12 ${participant.bgColor} rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={participant.icon} />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-paan-dark-blue mb-2">{participant.title}</h3>
              <p className="text-gray-600 text-sm">{participant.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WhoShouldJoinSection;
