import React from 'react';

export default function TrackCards() {
  const tracks = [
    {
      image: "/assets/images/ip.png",
      title: "AI, Technology &\nThe Future of Creative Work",
      description: "Operationalize AI across creative, media, and ops for real ROI.",
      tags: ["AI Workflows", "Governance", "Productivity", "Tech"]
    },
    {
      image: "/assets/images/nomad-work.png",
      title: "Creative Effectiveness,\nDesign & Media Performance",
      description: "Turn bold ideas into measurable Business outcomes across channels.",
      tags: ["Design Thinking", "Brand Lift", "Story telling", "Attention Metrics"]
    },
    {
      image: "/assets/images/ai-data.png",
      title: "Data, Analytics &\nMeasurement for Growth",
      description: "Build accountable growth with clean data and clear attribution.",
      tags: ["Cookieless attribution", "Audience Insights", "collaboration"]
    },
    {
      image: "/assets/images/ai-data.png",
      title: "The Creator &\nFreelance Economy",
      description: "Power sustainable independent careers and creator-led studios.",
      tags: ["Pricing & IP", "Business Ops Martech", "agency-freelancer"]
    },
    {
      image: "/assets/images/ai-data.png",
      title: "Communication, PR &\nBrand Trust",
      description: "Build credible brands in an era of activism and misinformation.",
      tags: ["Crisis Comms", "Media trust", "Reputation ESG Storytelling"]
    },
    {
      image: "/assets/images/ai-data.png",
      title: "Commerce, Platforms &\nMarketing Business",
      description: "Where retail media, social commerce and fintech converge.",
      tags: ["Retail media", "Chat commerce", "D2C growth", "Conversion tech"]
    },
    {
      image: "/assets/images/ai-data.png",
      title: "Cross-Border Collaboration &\nEcosystem Growth",
      description: "Partner across markets to scale Africa's creative economy.",
      tags: ["Multi Market Ops", "ip & Billing Martech", "Talent Mobility"]
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {tracks.map((track, index) => (
        <div 
          key={index}
          className={`relative rounded-lg shadow-lg overflow-hidden h-64 sm:h-80 md:h-96 lg:h-[34rem] ${index === 6 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
        >
          <img
            src={track.image}
            alt={`Track ${index + 1}`}
            className="w-full h-full object-contain object-center"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-lg p-4 sm:p-6">
            <h4 className="text-base sm:text-lg md:text-xl font-bold text-blue-900 mb-1 sm:mb-2">
              {track.title.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < track.title.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </h4>
            <p className="text-blue-900 text-sm sm:text-base">{track.description}</p>
            <div className="flex flex-wrap gap-2">
              {track.tags.map((tag, tagIndex) => (
                <div key={tagIndex} className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <small className="text-xs text-blue-900">{tag}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}